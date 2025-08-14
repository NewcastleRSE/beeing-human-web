<script>
  import "../app.postcss";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  import {page} from "$app/stores";
  
  let { children } = $props();

  let section = $derived.by(() => {
    if ($page.route.id) {
      const path = $page.route.id.split("/");
      return path.length >= 3 ? path[2] : undefined;
    }
  });
</script>


<svelte:head>
  <!-- 100% privacy-first analytics -->
  <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
  <title>Bee-ing human{section ? ` — ${section.charAt(0).toUpperCase() + section.toLowerCase().slice(1)}` : ''}</title>
</svelte:head>

{@render children?.()}
