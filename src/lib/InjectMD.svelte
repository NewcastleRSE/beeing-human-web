<script>
  import { marked } from "marked";
  import DOMPurify from "isomorphic-dompurify";
  import ArticleLayout from "./ArticleLayout.svelte";

  import { rehype } from "rehype";
  import rehypeClassNames from "rehype-class-names";
  import { customClasses } from "./../utils/textClasses";
  import { onMount } from "svelte";

  let { content = undefined, layout = true, outerTag = true } = $props();

  let sanitizedContent = $state("");

  onMount(async () => {
    let parsedContent = marked.parse(content);
    let classed = await rehype()
      .use(rehypeClassNames, customClasses)
      .process(parsedContent);
    sanitizedContent = DOMPurify.sanitize(classed);
  });

  function removeOuterTag(content) {
    // removes p tags surrounding content
    return content.replace(/<\/?p>/g, "");
  }
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
 {#if layout}
  <ArticleLayout {layout}>
    <!-- <SvelteMarkdown source={content} /> -->
    {@html sanitizedContent}
  </ArticleLayout>
{:else if !outerTag}
  {@html removeOuterTag(sanitizedContent)}
{:else}
  {@html sanitizedContent}
{/if}