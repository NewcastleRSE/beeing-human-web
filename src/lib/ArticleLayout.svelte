<script>
    // collects the frontmatter to avoid the warnings in the console: https://github.com/sveltejs/svelte/issues/5892#issuecomment-1913418704
    $$restProps;
</script>

<div id="article-body" class="max-w-4xl mx-auto flex flex-col gap-3 leading-relaxed">
    <slot/>
</div>