import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: true,
        Cypress: true
      }
    },
    rules: {
      // Add any custom rules here
    },
    ignores: ["node_modules/**", "dist/**", "cypress/e2e/legacy/**"]
  }
]);
