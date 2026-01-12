<script lang="ts">
	import type { StallCategory } from '$lib/types/stall'
	import { CATEGORY_ICON, getPrimaryCategory } from '$lib/stalls/categoryIcons'
	import { DE_CATEGORY_LABEL } from '$lib/i18n/de/stallCategories'

/**
  export let primaryCategory: StallCategory | undefined
	export let categories: StallCategory[] = []
**/
  const { primaryCategory, categories = [] } = $props<{
    primaryCategory?: StallCategory
    categories: StallCategory[]
  }>()

  const cat = $derived( getPrimaryCategory({ primaryCategory, categories }) )
  const icon = $derived(CATEGORY_ICON[cat])
  const label = $derived(DE_CATEGORY_LABEL[cat])
</script>

<span class="text-xl leading-none" title={label} aria-label={label}>
	{icon}
</span>
