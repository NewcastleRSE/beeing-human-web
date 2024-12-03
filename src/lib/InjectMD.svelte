<script>
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import { marked } from 'marked';
  import DOMPurify from 'dompurify'
  import ArticleLayout from "./ArticleLayout.svelte";

  let { content = undefined } = $props();
  
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
  <ArticleLayout>
    <!-- <SvelteMarkdown source={content} /> -->
     {@html DOMPurify.sanitize(marked.parse(content))}
  </ArticleLayout>
{/if}
