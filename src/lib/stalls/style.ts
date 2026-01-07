import type { PathOptions } from 'leaflet'
import type { StallCategory } from '$lib/types/stall'

export const CATEGORY_STYLE: Record<StallCategory, PathOptions> = {
	bakery: { fillColor: '#c97b5a', fillOpacity: 0.85, weight: 2 },
	organic: { fillColor: '#d6d08a', fillOpacity: 0.85, weight: 2 },
	fish: { fillColor: '#3b82f6', fillOpacity: 0.85, weight: 2 },
	meat_sausage: { fillColor: '#ef4444', fillOpacity: 0.85, weight: 2 },
	poultry_sausage: { fillColor: '#f87171', fillOpacity: 0.85, weight: 2 },
	vegetables_potatoes_fruit: { fillColor: '#8b5a2b', fillOpacity: 0.85, weight: 2 },
	street_food: { fillColor: '#d946ef', fillOpacity: 0.85, weight: 2 },
	dairy: { fillColor: '#fde047', fillOpacity: 0.85, weight: 2 },
	fruit: { fillColor: '#fbbf24', fillOpacity: 0.85, weight: 2 },
	plants_flowers: { fillColor: '#4ade80', fillOpacity: 0.85, weight: 2 },
	specialties: { fillColor: '#a3a635', fillOpacity: 0.85, weight: 2 },
	textiles: { fillColor: '#4b2e83', fillOpacity: 0.85, weight: 2 },
	non_food: { fillColor: '#9ca3af', fillOpacity: 0.85, weight: 2 },
	unassigned: { fillColor: '#e5e7eb', fillOpacity: 0.4, weight: 1.65 }
}

export const pickCategory = (cats: StallCategory[], primary?: StallCategory): StallCategory => {
	if (primary) return primary
	return cats?.[0] ?? 'unassigned'
}
