import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { sveltekit } from '@sveltejs/kit/vite'

const isCI = process.env.CI === 'true'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'jsdom',
            setupFiles: ['./vitest.setup.ts'],
            include: [
              'src/**/*.{test,spec}.{ts,js}',
              'src/**/*.svelte.{test,spec}.{ts,js}',
            ],
            exclude: [
              'src/routes/**',
              'src/**/*.browser.{test,spec}.{ts,js}',
              'src/**/*.server.{test,spec}.{ts,js}',
              'src/lib/server/**',
            ],
          },
        },
        {
          extends: true,
          test: {
            name: 'server',
            environment: 'node',
            include: ['src/**/*.server.{test,spec}.{ts,js}'],
            exclude: [
              'src/**/*.browser.{test,spec}.{ts,js}',
              'src/**/*.svelte.{test,spec}.{ts,js}',
            ],
          },
        },
        {
          extends: true,
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
      ],
    },
})
