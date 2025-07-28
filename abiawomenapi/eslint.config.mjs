import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,      // Node.js globals like `process`, `module`, `require`
        ...globals.browser,   // browser globals if you want those too
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',   // use 'script' for CommonJS (require/module.exports)
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  pluginReact.configs.flat.recommended,
]);
