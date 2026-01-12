import type { StallCategory } from '$lib/types/stall'

export const CATEGORY_ICON: Record<StallCategory, string> = {
	bakery: '🥖',
	organic: '🌿',
	fish: '🐟',
	meat_sausage: '🥩🌭',
	poultry_sausage: '🍗',
	vegetables_potatoes_fruit: '🥔🍎🥕',
	street_food: '🌮🍔',
	dairy: '🥛',
	fruit: '🍎',
	plants_flowers: '🪴🌸',
	specialties: '⭐',
	textiles: '👕',
	non_food: '🧺',
	unassigned: '•'
}

/** Get Category from primaryCategor or first from category list **/
export const getPrimaryCategory = (args: {
	primaryCategory?: StallCategory
	categories: StallCategory[]
}) => args.primaryCategory ?? args.categories?.[0] ?? 'unassigned'

export const getPrimaryIcon = (args: {
	primaryCategory?: StallCategory
	categories: StallCategory[]
}) => CATEGORY_ICON[getPrimaryCategory(args)]
