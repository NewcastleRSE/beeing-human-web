<script>
    let {children} = $props();
</script>

{@debug children}

<ol class="list-decimal list-inside pl-10">
    {@render children?.()}
</ol>