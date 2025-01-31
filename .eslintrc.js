module.exports = {
  extends: ['eslint:recommended', 'plugin:astro/recommended', 'plugin:mdx/recommended'],
  plugins: ['astro', 'mdx'],
  root: true,
  rules: {
    'no-console': 'warn',
  },
  globals: {
    astroHTML: 'readonly',
  },
  env: {
    node: true,
    browser: true,
  },
  overrides: [
    { files: ['**/*.mdx'], rules: { 'no-unused-vars': 'off' } },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.cjs', '**/*.js'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            // destructuredArrayIgnorePattern: '^_',
            // destructuredObjectIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};
