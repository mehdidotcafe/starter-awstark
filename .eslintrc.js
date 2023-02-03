module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.eslint.json"],
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    semi: [2, "never"],
    "@typescript-eslint/semi": [2, "never"],
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, variables: false }],
  },
};
