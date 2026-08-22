import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { MAX_ASSET_BYTES, sanitizeAssetName } from "./assetLibrary";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createProjectAsset, listProjectAssets, removeProjectAsset } from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  assets: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      try {
        return await listProjectAssets(ctx.user.id);
      } catch (error) {
        console.error("[Assets] Failed to list project files", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Asset library is unavailable." });
      }
    }),

    upload: protectedProcedure
      .input(
        z.object({
          name: z.string().trim().min(1).max(255),
          contentType: z.string().trim().min(1).max(255),
          base64: z.string().min(1),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const bytes = Buffer.from(input.base64, "base64");
        if (bytes.length === 0 || bytes.length > MAX_ASSET_BYTES) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Files must be between 1 byte and 8 MB.",
          });
        }

        const safeName = sanitizeAssetName(input.name);
        const objectPath = `onyx-asset-library/${ctx.user.id}/${Date.now()}-${safeName}`;

        try {
          const { key, url } = await storagePut(objectPath, bytes, input.contentType);
          await createProjectAsset({
            ownerId: ctx.user.id,
            originalName: input.name,
            fileKey: key,
            url,
            contentType: input.contentType,
            sizeBytes: bytes.length,
          });
          return { key, url, name: input.name, sizeBytes: bytes.length };
        } catch (error) {
          console.error("[Assets] Failed to store project file", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "The file could not be stored." });
        }
      }),

    remove: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ ctx, input }) => {
        try {
          await removeProjectAsset(input.id, ctx.user.id);
          return { success: true } as const;
        } catch (error) {
          console.error("[Assets] Failed to remove project file reference", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "The file reference could not be removed." });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
