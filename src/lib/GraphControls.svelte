<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();
</script>

<div id="graph-controls" class="md:grid md:grid-cols-3 md:gap-10 mx-auto my-10 items-end flex gap-4 justify-between">
    {@render children?.()}
</div>