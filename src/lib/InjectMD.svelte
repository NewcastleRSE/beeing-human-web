<script>
  import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let content = undefined;
  export let link = 'test';
  let test = undefined;

  onMount(async ()=> {
      try {
        test = await import (`../${link}.md`);
        console.log(test)
      } catch (e) {
        console.log(e)
    }
  });

  
</script>

<!-- 
  @component
  This component creates a progress radial while waiting for a md string to be fetched from a file

  Usage:
  ```
  <InjectMD content = 'This string contains **markdown** syntax'/>
  ```
-->
<!-- <svelte:component this={}/> -->
{#if content === undefined}
  <ProgressRadial value={undefined} />
{:else}
  <SvelteMarkdown source={content} />
{/if}
