<script>
  import { view } from "../../stores/viewChoice";
  import { onMount } from "svelte";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import SvelteMarkdown from 'svelte-markdown';

  let introText = "";

  onMount(async () => {
    let modulePath = "./content/" + $view + "/intro.md";
    introText = await fetch(modulePath).then((response) => response.text());
  });
</script>

<h1>{$view}</h1>
<!-- <Intro/> -->
{#if introText === ""}
  <ProgressBar value={undefined} />
{:else}
  <SvelteMarkdown source={introText}/>
{/if}
