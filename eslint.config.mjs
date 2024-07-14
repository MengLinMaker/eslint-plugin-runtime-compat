import pluginJs from '@eslint/js'
import compat from 'eslint-plugin-compat'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['coverage', 'dist', 'node_modules'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  compat.configs['flat/recommended'],
]
