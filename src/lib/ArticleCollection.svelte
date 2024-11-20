<script>
    import ArticleCard from "$lib/ArticleCard.svelte";
    let { data } = $props();
</script>

<div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
            {#each Object.keys(data) as key}
                <ArticleCard cardObject={data[key]} />
            {/each}
        </div>
    </div>
</div>
