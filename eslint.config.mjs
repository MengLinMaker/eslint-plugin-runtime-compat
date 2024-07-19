import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import runtimeCompat from './dist/index.js'

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
