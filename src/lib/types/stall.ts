export type StallSize = '2x2' | '3x2' | '4x2' | '5x2' | '6x2' | '7x2'

export type StallCategory =
	| 'bakery'
	| 'organic'
	| 'fish'
	| 'meat_sausage'
	| 'poultry_sausage'
	| 'vegetables_potatoes_fruit'
	| 'street_food'
	| 'dairy'
	| 'fruit'
	| 'plants_flowers'
	| 'specialties'
	| 'textiles'
	| 'non_food'
	| 'unassigned'

export type StallProperties = {
	name: string
	size: StallSize
	categories: StallCategory[] // kan vara flera
	primaryCategory?: StallCategory // valfri, om du vill styra färg/legend
}

export type GeoJSONPointFeature = {
	type: 'Feature'
	id?: string
	geometry: { type: 'Point'; coordinates: [number, number] } // [lng, lat]
	properties: StallProperties
}

export type StallFeatureCollection = {
	type: 'FeatureCollection'
	features: GeoJSONPointFeature[]
}

