import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "public"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactPlugin.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
  eslintConfigPrettier,
]);
