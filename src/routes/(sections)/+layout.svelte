<script>
  import LogoLandingPage from '$lib/LogoLandingPage.svelte'
  import SectionSelector from '$lib/SectionSelector.svelte';

  import {page} from '$app/stores'

  const section = $page.route.id.split('/')[2]

</script>

<header class="w-full">
  <div class="flex items-center justify-center mb-6 md:mb-32 shrink">
    <LogoLandingPage/>
    <SectionSelector {section}/>
  </div>
</header>

<slot />
