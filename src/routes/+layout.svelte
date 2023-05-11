<script>
  import { onMount } from 'svelte';
  import { view } from '../stores/viewChoice'

  onMount(async () => {
    console.log($view);
    // Your selected Skeleton theme:
    if ($view === 'literature') {
      await import("@skeletonlabs/skeleton/themes/theme-skeleton.css");
    } else if ($view === 'science') {
      await import('@skeletonlabs/skeleton/themes/theme-modern.css');
    } else if ($view === 'music') {
      await import('@skeletonlabs/skeleton/themes/theme-rocket.css');
    } else if ($view === 'interdisciplinarity') {
      await import('@skeletonlabs/skeleton/themes/theme-seasonal.css');
    }
  });

  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/all.css";

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import "../app.postcss";

  import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<LightSwitch />

<slot />
