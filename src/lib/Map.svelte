<script lang="ts">
	import { onMount } from 'svelte';
	let el: HTMLDivElement;

	onMount(async () => {
		const L = (await import('leaflet')).default;
		await import('leaflet/dist/leaflet.css');

		const map = L.map(el, { zoomControl: true }).setView([52.36109, 9.75492], 19);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		const response = await fetch('/data/stall.geojson');
		const stalls = await response.json();

		L.geoJSON(stalls, {
			pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 7 }),
			onEachFeature: (feature, layer) => {
				const name = feature?.properties?.name ?? 'Foodtruck';
				layer.bindPopup(name);
			}
		}).addTo(map);
	});
</script>

<div bind:this={el} style="height: 70vh; border: 1px solid #ccc; border-radius: 12px;"></div>
