<script lang="ts">
import type { StallFeature } from '$lib/types/stall'
import CategoryIcon from '$lib/stalls/CategoryIcon.svelte'
import CategoryLabels from '$lib/stalls/CategoryLabels.svelte'

const { stall, selected = false, onSelect } = $props<{
  stall: StallFeaature
  selected?: boolean
  onSelect: () => void
}>()

const name = $derived(stall.properties?.name ?? stall.id)
const categories = $derived(stall.properties?.categories ?? [])
const primaryCategory = $derived(stall.properties?.primaryCategory)
</script>

<button
	class={[
		'w-full rounded-lg px-3 py-2 text-left text-sm transition',
		selected ? 'bg-zinc-200' : 'hover:bg-fuchsia-200/85'
	].join(' ')}
	onclick={onSelect}
>
	<div class="flex items-start gap-3">
		{#if categories.length}
			<div class="mt-0.5">
				<CategoryIcon primaryCategory={primaryCategory} categories={categories} />
			</div>
		{/if}

		<div class="min-w-0 flex-1">
			<div class="font-medium">{name}</div>

			{#if categories.length}
				<CategoryLabels categories={categories} />
			{/if}
		</div>
	</div>
</button>
