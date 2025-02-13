<script>
    import { capitaliseFirstLetter } from "../utils/stringOperations";
    import people from '../routes/people/people.json'
    import InjectBuzzword from "$lib/InjectBuzzword.svelte";
    import {base} from '$app/paths'

    let {buzzword, handleFilterClickBuzzword} = $props();

    let sortedBuzzword = $derived(buzzword.tags.toSorted())

    function getAuthorName(slug) {
        // from people object, get the name of the author
        return people[slug]['name'];
    }

</script>


<div class="card bg-surface-200 max-w-fill" data-testid="buzzword-card" id={buzzword.id}>
    <header class="card-header flex gap-x-10">
        {#if buzzword.author}
            <a href="{base}/people/{buzzword.author}"><img class="inline-block h-16 w-16 rounded-full border-solid border-2 border-primary-500" src="{base}/{people[buzzword.author]['img']}" alt=""/></a>
        {/if}
        
        <div class="flex flex-col gap-2">
        {#if buzzword.author}
            <a href="{base}/people/{buzzword.author}" class="byline font-extralight text-xs" data-testid="buzzword-byline">{getAuthorName(buzzword.author)}</a>
        {/if}
            <div class="flex gap-5 place-items-center">
                {#if buzzword.title}
                    <p class="text-lg">{buzzword.title}</p>
                {/if}
                {#if buzzword.date}
                    <p class="date font-light text-xs" data-testid="buzzword-date">{new Date(buzzword.date).toLocaleDateString('en-GB')}</p>
                {/if}
            </div>
        </div>
    </header>
    <section class="p-4" data-testid="buzzword-content"><InjectBuzzword buzzName={buzzword.id}/></section>
    <footer class="card-footer">
        {#if buzzword.tags}
            <div class="tags flex gap-1.5 flex-wrap">
                {#each sortedBuzzword as tag}
                    <button data-testid="chip-tag" class="chip variant-filled-surface hover:variant-ghost-surface" onclick={() => {handleFilterClickBuzzword(tag)}}>{capitaliseFirstLetter(tag)}</button>
                {/each}
            </div>
        {/if}
    </footer>
</div>