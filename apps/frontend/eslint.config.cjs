const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const baseConfig = require('../../eslint.config.cjs')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  ...baseConfig,
  ...compat.extends('@nuxt/eslint-config'),
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: require('@typescript-eslint/parser'),
      },
    },
  },
  {
    ignores: ['.nuxt/**', '.output/**', 'node_modules'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    // Override or add rules here
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
]
