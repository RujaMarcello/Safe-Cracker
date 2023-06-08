module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {},
  plugins: [
    "react",
    "prettier",
    "simple-import-sort",
    "react-hooks",
    "import",
    "@typescript-eslint",
  ],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "prettier/prettier": "error",
    "sort-imports": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "error",
    "import/prefer-default-export": "off",
  },
  overrides: [
    {
      extends: ["airbnb-typescript", "plugin:@typescript-eslint/recommended"],
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
  ],
};
