import { derived, writable } from 'svelte/store'
import type { GeoJSONPointFeature } from '$lib/types/stall'

export const stalls = writable<GeoJSONPointFeature[]>([])
export const selectedStallId = writable<string | null>(null)

export const selectedStall = derived(
	[stalls, selectedStallId],
	([$stalls, $id]) => $stalls.find((s) => s.id === $id) ?? null
)
