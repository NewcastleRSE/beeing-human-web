<script>
  import Hive from "$lib/Hive.svelte";
  import LogoLandingPage from "$lib/LogoLandingPage.svelte";
  import SiteSearchButton from "../lib/SiteSearchButton.svelte";
  let { data } = $props();
  import Footer from "../lib/Footer.svelte";

</script>


  <div class="w-4/5 mx-auto my-6 flex-1">
    <header class="flex flex-col w-full items-center shrink mb-6 md:mb-32" data-testid="logo-landing-page">
      <LogoLandingPage />
      <p class="font-serif text-center md:w-max md:text-lg">
        Inspired by Charles Butler’s <em>The Feminine Monarchie</em>
      </p>
    </header>
    
    <SiteSearchButton articleData={data.articleData} searchIndex={data.searchIndex} />

    <Hive data={data.articleData} />
  </div>
