<script>
    import { onMount } from 'svelte';
    import { ProgressBar } from "@skeletonlabs/skeleton";
    import SvelteMarkdown from 'svelte-markdown';

    export let chosenView;
    export let section;

    let mdString = '';

    onMount(async () => {
        let mdPath = "./content/" + chosenView + "/" + section + ".md";
        mdString = await fetch(mdPath).then((response) => response.text());
    });
</script>

{#if mdString === ""}
  <ProgressBar value={undefined} />
{:else}
  <SvelteMarkdown source={mdString}/>
{/if}