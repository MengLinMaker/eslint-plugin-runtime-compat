# Create your library

Boilerplate for creating NPM library, config free.

_Note: This template is targeted at libraries that run on browsers due to compatability considerations. It should run just fine on Node.js_

&nbsp;

&nbsp;

## Setup and usage

### Setup

1. Simply [`use this template.`](https://github.com/new?template_name=npm-library-boilerplate&template_owner=MengLinMaker)

2. Clone your template locally.

3. Install node dependencies using `pnpm`:

```Bash
pnpm i
```

4. Provide `NPM_TOKEN` repository secret to GitHub Setting for deployment.

### Publish npm library

1. Create new changeset and follow prompts:

```Bash
pnpm changeset
```

2. Add pull request to `main` branch.

3. After accepting pull request to `main`, a new pull request should be generated via `CD.yml`.

4. The maintainer needs to accept the new pull request so the package is published.

&nbsp;

&nbsp;

## Features

### Enforce `pnpm` for consistency

To achieve consistency for devs, use of `pnpm` is enforced with a `package.json` script:

```Json
"preinstall": "npx only-allow pnpm"
```

### Git hook with formatting and linting

`simple-git-hooks` is automatically setup on install via a `package.json` script:

```Json
"postinstall": "simple-git-hooks"
```

This repo uses:

- `prettier` for formatting.
- `eslint` for linting.
  - `@eslint/js` plugin for JavaScript rules.
  - `typescript-eslint` for TypeScript rules.
  - `eslint-plugin-compat` for detecting browser compatability issues.

_Note: `.npmrc` config `node-linker=hoisted` is necessary to overcome early postinstall bug_

### Continuous integration and delivery

CI should work without configuration as long as linting, testing and building are successful.

CD is currectly setup for public release and only publishes on `main` branch after `CI` workflow succeeds - refer to `.changeset/config.json` and `.github/workflows/CI.yml`.

### Modern testing library

`vitest` is designed to be compatable with ECMAScript Modules (ESM), which works directly in browsers. For new libraries this is the recommended method of exporting JavaScript modules.

Does this really matter? - probably not. You can also use `jest`.

_Note: Compatability between browsers and JavaScript runtimes is generally difficult anyways._

### Readable builds

There are two main build goals:

1. Support CommonJs and ESM bundles with TypeScript if necessary.
2. Make dubugging simple.

Thus no minification and bundling is used to maintain as much similarity between build package and source code.

Also, I don't wish to force TypeScript on the consumer. But I will force TypeScript library authors - there's no reason to make consuming difficult.

Bundling is achieved with `rollup`:

- `rollup-plugin-esbuild` plugin for CommonJs and ESM build.
- `rollup-plugin-dts` plugin for TypeScript `d.ts` build.

&nbsp;

&nbsp;

## Todo:

- Lint for different JavaScript runtimes:
  - Create eslint plugin from [runtime-compat](https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data) data.
