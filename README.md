<h1 align="center">eslint-plugin-runtime-compat</h1>

<div flex align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/menglinmaker/eslint-plugin-runtime-compat">
<img src="https://img.shields.io/github/actions/workflow/status/menglinmaker/eslint-plugin-runtime-compat/CI.yml">
<a href="https://badge.fury.io/js/@menglinmaker%2Feslint-plugin-runtime-compat"><img src="https://badge.fury.io/js/@menglinmaker%2Feslint-plugin-runtime-compat.svg" alt="npm version"></a>
<a href="https://npm-stat.com/charts.html?package=eslint-plugin-runtime-compat"><img src="https://img.shields.io/npm/dm/eslint-plugin-runtime-compat.svg" alt="npm version"></a>
</div>

<h4 align="center">Lint JavaScript runtime compatability issues during development.</h4>

Note: This ESLint plugin is still under development. Please submit a issue or PR if you have any suggestions and changes.

&nbsp;

## Setup

1. Install
```Bash
npm install @menglinmaker/eslint-plugin-runtime-compat
```

2. Add ESLint config
```Bash
import runtimeCompat from "@menglinmaker/eslint-plugin-runtime-compat";

export default [runtimeCompat.configs.strict];
```

Alternatively, you can load a custom config:
```Bash
export default [runtimeCompat.configs.custom(['node', 'bun', 'deno'], {
  deprecated: true,
  experimental: true,
})];
```

&nbsp;

## Contributing
Prerequisite - must have `pnpm` installed. All git-hooks for formatting will be automatically installed and configured.

1. Clone repo
2. Build dist before linting - `pnpm run build`
3. Contribute to some files
4. Create a pull request changeset - `pnpm changeset`
5. Approved PRs that passes CI will be released to npm

&nbsp;

## Problem statement

### What problem does this solve?
The feedback cycle for detecting and fixing runtime compatability issues is too large:
- Executing JavaScript requires a runtime, which there are [many that do not fully comply to web standards](https://runtime-compat.unjs.io/). So what runs on [Node.js](https://nodejs.org) locally and CI may not run on [Cloudflare workers](https://workers.cloudflare.com/) in production.
- As an interpreted language, incompatible JavaScript will only throw errors on execution, so errors may not occur immediately.

### Solution
Lint compatability issues before deployment using pre-collected [runtime-compat-data](https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data).

An alternative approach is to use [remocal testing](https://theburningmonk.com/2022/05/my-testing-strategy-for-serverless-applications/#:~:text=A%20remocal%20test%20is%20when,aka%20testing%20in%20the%20cloud). However, this does require a more complex setup with more test code to maintain.

### Limitations:
- Does not [lint across multiple files](https://github.com/eslint/eslint/discussions/15388#discussioncomment-1747795) since ESLint only analyses each file in isolation.
- Cannot detect overiding of APIs - variables cannot be tracked across files due to ESLint's design.

### Todo:
- Track variable reassignments within a file.
- Detect incompatability issues from instance methods and properties.
- Disable rules due to polyfills.
