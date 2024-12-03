<script>
    import TextDivider from "./TextDivider.svelte";
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();
</script>

<div class="w-2/3 m-auto font-light my-14 flex flex-col gap-4">
    {@render children?.()}
    <TextDivider class="w-2/5 m-auto" fillColour ="#765405"/>
</div>