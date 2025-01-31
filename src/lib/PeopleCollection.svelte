<script>
    import PersonCard from "./PersonCard.svelte";

    let { people } = $props();
</script>

{@debug people}

{#if people}
    <div class="flex flex-wrap w-2/3 m-auto">
        {#each Object.keys(people).sort() as key}
            <PersonCard person={people[key]} />
        {/each}
    </div>
{/if}
