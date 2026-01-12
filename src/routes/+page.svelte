<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Sidebar from '$lib/Sidebar.svelte'
</script>

<header class="sticky top-0 z-10 border-b border-zinc-300 bg-white">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
		<div class="leading-tight">
			<h1 class="text-2xl font-semibold">Wochenmarkt</h1>
			<p class="text-sm text-muted-foreground">Stephansplatz · Hannover</p>
		</div>
	</div>
</header>

<div class="relative h-[calc(100vh-4rem)] w-full">
  <Sidebar />
  <Map />
</div>
