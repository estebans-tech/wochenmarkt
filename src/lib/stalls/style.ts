import type { PathOptions } from 'leaflet'
import type { StallCategory } from '$lib/types/stall'

export const CATEGORY_COLORS: Record<StallCategory, string> = {
  bakery: '#cd734d',                   // Backwaren
  organic: '#b2b25e',                  // Biowaren (hatched i legend)
  fish: '#377df7',                     // Fisch
  meat_sausage: '#e93323',             // Fleisch- und Wurstwaren
  poultry_sausage: '#ed6056',          // Geflügel- und Wurstwaren (hatched i legend)
  vegetables_potatoes_fruit: '#8c4f1a',// Gemüse, Kartoffeln, Obst
  street_food: '#e933f7',              // Imbiss
  dairy: '#ffff54',                    // Molkereiprodukte
  fruit: '#f5c042',                    // Obst
  plants_flowers: '#74fb4c',           // Pflanzen, Schnittblumen
  specialties: '#b8b83b',             // Spezialitäten
  textiles: '#4d346a',                 // Textilien
  non_food: '#9d9e9f',           // andere Non-Food-Artikel
  unassigned: '#e7eef7'                // nicht belegt
}
//} as const satisfies Record<StallCategory, string>

const BASE: PathOptions = {
  color: '#000',
  weight: 1,
  fillOpacity: 0.85
}

export const CATEGORY_STYLE: Record<StallCategory, PathOptions> = {
  bakery: { ...BASE, fillColor: CATEGORY_COLORS.bakery },
  organic: { ...BASE, fillColor: CATEGORY_COLORS.organic },
  fish: { ...BASE, fillColor: CATEGORY_COLORS.fish },
  meat_sausage: { ...BASE, fillColor: CATEGORY_COLORS.meat_sausage },
  poultry_sausage: { ...BASE, fillColor: CATEGORY_COLORS.poultry_sausage },
  vegetables_potatoes_fruit: { ...BASE, fillColor: CATEGORY_COLORS.vegetables_potatoes_fruit },
  street_food: { ...BASE, fillColor: CATEGORY_COLORS.street_food },
  dairy: { ...BASE, fillColor: CATEGORY_COLORS.dairy },
  fruit: { ...BASE, fillColor: CATEGORY_COLORS.fruit },
  plants_flowers: { ...BASE, fillColor: CATEGORY_COLORS.plants_flowers },
  specialties: { ...BASE, fillColor: CATEGORY_COLORS.specialties },
  textiles: { ...BASE, fillColor: CATEGORY_COLORS.textiles },
  non_food: { ...BASE, fillColor: CATEGORY_COLORS.non_food },
  unassigned: { ...BASE, fillColor: CATEGORY_COLORS.unassigned, fillOpacity: 0.4, weight: 1.65 }
}

export const pickCategory = (cats: StallCategory[], primary?: StallCategory): StallCategory => {
	if (primary) return primary
	return cats?.[0] ?? 'unassigned'
}
