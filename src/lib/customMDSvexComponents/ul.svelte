<script>
    let {children} = $props();
</script>

<ul class="list-disc list-inside pl-10">
    {@render children?.()}
</ul>