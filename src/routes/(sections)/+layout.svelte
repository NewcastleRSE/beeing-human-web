<script>
  import LogoLandingPage from '$lib/LogoLandingPage.svelte'
  import SectionSelector from '$lib/SectionSelector.svelte';
  import Breadcrumbs from '$lib/Breadcrumbs.svelte';

  import {page} from '$app/stores'

  let path = $page.route.id.split('/')
  let section = $page.route.id.split('/')[2];

</script>

<header class="w-full my-6 md:my-20">
  <div class="flex flex-col gap-1 md:gap-4 max-w-64 mx-auto md:max-w-full md:flex-row items-center justify-center shrink">
    <LogoLandingPage class="max-h-8 md:max-h-28"/>
    <div class="w-1/2 border-t md:w-0 md:self-center md:h-28 md:border-l md:border-t-0 border-surface-500 self-end justify-self-end"></div> 
    <SectionSelector {section}/>             
  </div>
  <Breadcrumbs {path} class="relative -left-4 md:left-0"/>
</header>

<slot />
