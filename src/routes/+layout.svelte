<script>
  import "../app.postcss";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  import {page} from "$app/stores";
  
  let { children } = $props();

  import Footer from "../lib/Footer.svelte";

  let section = $derived.by(() => {
    const routeId = $page.route?.id;
    if (routeId) {
      const parts = routeId.split("/");
      if (parts.length >= 3) return parts[2];
    }
    const urlParts = $page.url.pathname.split("/").filter(Boolean);
    return urlParts[0] ?? undefined;
  });
</script>


<svelte:head>
  <!-- 100% privacy-first analytics -->
  <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>

  <script defer src="https://umami-app.blueglacier-edae29ed.uksouth.azurecontainerapps.io/script.js" data-website-id="567a68a3-7ac7-4a87-8feb-d3ae863b3f1d"></script>
  <title>Bee-ing human{section ? ` — ${section.charAt(0).toUpperCase() + section.toLowerCase().slice(1)}` : ''}</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
{@render children?.()}
<Footer />
</div>