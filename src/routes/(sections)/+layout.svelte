<script>
  import LogoLandingPage from "$lib/LogoLandingPage.svelte";
  import SectionSelector from "$lib/SectionSelector.svelte";
  import Breadcrumbs from "$lib/Breadcrumbs.svelte";

  import ArticleCollection from "$lib/ArticleCollection.svelte";

  import { page } from "$app/stores";
  import SectionHero from "../../lib/SectionHero.svelte";
  import DataSelector from "$lib/DataSelector.svelte";
  import heros from "./heros.json";

  let path = $derived($page.route.id.split("/"));
  let section = $derived($page.route.id.split("/")[2]);

  function isSection(path) {
    if (path.length <= 3) {
      return true;
    } else {
      return false;
    }
  }

  let { data, children } = $props();

  let { heroObject, subsectionMetada } = $derived.by(() => {
    let subsectionMetada = undefined;
    let heroObject = undefined;
    if (data) {
      if (isSection(path)) {
        for (const key of Object.keys(data)) {
          if (data[key].parent === section) {
            if (subsectionMetada === undefined) {
              subsectionMetada = {};
            }
            subsectionMetada[key] = data[key];
            heroObject = heros[section];
          }
        }
      } else {
        const route = path.slice(2).join("/");
        for (const key of Object.keys(data)) {
          if (data[key].link === route) {
            heroObject = data[key];
            break;
          }
        }
      }
    }
    return { heroObject, subsectionMetada };
  });

</script>

{#key path}
<div class="w-4/5 mx-auto my-6">
  <header class="w-full my-6 md:my-20">
    <div
      class="flex flex-col gap-1 md:gap-4 max-w-64 mx-auto md:max-w-full md:flex-row items-center justify-center shrink"
    >
      <LogoLandingPage class="max-h-8 md:max-h-28" />
      <div
        class="w-1/2 border-t md:w-0 md:self-center md:h-28 md:border-l md:border-t-0 border-surface-500 self-end justify-self-end"
      ></div>
      <SectionSelector {section} />
    </div>
    <Breadcrumbs {path} {data} class="md:left-0" />
  </header>
</div>

{#if "dataSelector" in heroObject && heroObject.dataSelector}
  <DataSelector
    controlsArray={heroObject.dataSelectorControls}
    on:valueChange={(e) => {
      console.log(e.detail);
    }}
  />
{:else}
  <SectionHero
    title={heroObject.title}
    img={heroObject.img ? heroObject.img : undefined}
    type={heroObject.type}
  >
    {heroObject.lead}
  </SectionHero>
{/if}

<div class="w-4/5 mx-auto my-6">
  {@render children()}
  {#if isSection(path)}
    <ArticleCollection data={subsectionMetada} />
  {/if}
</div>  
{/key}

