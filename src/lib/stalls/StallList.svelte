<script lang="ts">
	import { stalls, selectedStallId, selectedStall } from '$lib/stalls/store'
	import { CATEGORY_ICON } from '$lib/stalls/categoryIcons'
	import { getPrimaryIcon } from '$lib/stalls/categoryIcons'
	import CategoryLabels from '$lib/stalls/CategoryLabels.svelte'
	import CategoryIcon from '$lib/stalls/CategoryIcon.svelte'
</script>

<div class="h-full overflow-y-auto p-4">
	<div class="mb-3 flex items-baseline justify-between">
		<h2 class="text-xl font-semibold">Warenangebot</h2>
		<span class="text-xs text-zinc-600 hidden">{$stalls.length}</span>
	</div>

	<div class="space-y-1 overflow-y-auto">
		{#each $stalls as stall (stall.id)}
			<button
				class={[
					'w-full rounded-lg px-3 py-2 text-left text-sm transition',
					stall.id === $selectedStallId ? 'bg-zinc-200' : 'hover:bg-fuchsia-200/85'
				].join(' ')}
				onclick={() => selectStall(stall.id)}
			>
				<div class="font-medium">{stall.properties?.name ?? stall.id}</div>

				{#if stall.properties?.categories?.length}
          <CategoryIcon
            primaryCategory={stall.properties.primaryCategory}
            categories={stall.properties.categories}
          />
          <div class="min-w-0 flex-1">
            <CategoryLabels categories={stall.properties.categories} />
          </div>
        {/if}
			</button>
		{/each}
	</div>
</div>
