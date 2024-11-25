import { response } from './utils'

Promise.all([
  async () => {
    // Expect type of: Response
    await response.bytes()
  },
])
