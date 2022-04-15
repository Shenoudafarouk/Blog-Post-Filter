module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // enable parsing latest ECMAScript
    sourceType: 'module', // allow use of imports
  },
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    "browser": true,
    "amd": true,
    "node": true
},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  "rules": {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-explicit-any": ["off"],
  }
};