import { describe, expect, it } from "vitest";
import { MAX_ASSET_BYTES, sanitizeAssetName } from "./assetLibrary";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 77,
      openId: "asset-test-user",
      email: "asset-test@example.com",
      name: "Asset Test User",
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

describe("asset-library helpers", () => {
  it("normalizes an uploaded filename into a safe object-key segment", () => {
    expect(sanitizeAssetName(" ONYX map / review 01.png ")).toBe("ONYX-map-review-01.png");
  });

  it("uses a dependable fallback and exposes the configured maximum size", () => {
    expect(sanitizeAssetName("***")).toBe("onyx-asset");
    expect(MAX_ASSET_BYTES).toBe(8 * 1024 * 1024);
  });

  it("rejects an authenticated upload that exceeds the managed storage limit", async () => {
    const caller = appRouter.createCaller(createAuthenticatedContext());
    const oversizedBase64 = Buffer.alloc(MAX_ASSET_BYTES + 1).toString("base64");

    await expect(
      caller.assets.upload({
        name: "oversized-onyx-asset.bin",
        contentType: "application/octet-stream",
        base64: oversizedBase64,
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
