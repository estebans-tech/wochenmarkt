import { render, screen } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'

import CategoryLabels from '$lib/stalls/CategoryLabels.svelte'

describe('CategoryLabel', () => {
  it('renders german labels for provided category', () => {
   render(CategoryLabels, {
    props: {
      categories: ['bakery', 'meat_sausage', 'vegetables_potatoes_fruit']
    }
   }) 
 
    expect(screen.getByText('Backwaren')).toBeInTheDocument()
    expect(screen.getByText('Fleisch- und Wurstwaren')).toBeInTheDocument()
    expect(screen.getByText('Gemüse, Kartoffeln, Obst')).toBeInTheDocument()
  })

  it('renders nothing when categories is empty', () => {
    const { container } = render(CategoryLabels, { props: { categories: [] } })

    // robust: accept component to be an empt wrapper
    expect(container.textContent?.trim() ?? '').toBe('')
  })

  it('deduplicates categories (if duplicates are passed)', () => {
    render(CategoryLabels, {
      props: {
        categories: ['bakery', 'bakery']
      }
    })

    // Om du deduplicerar: bör vara exakt 1
    // Om du inte gör det: ändra till ">= 1" eller ta bort testet.
    expect(screen.getAllByText('Backwaren')).toHaveLength(1)
  })
})
