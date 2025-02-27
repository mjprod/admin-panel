import eslintPluginReact from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: [".yarn/", "build/**", "node_modules/"],
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": ts,
    },
    rules: {
      complexity: ["error", 10],
      "no-unused-vars": "off",
      "react/prop-types": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];