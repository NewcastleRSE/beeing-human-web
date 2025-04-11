<script>
    let { h1text, h2text, goText, goLink, moreText=undefined, moreLink=undefined} = $props();
</script>

<div class="bg-secondary-100 rounded-lg my-24">
    <div class="mx-auto max-w-7xl px-6 py-16 flex flex-col md:flex-row justify-between px-8">
      <h2 class="max-w-2xl text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{h1text}<br><span class="text-xl text-gray-700 font-light">{h2text}</span></h2>
      <div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
        <a href="{goLink}" class="rounded-md bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-secondary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600" target="_blank">{goText}</a>
        {#if moreText}
        <a href={moreLink} class="text-sm/6 font-semibold text-secondary-900">{moreText} <span aria-hidden="true">→</span></a>
        {/if}
      </div>
    </div>
  </div>