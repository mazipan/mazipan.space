module.exports = {
  extends: ['eslint:recommended', 'plugin:astro/recommended', 'plugin:mdx/recommended'],
  plugins: ['astro', 'tailwindcss', 'mdx'],
  root: true,
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'no-console': 'warn',
  },
  globals: {
    astroHTML: 'readonly',
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    tailwindcss: {
      config: './tailwind.config.ts',
    },
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
