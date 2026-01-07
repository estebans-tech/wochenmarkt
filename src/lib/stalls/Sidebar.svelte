<script lang="ts">
	import { stalls, selectedStall, selectedStallId } from '$lib/stalls/store'
</script>

<aside style="width: 320px; border-right: 1px solid #ddd; padding: 12px; overflow: auto">
	<h2 style="margin: 0 0 12px">Warenangebot</h2>

	<div style="display: grid; gap: 8px">
		{#each $stalls as s (s.id)}
			<button
				on:click={() => selectedStallId.set(s.id)}
				style="text-align:left; padding:8px; border:1px solid #ddd; border-radius:10px; background: {$selectedStallId === s.id ? '#f3f4f6' : 'white'}"
			>
				{s.properties.name}
			</button>
		{/each}
	</div>

	{#if $selectedStall}
		<hr style="margin: 12px 0" />
		<div>
			<strong>{$selectedStall.properties.name}</strong>
			<div>Size: {$selectedStall.properties.size}</div>
			<div>Categories: {$selectedStall.properties.categories?.join(', ')}</div>
		</div>
	{/if}
</aside>
