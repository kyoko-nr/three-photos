import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      indent: ["error", 2, { SwitchCase: 1 }],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "semi-spacing": ["error", { before: false, after: true }],
      "semi-style": ["error", "last"],
      "no-extra-semi": "error",
      "no-unexpected-multiline": "error",
    },
  },
];
