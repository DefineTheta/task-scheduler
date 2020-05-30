module.exports = {
  root: true,
  plugins: ['vue', 'prettier'],
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 90,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        endOfLine: 'auto',
      },
    ],
  },
};
