import { _Cache } from '@eslint-plugin-runtime-compat/dummy-dependency'

Promise.all([
  async () => {
    // Expect type of: Cache
    new _Cache()
  },
])
