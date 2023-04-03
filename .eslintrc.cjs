module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ["prettier"],
  rules: {
    prettier: [
      "error",
      {
        singleQuote: true,
        semi: true,
        useTaps: true,
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: "avoid"
      }
    ]
  }
};

