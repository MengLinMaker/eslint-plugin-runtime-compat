import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const outDir = 'dist'

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  treeshake: true,
})

export default [
  bundle({
    plugins: [esbuild(), json()],
    output: [
      {
        dir: outDir,
        format: 'cjs',
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      dir: outDir,
      format: 'cjs',
    },
  }),
]
