import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // includes require, module, process, __dirname
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    env: {
      browser: true,
      node: true,
    },
    rules: {
      ...js.configs.recommended.rules, // base recommended rules
      semi: ["error", "always"], // example: force semicolons
      quotes: ["error", "single"], // example: force single quotes
      "no-unused-vars": ["warn"], // warn instead of error for unused vars
      indent: ["error", 2], // 2 spaces indentation
      "no-console": "off", // allow console logs
    },
  },
];
