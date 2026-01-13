//import { page } from 'vitest/browser';
import { render, screen } from '@testing-library/svelte'
import { describe, expect, it, vi } from 'vitest';
//import { render } from 'vitest-browser-svelte';
import Page from '../+page.svelte';

const components = ['map', 'sidebar'] as const

vi.mock('$lib/Map.svelte', async () => {
  const mod = await import('./__mocks__/MapMock.svelte')
  return { default: mod.default }
})

vi.mock('$lib/Sidebar.svelte', async () => {
  const mod = await import('./__mocks__/SidebarMock.svelte')
  return { default: mod.default }
})

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page)

		const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.tagName).toBe('H1')
	})

  it('renders header and includes Sidebar and Map', () => {
    render(Page)

    expect(screen.getByText('Stephansplatz · Hannover')).toBeInTheDocument()
    components.forEach((id) => {
      expect(screen.getByTestId(id)).toBeInTheDocument()
    }) 
  })
})
