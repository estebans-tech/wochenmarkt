<script lang="ts">
	import { onMount } from 'svelte';
	import('leaflet/dist/leaflet.css')

  import { MAP_CONFIG } from '$lib/map/config'
	import { addStallsLayer } from '$lib/stalls/domain/layer'
	import { stalls, selectedStallId } from '$lib/stalls/domain/store'

  import type { StallFeatureCollection } from '$lib/types/stall'

  let el: HTMLDivElement;

  onMount(async () => {
		const L = await import('leaflet')

		const map = L.map(el, { zoomControl: true, minZoom: MAP_CONFIG.minZoom, maxZoom: MAP_CONFIG.maxZoom }).setView(
			MAP_CONFIG.defaultCenter,
			MAP_CONFIG.defaultZoom
		)

		L.tileLayer(MAP_CONFIG.tilesUrl, {
			attribution: MAP_CONFIG.attribution,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      maxNativeZoom: MAP_CONFIG.maxNativeZoom 
		}).addTo(map)

		const res = await fetch('/data/stall.geojson')
		const data = (await res.json()) as StallFeatureCollection
    stalls.set(data.features)

		//const group = addStallsLayer({ L, map, data })
		//map.fitBounds(group.getBounds(), { padding: [20, 20] })
const { group, byId } = addStallsLayer({
			L,
			map,
			data,
			onSelect: (id) => selectedStallId.set(id)
		})

//		map.fitBounds(group.getBounds(), { padding: [20, 20] })

		const unsub = selectedStallId.subscribe((id) => {
			if (!id) return
			const layer = byId.get(id)
			if (!layer) return
			map.fitBounds(layer.getBounds(), { maxZoom: MAP_CONFIG.maxZoom, padding: [40, 40] })
			layer.openPopup()
		})

		return () => unsub()
	})
</script>

<!-- <div bind:this={el} class="h-full w-full z-30"></div> -->
<div bind:this={el} class="h-full w-full z-20"></div>
