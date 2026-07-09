import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// typescript-eslint rules apply to JS/TS sources only, mirroring the
// `overrides` scoping of the previous .eslintrc.js (astro & mdx files
// are handled by their own plugin configs).
const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.cjs', '**/*.js'];

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      '.astro',
      '.github',
      '.changeset',
      '.turbo',
      '.vscode',
      'docs',
      '2024',
      'psi-reports',
      'public',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: TS_FILES })),
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        astroHTML: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      // opinionated rule newly added to eslint's recommended set; not part
      // of this project's established lint policy and yields false positives
      // on intentional default initializers
      'no-useless-assignment': 'off',
    },
  },
  {
    files: TS_FILES,
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
        },
      ],
    },
  },
  {
    ...mdx.flat,
    files: ['**/*.mdx'],
    rules: {
      ...mdx.flat.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  eslintConfigPrettier,
];
