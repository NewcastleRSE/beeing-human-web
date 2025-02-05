<script module>
    import { ol, ul } from "./customMDSvexComponents/components";
    export { ol, ul };
</script>

<script>
    let { children, layout } = $props();
</script>

{#if layout}
    <div
        id="article-body"
        class="max-w-4xl mx-auto flex flex-col gap-3 leading-relaxed"
    >
        {@render children?.()}
    </div>
{:else}
    {@render children?.()}
{/if}
