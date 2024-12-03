<!--
    @component
    Component to create a named custom tei- element 
-->

<script>
    /**
     * @typedef {Object} Props
     * @property {string} [element]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { element = '', children } = $props();
</script>

<svelte:element this={element}>{@render children?.()}</svelte:element>