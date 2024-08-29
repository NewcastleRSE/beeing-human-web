<script>
    import { capitaliseFirstLetter } from "../utils/stringOperations";
    import { daysOfTheWeek, monthsOfTheYear } from "../utils/generalConstants";
    import InjectBuzzword from "$lib/InjectBuzzword.svelte";
    import { createEventDispatcher } from "svelte";

    export let buzzword;

    const dispatch = createEventDispatcher();

    function handleFilterClickBuzzword(tag) {
        dispatch('filterClicked', {
            filter: tag
        });
    }
</script>

<div class="card" data-testid="buzzword-card" id={buzzword.id}>
    <header class="card-header">
        {#if buzzword.date}
            <p class="date" data-testid="buzzword-date">{daysOfTheWeek[buzzword.date.getDay()]}, {buzzword.date.getDate()} of {monthsOfTheYear[buzzword.date.getMonth()]} {buzzword.date.getFullYear()}</p>
        {/if}
    </header>
    <section class="p-4" data-testid="buzzword-content"><InjectBuzzword buzzName={buzzword.id}/></section>
    <footer class="card-footer">
        {#if buzzword.author}
            <p class="byline" data-testid="buzzword-byline">by {capitaliseFirstLetter(buzzword.author)}</p>
        {/if}
        {#if buzzword.tags}
            <div class="tags">
                {#each buzzword.tags.sort() as tag}
                    <span data-testid="chip-tag" class="chip variant-ghost" on:click={handleFilterClickBuzzword(tag)} on:keypress>{capitaliseFirstLetter(tag)}</span>
                {/each}
            </div>
        {/if}
    </footer>
</div>