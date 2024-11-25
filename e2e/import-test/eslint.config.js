import pluginJs from '@eslint/js'
import runtimeCompat from '@menglinmaker/eslint-plugin-runtime-compat'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.ts'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  runtimeCompat.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
