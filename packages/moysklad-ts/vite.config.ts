import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      name: "moysklad",
      fileName: "moysklad-ts",
    },
    rollupOptions: {
      external: ["js-base64"],
    },
  },
  plugins: [
    tsconfigPaths(),
    dts({
      rollupTypes: true,
    }),
  ],
  test: {
    setupFiles: ["./vitest-setup.ts"],
    coverage: {
      reporter: ["json", "json-summary", "html"],
      all: true,
      exclude: ["**/*.test-d.ts", "mocks/**/*"],
    },
  },
});
