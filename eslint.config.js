import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["build", "coverage", "dist", "node_modules"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2025,
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "error",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
    {
        files: ["**/*.{test,spec}.{ts,tsx}", "src/setupTests.ts"],
        languageOptions: {
            globals: {
                test: "readonly",
                expect: "readonly",
                describe: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
    {
        files: ["src/components/ui/index.tsx"],
        rules: {
            // Compound components intentionally expose subcomponents as properties.
            "react-refresh/only-export-components": "off",
        },
    },
    {
        files: ["*.config.{js,ts}", "scripts/**/*.mjs"],
        languageOptions: {
            globals: globals.node,
        },
    }
);
