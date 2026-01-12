import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/svelte'

// Ensures DOM is reset between tests so elements from previous renders don’t leak into later assertions
afterEach(() => cleanup())

