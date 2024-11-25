import { createCacheInternally } from '@eslint-plugin-runtime-compat/dummy-dependency'

Promise.all([
  async () => {
    // Usupported api called within package: Cache
    createCacheInternally()
  },
])
