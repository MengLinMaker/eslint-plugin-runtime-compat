<h1 align="center">eslint-plugin-runtime-compat</h1>

<div flex align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/menglinmaker/eslint-plugin-runtime-compat">
<img src="https://img.shields.io/github/actions/workflow/status/menglinmaker/eslint-plugin-runtime-compat/CI.yml">
<a href="https://badge.fury.io/js/@menglinmaker%2Feslint-plugin-runtime-compat"><img src="https://badge.fury.io/js/@menglinmaker%2Feslint-plugin-runtime-compat.svg" alt="npm version"></a>
<a href="https://npm-stat.com/charts.html?package=eslint-plugin-runtime-compat"><img src="https://img.shields.io/npm/dm/eslint-plugin-runtime-compat.svg" alt="npm version"></a>
</div>

<h4 align="center">Lint JavaScript runtime compat issues before deployment!</h4>

&nbsp;

## Features:
- [x] Track compat issues across multiple imports and packages
- [x] Configure range of providers according to [runtime-compat](https://runtime-compat.unjs.io/)
- [x] Detect incompatible class instantiations
- [x] Detect incompatible class property access
- [ ] Disable rules
- [ ] Detect incompatible event listeners
- [ ] Detect compat issues hidden within packages

**Note: Project is in alpha. API may change**

## Setup

The linter config should target the server bundle, not client.

1. Install
```Bash
npm install @menglinmaker/eslint-plugin-runtime-compat
```

2. Add `eslint.config.mjs` to root. This detects incompatible APIs for all runtimes in the dataset.
```JavaScript
import runtimeCompat from '@menglinmaker/eslint-plugin-runtime-compat'
import tseslint from 'typescript-eslint'

export default [...tseslint.configs.recommended, ...runtimeCompat.configs.strict]
```

Alternatively, you can load a custom config:
```JavaScript
runtimeCompat.configs.custom(['node', 'bun', 'deno'])
```

## Limitations:
- Cannot detect when globals are overridden

## Attibution
- [runtime-compat](https://github.com/unjs/runtime-compat) from [UnJS](https://github.com/unjs)
