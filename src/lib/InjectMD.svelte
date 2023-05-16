<script>
    import { onMount } from 'svelte';
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import SvelteMarkdown from 'svelte-markdown';

    export let section;

    let mdString = section.content;
</script>

{#if mdString === ""}
  <ProgressRadial value={undefined} />
{:else}
  <SvelteMarkdown source={mdString}/>
{/if}