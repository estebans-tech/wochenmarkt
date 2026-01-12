<script lang="ts">
	import { stalls, selectedStallId, selectedStall } from '$lib/stalls/domain/store'
	import StallItem from '$lib/stalls/StallItem.svelte'
</script>

<div class="h-full overflow-y-auto p-4">
	<div class="mb-3 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold">Warenangebot</h2>
		<span class="text-xs text-zinc-600 hidden">{$stalls.length}</span>
	</div>

	<div class="space-y-1 overflow-y-auto">
		{#each $stalls as stall (stall.id)}
        <StallItem
          stall={stall}
          selected={stall.id == $selectedStallId}
          onSelect={() => selectedStallId.set(stall.id)}
        />
    {/each}
	</div>
</div>
