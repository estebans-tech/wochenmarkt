<script lang="ts">
	import { onMount } from 'svelte';
	import('leaflet/dist/leaflet.css')
  import { MAP_CONFIG } from '$lib/map/config'
	import { addStallsLayer } from '$lib/stalls/domain/layer'
	import { stalls, selectedStallId } from '$lib/stalls/domain/store'

  import type { StallFeatureCollection } from '$lib/types/stall'

  let el: HTMLDivElement;

  onMount(() => {
    let unsub: null | (() => void) = null
    let map: any = null

    ;(async () => {
      const L = await import('leaflet')

      const map = L.map(el, { 
        zoomControl: true, 
        minZoom: MAP_CONFIG.minZoom, 
        maxZoom: MAP_CONFIG.maxZoom 
      }).setView(
        MAP_CONFIG.defaultCenter,
        MAP_CONFIG.defaultZoom
      )


      L.tileLayer(MAP_CONFIG.tilesUrl, {
        attribution: MAP_CONFIG.attribution,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        maxNativeZoom: MAP_CONFIG.maxNativeZoom 
      }).addTo(map)

      //const res = await fetch('/data/stall.geojson')
      const res = await fetch('/api/stalls')
      const data = (await res.json()) as StallFeatureCollection
      stalls.set(data.features)

      const { byId } = addStallsLayer({
        L,
        map,
        data,
        onSelect: (id) => selectedStallId.set(id)
      })

      const unsub = selectedStallId.subscribe((id) => {
        if (!id) return
        const layer = byId.get(id)
        if (!layer) return
        const center = layer.getBounds().getCenter()
        const nextZoom = Math.min(MAP_CONFIG.maxZoomOnSelect, Math.max(map.getZoom(), MAP_CONFIG.minZoomOnSelect))

        map.setView(center, nextZoom, { animate: true })
        layer.openPopup()
      })
    })()

		return () => {
     unsub?.()
      map?.remove?.()
    }
	})
</script>

<div bind:this={el} class="h-full w-full z-20"></div>
