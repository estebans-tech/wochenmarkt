import type { StallCategory } from '$lib/types/stall'

export const DE_CATEGORY_LABEL: Record<StallCategory, string> = {
	bakery: 'Backwaren',
	organic: 'Biowaren',
	fish: 'Fisch',
	meat_sausage: 'Fleisch- und Wurstwaren',
	poultry_sausage: 'Geflügel- und Wurstwaren',
	vegetables_potatoes_fruit: 'Gemüse, Kartoffeln, Obst',
	street_food: 'Imbiss',
	dairy: 'Molkereiprodukte',
	fruit: 'Obst',
	plants_flowers: 'Pflanzen & Schnittblumen',
	specialties: 'Spezialitäten',
	textiles: 'Textilien',
	non_food: 'Andere Non-Food-Artikel',
	unassigned: 'Nicht belegt'
}
