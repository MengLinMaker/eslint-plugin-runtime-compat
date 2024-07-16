/**
 * Step 1) Entry point of plugin. Exports itself for eslint to use
 * @author Meng Lin
 */

import type { Linter } from 'eslint'
import pkg from '../package.json'
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import recommended from './config/recommended'

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
import compat from './rules/compat'

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {},
  rules: {
    compat,
  },
}

const configs = {
  'flat/recommended': {
    plugins: { compat: plugin },
    ...recommended.flat,
  } as Linter.FlatConfig,
  recommended: {
    plugins: ['compat'],
    ...recommended.legacy,
  } as Linter.Config,
}
plugin.configs = configs

export = {
  ...(plugin as typeof plugin & { configs: typeof configs }),
  config: configs,
}
