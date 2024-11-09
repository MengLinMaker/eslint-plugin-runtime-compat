# data - @eslint-plugin-runtime-compat/data

This is an internal package that preprocesses [`runtime-compat-data`](https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data):
- Classify API types: class, property access, globals...
- Identifies essential API information.
- Reduces multi-level JSON to 2 level JSON.
- Provides a filter for identifying unsupported APIs with given target runtimes.

## Auto update

Building this package with `pnpm build` will:
1. Automatically update [`runtime-compat-data`](https://github.com/unjs/runtime-compat/tree/main/packages/runtime-compat-data)
2. Run preprocessing script to produce `preprocessCompatData.json`
3. Finally build package

## Runtime usage

Install in `packages.json` locally:
```Json
"@eslint-plugin-runtime-compat/data": "workspace:*"
```

Filter for targeted runtimes:
```TypeScript
import { type RuntimeName, filterPreprocessCompatData, preprocessCompatData } from '@eslint-plugin-runtime-compat/data'

const filterRuntimes: RuntimeName[] = ['node']

const runtimeCompatData = filterPreprocessCompatData(preprocessCompatData, filterRuntimes)
```
