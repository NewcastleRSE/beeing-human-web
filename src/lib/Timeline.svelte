<script>
    import InjectMD from '$lib/InjectMD.svelte';
    let {timelineArray} = $props();
</script>

<div class="py-24 sm:py-32 dark:bg-gray-900">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {#each timelineArray as { date, dateString, title, description }, i}
      <div>
        <time datetime={date} class="flex items-center text-sm/6 font-semibold text-secondary-400 dark:text-indigo-400">
          <svg viewBox="0 0 4 4" aria-hidden="true" class="mr-4 size-1 flex-none">
            <circle r="2" cx="2" cy="2" fill="currentColor" />
          </svg>
          {dateString}
          <!-- only display this div if not the last in the array -->
          {#if i !== timelineArray.length - 1}
          <div aria-hidden="true" class="absolute -ml-2 h-px w-screen -translate-x-full bg-secondary-700/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0 dark:bg-white/15"></div>
          {/if}
        </time>
        <p class="mt-6 text-lg/8 font-semibold tracking-tight text-primary-600 dark:text-white"><InjectMD content={title} layout={false} outerTag={false} /></p>
        <p class="mt-1 text-base/7 text-gray-600 dark:text-gray-400"><InjectMD content={description} layout={false} outerTag={false} /></p>
      </div>
      {/each}
    </div>
  </div>
</div>