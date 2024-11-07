import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    // Faster than 'fork' pool at the cost of less isolation.
    pool: 'threads',
    reporters: ['verbose', 'github-actions'],
    logHeapUsage: true,
  },
})
