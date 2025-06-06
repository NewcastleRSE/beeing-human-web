<script>
  import  {typeColours} from '../utils/typeColours'
  import InternalLink from '$lib/InternalLink.svelte';
  import InjectMd from './InjectMD.svelte';
  let { cardObject } = $props();
</script>

<article class="flex flex-col items-start justify-between rounded-lg group hover:ring-8 hover:ring-primary-300 ring-offset-8 ring-primary-300/25 transition-all transition-c duration-500 motion-reduce:transition-none">
  <InternalLink link = {cardObject.link} class="no-underline">
    <div class="relative w-full">
      <img src="{cardObject.img}" alt="{cardObject.imgAlt}" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
      <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
    </div>
    <div class="max-w-xl">

        <!-- DATE / TAG Info -->
      {#if cardObject.type}
        <div class="mt-8 flex items-center gap-x-4 text-xs">
          {#each cardObject.type as typeChip}
            <div class="relative z-10 rounded-full {typeColours[typeChip]['background']} px-3 py-1.5 font-normal {typeColours[typeChip]['text']}">{typeChip}</div>
          {/each}
        </div>
      {/if}
      <div class="group relative">
        <h3 class="mt-3 text-lg font-semibold leading-6 group-hover:text-primary-600 group-hover:font-black transition-colours ease-in-out duration-150 motion-reduce:transition-none">
            <span class="absolute inset-0"></span>
            <InjectMd content={cardObject.title} layout={false}/>
        </h3>
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-secondary-600"><InjectMd content={cardObject.lead} layout={false}/></p>
      </div>

      <!-- IF WE WANT AUTHOR INFO -->
      <!-- <div class="relative mt-8 flex items-center gap-x-4">
        <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-10 w-10 rounded-full bg-gray-100">
        <div class="text-sm leading-6">
          <p class="font-semibold text-gray-900">
            <a href="#">
              <span class="absolute inset-0"></span>
              Michael Foster
            </a>
          </p>
          <p class="text-gray-600">Co-Founder / CTO</p>
        </div>
      </div> -->

    </div>
  </InternalLink>
  </article>


  <!-- IF WE WANT HEXAGON CARDS, THIS IS WHAT IT WOULD BE -->
  <!-- <article class="flex flex-col place-items-center justify-between">
    <div style="background-image: url({cardObject.img}); background-size: cover;" class="w-64 h-60 clip-path-hexagonLarge">
    </div>
    <div class="max-w-64">

      <div class="group relative">
        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 text-center">
          <a href="{cardObject.link}">
            <span class="absolute inset-0"></span>
            {cardObject.title}
          </a>
        </h3>
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{cardObject.lead}</p>
      </div>

    </div>
  </article> -->