<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Sidebar from '$lib/stalls/Sidebar.svelte'
</script>

<!-- <h1>Wochenmarkt am Stephansplatz</h1> -->
<div style="display:flex; height: 80vh">
	<Sidebar />
	<div style="flex:1">
		<Map />
	</div>
</div>
