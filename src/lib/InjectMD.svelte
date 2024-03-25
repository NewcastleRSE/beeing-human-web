<script>
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import SvelteMarkdown from "svelte-markdown";

  export let content = undefined;
  
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
