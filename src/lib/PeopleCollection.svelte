<script>
    import PersonCard from "./PersonCard.svelte";
    import TextDivider from "./TextDivider.svelte";

    let { people } = $props();
</script>

{#if people}
    <div class="flex flex-col items-center gap-12 my-12">
        <h2 class="h2 text-secondary-700">Project Team</h2>
        <div class="flex flex-wrap w-2/3 m-auto justify-start">
            {#each Object.keys(people).sort() as key}
                {#if people[key].role === "core"}
                    <PersonCard person={people[key]} />
                {/if}
            {/each}
        </div>
        <TextDivider class="w-1/3"/>
        <h2 class="h2 text-secondary-700">Contributors</h2>
        <div class="flex flex-wrap w-2/3 m-auto justify-start">
            {#each Object.keys(people).sort() as key}
                {#if people[key].role === "contributor"}
                    <PersonCard person={people[key]} />
                {/if}
            {/each}
        </div>
    </div>
{/if}
