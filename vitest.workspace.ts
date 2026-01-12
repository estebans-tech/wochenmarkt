import { defineWorkspace } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

const isCI = process.env.CI === 'true'

export default defineWorkspace([
  {
    extends: './vite.config.ts',
    // 1) Unit + component tests (jsdom)
    test: {
      name: 'unit',
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      include: [
        'src/**/*.{test,spec}.{ts,js}',
        'src/**/*.svelte.{test,spec}.{ts,js}',
      ],
      exclude: [
        'src/routes/**', // routes hör hemma i browser-projektet
        'src/**/*.browser.{test,spec}.{ts,js}',
        'src/**/*.server.{test,spec}.{ts,js}',
        'src/lib/server/**',
      ],
    },
  },

  {
    extends: './vite.config.ts',
    test: {
      name: 'server',
      environment: 'node',
      include: ['src/**/*.server.{test,spec}.{ts,js}'],
      exclude: ['src/**/*.browser.{test,spec}.{ts,js}', 'src/**/*.svelte.{test,spec}.{ts,js}'],
    },
  },

  {
    extends: './vite.config.ts',
    // 2) Server tests (node)
    test: {
      name: 'browser',
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      browser: {
        enabled: !isCI,
        provider: playwright(),
        instances: [{ browser: 'chromium', headless: true }],
      },
      include: ['src/routes/**/*.browser.{test,spec}.{ts,js}'],
    },
  },
])
