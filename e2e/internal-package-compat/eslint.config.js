import runtimeCompat from '@menglinmaker/eslint-plugin-runtime-compat'
import tseslint from 'typescript-eslint'

export default [...tseslint.configs.recommended, ...runtimeCompat.configs.strict]
