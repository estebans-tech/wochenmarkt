import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), sveltekit(), svelteTesting()],

  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },

  test: {
      projects: [
        {
          name: 'unit',
          extends: true,
          test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: ['./vitest.setup.ts'],
            include: [
              'src/**/*.{test,spec}.{ts,js}',
              'src/**/*.svelte.{test,spec}.{ts,js}',
            ],
            exclude: [
              'src/routes/**',
              'src/lib/server/**',
              'src/**/*.server.{test,spec}.{ts,js}',
              '.svelte-kit/**',
              'node_modules/**',
            ],
          },
        },
        {
          name: 'server',
          extends: true,
          test: {
            environment: 'node',
            globals: true,
            include: ['src/**/*.server.{test,spec}.{ts,js}'],
            exclude: ['node_modules/**', '.svelte-kit/**'],
          },
        },
      ],
    },
}))
