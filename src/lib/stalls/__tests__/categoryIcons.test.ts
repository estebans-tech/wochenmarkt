import { describe, expect, it } from 'vitest'
import { CATEGORY_ICON, getPrimaryCategory, getPrimaryIcon } from '$lib/stalls/domain/categoryIcons'

describe('categoryIcons', () => {
	it('getPrimaryCategory: returns primaryCategory when provided', () => {
		expect(
			getPrimaryCategory({
				primaryCategory: 'meat_sausage',
				categories: ['bakery', 'vegetables_potatoes_fruit']
			})
		).toBe('meat_sausage')
	})

	it('getPrimaryCategory: falls back to first category when primaryCategory is missing', () => {
		expect(
			getPrimaryCategory({
				categories: ['fish', 'bakery']
			})
		).toBe('fish')
	})

	it('getPrimaryCategory: returns "unassigned" when both are missing/empty', () => {
		expect(
			getPrimaryCategory({
				categories: []
			})
		).toBe('unassigned')
	})

	it('getPrimaryIcon: returns icon for resolved primary category', () => {
		expect(
			getPrimaryIcon({
				primaryCategory: 'bakery',
				categories: ['fish']
			})
		).toBe(CATEGORY_ICON.bakery)
	})

	it('getPrimaryIcon: falls back to first category icon when primaryCategory is missing', () => {
		expect(
			getPrimaryIcon({
				categories: ['street_food', 'dairy']
			})
		).toBe(CATEGORY_ICON.street_food)
	})

	it('getPrimaryIcon: falls back to unassigned icon when nothing is provided', () => {
		expect(
			getPrimaryIcon({
				categories: []
			})
		).toBe(CATEGORY_ICON.unassigned)
	})
})
