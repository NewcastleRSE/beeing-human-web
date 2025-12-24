<script>
    let {children, title} = $props();
</script>

<div class="bg-secondary-100 w-2/3 mx-auto p-4 rounded-lg shadow-md flex flex-col gap-4 text-sm">
    {#if title}<h3 class="h3 my-4">{title}</h3>{/if}
    {@render children?.()}
</div>