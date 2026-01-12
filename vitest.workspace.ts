export default defineWorkspace([
  {
    extends: './vite.config.ts',
    test: {
      name: 'client',
      environment: 'jsdom',
      include: [
        'src/**/*.{test,spec}.{ts,js}',
        'src/**/*.svelte.{test,spec}.{ts,js}'
      ],
      exclude: [
        'src/lib/server/**',
        'src/**/*.server.{test,spec}.{ts,js}',
        'e2e/**'
      ]
    }
  },

  {
    extends: './vite.config.ts',
    test: {
      name: 'server',
      environment: 'node',
      include: [
        'src/lib/server/**/*.{test,spec}.{ts,js}',
        'src/**/*.server.{test,spec}.{ts,js}'
      ],
      exclude: [
        'e2e/**'
      ]
    }
  }
])
