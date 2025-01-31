<script>
  import LogoLandingPage from "$lib/LogoLandingPage.svelte";
  import Breadcrumbs from "$lib/Breadcrumbs.svelte";

  import ArticleCollection from "$lib/ArticleCollection.svelte";

  import { page } from "$app/stores";
  import SectionHero from "../../lib/SectionHero.svelte";
    import PeopleCollection from "../../lib/PeopleCollection.svelte";

  let path = $derived.by(() => {
    let path = $page.route.id.split("/");
    if (path[path.length-1] === '[slug]') {
      path[path.length-1] = $page.params.slug;
    }
    return path;
  });
  
  let { data, children } = $props();

  console.log($page)

  let isSlug = () => {
    if (Object.keys($page.params).includes('slug')) {
      return true;
    } else {
      return false;
    }
  }
</script>

{@debug path}

<div class="w-4/5 mx-auto my-6">
  <header class="w-full my-6 md:my-20">
    <div
      class="flex flex-col gap-1 md:gap-4 max-w-64 mx-auto md:max-w-full md:flex-row items-center justify-center shrink"
    >
      <LogoLandingPage class="max-h-8 md:max-h-28" />

    </div>
    <Breadcrumbs {path} data={{}} class="md:left-0" />
  </header>
</div>

  <SectionHero
    title='People'
    img={undefined}
    type='section'
  >
    
  </SectionHero>

<div class="w-4/5 mx-auto my-6">
  {#if !isSlug(path)}
    <PeopleCollection people = {data.people}/>
  {:else}
    {@render children()}
  {/if}
</div>  

