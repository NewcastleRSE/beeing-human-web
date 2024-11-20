<script>
    let { children } = $props();
</script>

<div id="article-body" class="max-w-4xl mx-auto flex flex-col gap-3 leading-relaxed">
    {@render children?.()}
</div>