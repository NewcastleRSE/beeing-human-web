<script>
  import "../app.postcss";

  import LogoLandingPage from "../lib/LogoLandingPage.svelte";
</script>

<header class="flex flex-col w-full items-center shrink mb-6 md:mb-32">
  <LogoLandingPage />
  <p class="font-serif text-center md:w-max md:text-lg">
    An exploration of Charles Butler’s <em>The Feminine Monarchie</em>
  </p>
</header>

<slot />
