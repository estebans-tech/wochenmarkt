<script lang="ts">
	import type { StallCategory } from '$lib/types/stall'
	import { DE_CATEGORY_LABEL } from '$lib/i18n/de/stallCategories'

  const { categories } = $props<{ categories?: StallCategory[] }>()

  const uniqueCategories =  $derived.by(() => Array.from(new Set(categories)))
</script>

<div class="flex flex-wrap gap-1">
  {uniqueCategories}
  {#each uniqueCategories as category (category)}
		<span class="rounded-md bg-zinc-200/70 px-2 py-0.5 text-[11px] text-zinc-700">
			{DE_CATEGORY_LABEL[category]}
		</span>
	{/each}
</div>
