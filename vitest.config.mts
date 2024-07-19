import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    coverage: {
      enabled: true,
      include: ['src'],
      exclude: ['**/index.ts', 'src/constants.ts'],
    },
    // Faster than 'fork' pool at the cost of less isolation.
    pool: 'threads',
    reporters: process.env.GITHUB_ACTIONS ? ['verbose', 'github-actions'] : ['verbose'],
    logHeapUsage: true,
  },
})
