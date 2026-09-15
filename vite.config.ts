import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/api": "http://localhost:4000",
        },
    },
    test: {
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
        coverage: {
            provider: "v8",
            reporter: ["text", "json-summary", "html"],
            include: ["src/**/*.{ts,tsx}"],
            exclude: [
                "src/**/*.test.{ts,tsx}",
                "src/setupTests.ts",
                "src/vite-env.d.ts",
                "src/interface/**",
            ],
            thresholds: {
                statements: 40,
                branches: 40,
                functions: 40,
                lines: 40,
            },
        },
    },
});
