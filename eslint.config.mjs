import pluginJs from '@eslint/js'
import runtimeCompat from '@menglinmaker/eslint-plugin-runtime-compat'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['coverage', 'dist', 'node_modules'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,

  // Custom config as example for local dev runtimes.
  runtimeCompat.configs.custom(['node', 'bun', 'deno'], {
    deprecated: true,
    experimental: true,
  }),
  // runtimeCompat.configs.recommended
  // runtimeCompat.configs.strict
]
