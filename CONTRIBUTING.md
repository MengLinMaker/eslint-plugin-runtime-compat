## Contributing

Prerequisite - must have `pnpm` installed. All git-hooks for formatting will be automatically installed and configured.

1. Clone repo
```bash
git clone https://github.com/MengLinMaker/eslint-plugin-runtime-compat.git
```
2. Build project
```bash
pnpm run build
```
3. Contribute to some files

## Architecture

There are 2 packages. One for data preprocessing, another for runtime linting.

### `data`

This package contains functions for preprocessing runtime data [`runtime-compat`](https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data) data into different categories:
- classInstantiation
- classPropertyAccess - including param
- classInstantiationParam - constructor with param only: CompressionStream/DecompressionStream
- eventListener - including param

### `plugin`

The ESLint plugin itself:
- `rules` contain the ESLint rules

## Workflows

### Update
- [ ] TODO - Runs a script from `script` folder to auto update compat data and publish minor releases to NPM.
