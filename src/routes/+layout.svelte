<script>
  import { onMount } from "svelte";
  import { view } from "../stores/viewChoice";

  onMount(async () => {
    // Your selected Skeleton theme:
    await import("@skeletonlabs/skeleton/themes/theme-skeleton.css");
  });

  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/all.css";

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import "../app.postcss";

  import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<LightSwitch />

<slot />
