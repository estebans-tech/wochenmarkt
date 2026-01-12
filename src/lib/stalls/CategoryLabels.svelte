<script lang="ts">
	import type { StallCategory } from '$lib/types/stall'
	import { DE_CATEGORY_LABEL } from '$lib/i18n/de/stallCategories'

	export let categories: StallCategory[] = []
</script>

<div class="flex flex-wrap gap-1">
	{#each categories as c (c)}
		<span class="rounded-md bg-zinc-200/70 px-2 py-0.5 text-[11px] text-zinc-700">
			{DE_CATEGORY_LABEL[c]}
		</span>
	{/each}
</div>
