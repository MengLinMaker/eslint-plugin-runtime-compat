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
- [x] Configure range of providers according to [runtime-compat](https://runtime-compat.unjs.io/)
- [x] Detect incompatible class instantiations
- [x] Detect incompatible class property access
- [ ] Disable rules
- [ ] Detect incompatible event listeners

**Note: Project is in alpha. API may change**

## Setup

The linter config should target the server bundle, not client.

1. Install
```Bash
npm install @menglinmaker/eslint-plugin-runtime-compat
```

2. Add `eslint.config.mjs` to root. This detects incompatible APIs for all runtimes in the dataset.
```Bash
import runtimeCompat from "@menglinmaker/eslint-plugin-runtime-compat";

export default [runtimeCompat.configs.strict];
```

Alternatively, you can load a custom config:
```Bash
export default [runtimeCompat.configs.custom(['node', 'bun', 'deno'])];
```

## Limitations:
- Does not [lint across multiple files](https://github.com/eslint/eslint/discussions/15388#discussioncomment-1747795) since ESLint only analyses each file in isolation by building an AST for each file.
- Cannot detect when globals are overridden

## Attibution
- [runtime-compat](https://github.com/unjs/runtime-compat) from [UnJS](https://github.com/unjs)
