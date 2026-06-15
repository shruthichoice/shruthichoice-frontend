import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // 🔥 Forces Nitro to compile into a native Vercel Functions structure instead of Cloudflare
      }),
    ],
  },
});