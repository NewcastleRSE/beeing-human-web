<script>
    export let cardObject;

    const typeColours = {
      'article': {
        'background': 'bg-primary-300',
        'text': 'text-primary-800'
      },
      'data': {
        'background': 'bg-secondary-300',
        'text': 'text-secondary-800'
      }
    }
</script>

<article class="flex flex-col items-start justify-between">
    <div class="relative w-full">
      <img src="{cardObject.img}" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
      <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
    </div>
    <div class="max-w-xl">

        <!-- DATE / TAG Info -->
      {#if cardObject.type}
        <div class="mt-8 flex items-center gap-x-4 text-xs">
          <div class="relative z-10 rounded-full {typeColours[cardObject.type]['background']} px-3 py-1.5 font-medium {typeColours[cardObject.type]['text']}">{cardObject.type}</div>
        </div>
      {/if}
      <div class="group relative">
        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="{cardObject.link}">
            <span class="absolute inset-0"></span>
            {cardObject.title}
          </a>
        </h3>
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{cardObject.lead}</p>
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