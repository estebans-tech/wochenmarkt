import { render, screen } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'

import CategoryIcon from  '$lib/stalls/CategoryIcon.svelte'
import { CATEGORY_ICON } from '$lib/stalls/categoryIcons'
import { DE_CATEGORY_LABEL } from '$lib/i18n/de/stallCategories'

describe('CategoryIcon', () => {
  it('uses primaryCategory when provided (even when category is inexistent)', () => {
    const primary = 'fish' as const

    render(CategoryIcon, {
      props: {
        primaryCategory: primary,
        categories: ['bakery', 'meat_sausage']
      }
    })

    const expectedLabel = DE_CATEGORY_LABEL[primary]
    const expectedIcon = CATEGORY_ICON[primary]

    // get element by aria-label
    const el = screen.getByLabelText(expectedLabel)

    expect(el).toHaveAttribute('title', expectedLabel)
    expect(el).toHaveTextContent(expectedIcon)

  })

  it('uses "unassigned" when both primaryCategory and category are missing/empty', () => {
    const cat = 'unassigned' as const

    render(CategoryIcon, {
      props: {
        primaryCategory: undefined,
        categories: []
      }
    })

    const expectedLabel = DE_CATEGORY_LABEL[cat]
    const expectedIcon = CATEGORY_ICON[cat]

    // get element by aria-label
    const el = screen.getByLabelText(expectedLabel)
    
    expect(el).toHaveAttribute('title', expectedLabel)
    expect(el).toHaveTextContent(expectedIcon)
  }) 
})

