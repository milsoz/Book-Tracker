import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react"],
    rules: {},
  },
])
