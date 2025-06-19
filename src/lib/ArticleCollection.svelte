<script>
    import ArticleCard from "$lib/ArticleCard.svelte";
    let { data } = $props();

    let articles = $derived.by(() => {
        if (data && Object.keys(data).length > 0) {
            const hasOrder = Object.values(data).some(
                (item) => item.order !== undefined,
            );
            if (hasOrder) {
                // Sort the data by the order property
                return Object.fromEntries(
                    Object.entries(data).sort(
                        ([, a], [, b]) => (a.order || 0) - (b.order || 0),
                    ),
                );
            } else {
                return data
            }
        }
    });

</script>

{#key articles}
    <div class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div
                class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
                {#each Object.keys(articles) as key}
                    <ArticleCard cardObject={data[key]} />
                {/each}
            </div>
        </div>
    </div>
{/key}
