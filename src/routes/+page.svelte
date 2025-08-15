<script>
  import Hive from "$lib/Hive.svelte";
  import LogoLandingPage from "$lib/LogoLandingPage.svelte";
  import SiteSearch from "../lib/SiteSearch.svelte";
  let { data } = $props();

</script>

<SiteSearch searchIndex = {data.searchIndex} />
<div class="w-4/5 mx-auto my-6">
  <header class="flex flex-col w-full items-center shrink mb-6 md:mb-32" data-testid="logo-landing-page">
    <LogoLandingPage />
    <p class="font-serif text-center md:w-max md:text-lg">
      Inspired by Charles Butler’s <em>The Feminine Monarchie</em>
    </p>
  </header>

  <Hive data={data.articleData} />
</div>
