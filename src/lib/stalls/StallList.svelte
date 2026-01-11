<script lang="ts">
	import { stalls, selectedStallId, selectedStall } from '$lib/stalls/store'
</script>

<div class="h-full overflow-y-auto p-4">
	<div class="mb-3 flex items-baseline justify-between">
		<h2 class="text-sm font-semibold">Stånd</h2>
		<span class="text-xs text-zinc-600">{$stalls.length}</span>
	</div>

	<div class="space-y-1 overflow-y-auto">
		{#each $stalls as stall (stall.id)}
			<button
				class={[
					'w-full rounded-lg px-3 py-2 text-left text-sm transition',
					stall.id === $selectedStallId ? 'bg-zinc-200' : 'hover:bg-zinc-200/70'
				].join(' ')}
				onclick={() => selectStall(stall.id)}
			>
				<div class="font-medium">{stall.properties?.name ?? stall.id}</div>

				{#if stall.properties?.categories?.length}
					<div class="text-xs text-zinc-600">
						{stall.properties.categories.join(', ')}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
