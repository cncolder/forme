/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:import/typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'import'],
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  settings: {
    'import/ignore': ['/node_modules/'],
  },
  rules: {
    'import/no-cycle': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '{react,react-dom}',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
