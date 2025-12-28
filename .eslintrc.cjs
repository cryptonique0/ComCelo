module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    browser: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".ts", ".tsx"] }
    }
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "import/no-relative-parent-imports": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "pathGroups": [
          {
            "pattern": "@/**",
            "group": "internal"
          }
        ],
        "alphabeticalOrder": true,
        "caseInsensitive": true
      }
    ],
    "no-console": "off",
    "no-empty-function": "off"
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      env: { mocha: true }
    },
    {
      files: ["app/**/*.ts", "app/**/*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"]
      }
    }
  ],
  ignorePatterns: ["dist", "build", "node_modules", "artifacts", "typechain-types", ".next"]
};
