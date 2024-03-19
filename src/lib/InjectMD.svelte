<script>
  import { onMount } from "svelte";

  export let link = 'buzz1';
  let test = undefined;

  onMount(async ()=> {
      try {
        test = await import (`../routes/connections/buzzwords/${link}.md`);
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
{#if test != undefined}
  <svelte:component this={test.default}/>
{/if}

<!-- 
{#if content === undefined}
  <ProgressRadial value={undefined} />
{:else}
  <SvelteMarkdown source={content} />
{/if} -->
