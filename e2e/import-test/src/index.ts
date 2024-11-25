import { _Cache } from './utils'

Promise.all([
  async () => {
    // Expect type of: Cache
    new _Cache()
  },
])
