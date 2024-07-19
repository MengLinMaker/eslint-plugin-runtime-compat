<h1 align="center">eslint-plugin-runtime-compat</h1>

<div flex align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/menglinmaker/eslint-plugin-runtime-compat">
<img src="https://img.shields.io/github/actions/workflow/status/menglinmaker/eslint-plugin-runtime-compat/CI.yml">
<a href="https://badge.fury.io/js/@menglinmaker%2Feslint-plugin-runtime-compat"><img src="https://badge.fury.io/js/@menglinmaker%2Feslint-plugin-runtime-compat.svg" alt="npm version"></a>
<a href="https://npm-stat.com/charts.html?package=eslint-plugin-runtime-compat"><img src="https://img.shields.io/npm/dm/eslint-plugin-runtime-compat.svg" alt="npm version"></a>
</div>

<h4 align="center">Lint JavaScript runtime compatability issues during development.</h4>

&nbsp;

## Setup - not implemented

1. Install
```Bash
npm install @menglinmaker/eslint-plugin-runtime-compat
```

2. Add ESLint config
```Bash
import runtimeCompat from "@menglinmaker/eslint-runtime-compat";

export default [runtimeCompat.configs["flat/recommended"]];
```

3. Configure target runtimes


&nbsp;

## Dev log

### What problem does this solve?
The feedback cycle for detecting and fixing runtime compatability issues is too large:
- Executing JavaScript requires a runtime, which there are [many that do not fully comply to web standards](https://runtime-compat.unjs.io/). So what runs on [Node.js](https://nodejs.org) locally and CI may not run on [Cloudflare workers](https://workers.cloudflare.com/) in production.
- As an interpreted language, incompatible JavaScript will only throw errors on execution, so errors may not occur immediately.

### Solution
Lint compatability issues before deployment using pre-collected [runtime-compat-data](https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data).

### Limitations:
- Does not [lint across multiple files](https://github.com/eslint/eslint/discussions/15388#discussioncomment-1747795) since ESLint only analyses each file in isolation.
- Cannot detect overiding of APIs - variables cannot be tracked across files due to ESLint's design.

### Todo:
- Track variable reassignments within a file.
- Detect incompatability issues from instance methods and properties.
- Disable rules due to polyfills.
