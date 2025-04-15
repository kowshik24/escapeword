// @ts-check
import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      'react': reactPlugin
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      'react/no-unescaped-entities': 'error',
      '@next/next/no-html-link-for-pages': 'error'
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
];
