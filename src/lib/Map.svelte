<script lang="ts">
	import { onMount } from 'svelte';
	import('leaflet/dist/leaflet.css')
	import { MAP_CONFIG } from '$lib/map/config'
	import { addStallsLayer } from '$lib/stalls/layer'
	import type { StallFeatureCollection } from '$lib/types/stall'

  let el: HTMLDivElement;

  onMount(async () => {
		const L = await import('leaflet')

		const map = L.map(el, { zoomControl: true }).setView(
			MAP_CONFIG.defaultCenter,
			MAP_CONFIG.defaultZoom
		)

		L.tileLayer(MAP_CONFIG.tilesUrl, {
			attribution: MAP_CONFIG.attribution
		}).addTo(map)

		const res = await fetch('/data/stall.geojson')
		const data = (await res.json()) as StallFeatureCollection

		const group = addStallsLayer({ L, map, data })
		map.fitBounds(group.getBounds(), { padding: [20, 20] })
	})
</script>

<div bind:this={el} style="height: 70vh; border: 1px solid #ccc; border-radius: 12px;"></div>
