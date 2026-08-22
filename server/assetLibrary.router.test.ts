import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const storagePutMock = vi.hoisted(() => vi.fn());
const createAssetMock = vi.hoisted(() => vi.fn());
const listAssetsMock = vi.hoisted(() => vi.fn());
const removeAssetMock = vi.hoisted(() => vi.fn());

vi.mock("./storage", () => ({ storagePut: storagePutMock }));
vi.mock("./db", () => ({
  createProjectAsset: createAssetMock,
  listProjectAssets: listAssetsMock,
  removeProjectAsset: removeAssetMock,
}));

import { appRouter } from "./routers";

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "onyx-assets-test-user",
      email: "assets@example.com",
      name: "ONYX Assets Test",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("assets router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stores an authenticated file as object storage plus durable metadata", async () => {
    storagePutMock.mockResolvedValue({ key: "onyx-asset-library/42/mission-map_a1b2c3d4.png", url: "/manus-storage/onyx-asset-library/42/mission-map_a1b2c3d4.png" });
    createAssetMock.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createAuthenticatedContext());

    const result = await caller.assets.upload({
      name: "mission map.png",
      contentType: "image/png",
      base64: Buffer.from("onyx-map").toString("base64"),
    });

    expect(storagePutMock).toHaveBeenCalledWith(
      expect.stringMatching(/^onyx-asset-library\/42\/\d+-mission-map\.png$/),
      expect.any(Buffer),
      "image/png",
    );
    expect(createAssetMock).toHaveBeenCalledWith(expect.objectContaining({
      ownerId: 42,
      originalName: "mission map.png",
      contentType: "image/png",
      sizeBytes: 8,
    }));
    expect(result.url).toContain("/manus-storage/");
  });

  it("returns only the caller's stored references and removes by caller ownership", async () => {
    const reference = { id: 9, ownerId: 42, originalName: "proof.pdf", fileKey: "onyx-asset-library/42/proof.pdf", url: "/manus-storage/onyx-asset-library/42/proof.pdf", contentType: "application/pdf", sizeBytes: 1200, createdAt: new Date() };
    listAssetsMock.mockResolvedValue([reference]);
    removeAssetMock.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createAuthenticatedContext());

    await expect(caller.assets.list()).resolves.toEqual([reference]);
    await expect(caller.assets.remove({ id: 9 })).resolves.toEqual({ success: true });
    expect(listAssetsMock).toHaveBeenCalledWith(42);
    expect(removeAssetMock).toHaveBeenCalledWith(9, 42);
  });
});
