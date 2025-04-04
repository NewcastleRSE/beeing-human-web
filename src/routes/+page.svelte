<script>
  import Hive from "$lib/Hive.svelte";
  import LogoLandingPage from "$lib/LogoLandingPage.svelte";
  let { data } = $props();

</script>

<div class="w-4/5 mx-auto my-6">
  <header class="flex flex-col w-full items-center shrink mb-6 md:mb-32" data-testid="logo-landing-page">
    <LogoLandingPage />
    <p class="font-serif text-center md:w-max md:text-lg">
      An exploration of Charles Butler’s <em>The Feminine Monarchie</em>
    </p>
  </header>

  <Hive {data} />
</div>
