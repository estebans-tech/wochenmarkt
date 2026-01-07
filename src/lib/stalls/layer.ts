import type { StallFeatureCollection, StallSize } from '$lib/types/stall'
import { CATEGORY_STYLE, pickCategory } from '$lib/stalls/style'

// 111_320 ≈ meter per lattitude degree (≈ 111.32 km/°) on the earth surface (WGS84-approx)
// Vi använder det för en liten marknadsyta → tillräckligt bra för PoC
const METERS_PER_DEGREE_LAT = 111_320

// 180 används för grader → radianer: rad = deg * π / 180
const degToRad = (deg: number) => (deg * Math.PI) / 180

const metersToDegLat = (m: number) => m / METERS_PER_DEGREE_LAT
const metersToDegLng = (m: number, lat: number) =>
	m / (METERS_PER_DEGREE_LAT * Math.cos(degToRad(lat)))

const parseSize = (s: StallSize): { w: number; h: number } => {
	const [w, h] = s.split('x').map(Number)
	return { w, h }
}

export function addStallsLayer(args: {
	L: typeof import('leaflet')
	map: import('leaflet').Map
	data: StallFeatureCollection,
  onSelect: (id: string) => void
}) {
	const { L, map, data } = args

	const group = L.layerGroup().addTo(map)
	const byId = new Map<string, import('leaflet').Rectangle>()

	for (const f of data.features ?? []) {
		const [lng, lat] = f.geometry.coordinates
		const { w, h } = parseSize(f.properties.size)

		const dLat = metersToDegLat(h / 2)
		const dLng = metersToDegLng(w / 2, lat)

		const cat = pickCategory(f.properties.categories, f.properties.primaryCategory)
		const style = CATEGORY_STYLE[cat]

		const rect = L.rectangle(
			[
				[lat - dLat, lng - dLng],
				[lat + dLat, lng + dLng]
			],
			style
		)
			.addTo(group)
			.bindPopup(f.properties.name)
	}


		if (f.id) {
			byId.set(f.id, rect)
			rect.on('click', () => onSelect(f.id))
		}
	return { group, byId }
}
