<script>
  import "../app.postcss";

  import LogoLandingPage from "../lib/LogoLandingPage.svelte";
</script>

<header class="flex flex-col w-full items-center text-lg shrink">
  <LogoLandingPage/>
  <p class="font-serif md:w-max">An exploration of Charles Butler’s <em>The Feminine Monarchie</em></p>
</header>


<slot />
