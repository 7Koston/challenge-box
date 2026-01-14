import esPrettier from 'eslint-config-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Disable Prettier conflicting rules
  esPrettier,
  // Custom config
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'prefer-arrow-callback': 'error',
      'dot-notation': 'off',
      'no-empty-function': 'off',
      // TypeScript
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: true,
          allowNumber: true,
          allowNullableObject: true,
          allowNullableBoolean: true,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
        },
      ],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
          readonly: 'array-simple',
        },
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowNumberAndString: true,
        },
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      // Vue.js / Nuxt.js
      'nuxt/prefer-import-meta': 'error',
      'vue/define-emits-declaration': ['error', 'type-literal'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-props-destructuring': [
        'error',
        {
          destructure: 'never',
        },
      ],
      'vue/no-v-html': 'off',
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'never',
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: [
            [
              'script[setup]',
              'script:not([setup])',
              'template',
              'style[scoped]',
              'style:not([scoped])',
              'i18n',
              'docs',
            ],
          ],
        },
      ],
      'vue/no-multiple-template-root': 'warn',
      'vue/prefer-use-template-ref': 'error',
      'vue/padding-line-between-blocks': ['warn', 'always'],
      'vue/padding-line-between-tags': [
        'warn',
        [{ blankLine: 'always', prev: '*', next: '*' }],
      ],
    },
  },
  { files: ['**/*.ts', '**/*.vue'] },
  {
    ignores: [
      '.output/*',
      '.nuxt/*',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      'pnpm-lock.yaml',
    ],
  },
);
