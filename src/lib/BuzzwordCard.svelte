<script>
    import { capitaliseFirstLetter } from "../utils/stringOperations";
    import people from '../routes/(sections)/people.json'
    import InjectBuzzword from "$lib/InjectBuzzword.svelte";
    import { createEventDispatcher } from "svelte";
    import {base} from '$app/paths'

    export let buzzword;

    const dispatch = createEventDispatcher();

    function handleFilterClickBuzzword(tag) {
        dispatch('filterClicked', {
            filter: tag
        });
    }

</script>

<div class="card bg-surface-200 max-w-fill" data-testid="buzzword-card" id={buzzword.id}>
    <header class="card-header flex gap-x-10">
        {#if buzzword.author}
            <img class="inline-block h-16 w-16 rounded-full border-solid border-2 border-primary-500" src="{base}/{people[buzzword.author]['img']}" alt=""/>
        {/if}
        
        <div class="flex flex-col gap-2">
        {#if buzzword.author}
            <p class="byline font-extralight text-xs" data-testid="buzzword-byline">{capitaliseFirstLetter(buzzword.author)}</p>
        {/if}
            <div class="flex gap-5 place-items-center">
                {#if buzzword.title}
                    <p class="text-lg">{buzzword.title}</p>
                {/if}
                {#if buzzword.date}
                    <p class="date font-light text-xs" data-testid="buzzword-date">{buzzword.date.toLocaleDateString('en-GB')}</p>
                {/if}
            </div>
        </div>
    </header>
    <section class="p-4" data-testid="buzzword-content"><InjectBuzzword buzzName={buzzword.id}/></section>
    <footer class="card-footer">
        {#if buzzword.tags}
            <div class="tags flex gap-1.5">
                {#each buzzword.tags.sort() as tag}
                    <span data-testid="chip-tag" class="chip variant-filled-surface hover:variant-ghost-surface" on:click={handleFilterClickBuzzword(tag)} on:keypress>{capitaliseFirstLetter(tag)}</span>
                {/each}
            </div>
        {/if}
    </footer>
</div>