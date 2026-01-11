<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import StallList from '$lib/stalls/StallList.svelte'
	
  let open = true 

	const W_OPEN = 'min(420px, 96vw)'
	const W_CLOSED = 'min(12px, 4vw)'
</script>

<aside
	class="absolute top-0 right-0 z-40 h-full bg-zinc-100 shadow-xl transition-[width] duration-200"
 style={`width: ${open ? W_OPEN : W_CLOSED}`}
>

	<!-- Toggle-button -->
	<div class="absolute left-0 top-1/2 -translate-x-2/3 -translate-y-1/2">
		<Button
			variant="secondary"
			class="h-10 w-10 bg-white border border-zinc-200 shadow-sm"
			onclick={() => (open = !open)}
			aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
		>
			<span class="inline-block text-xl">{open ? '»' : '«'}</span>
		</Button>
	</div>

	<!-- Content -->
	{#if open}
    <StallList /> 
	{:else}
		<!-- collapsed state: empty (or icons) -->
		<div class="h-full"></div>
	{/if}
</aside>
