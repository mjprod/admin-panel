module.exports = {
  ignorePatterns: [".yarn/", "build/**", "node_modules/"],
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      plugins: ["react", "@typescript-eslint/eslint-plugin"],
      parser: "@typescript-eslint/parser",
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
  ],
};
