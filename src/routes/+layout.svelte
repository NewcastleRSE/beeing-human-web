<script>
  import "../app.postcss";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<svelte:head>
  <!-- 100% privacy-first analytics -->
  <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
</svelte:head>

{@render children?.()}
