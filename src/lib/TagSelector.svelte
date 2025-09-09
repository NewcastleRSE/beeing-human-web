<script>
    import { capitaliseFirstLetter, removeSpaces } from '../utils/stringOperations';

    // load people.json to get author names
    import people from '../routes/(sections)/about/people/people.json';

    let {listTags, filter, handleClick} = $props();
</script>

<div class="flex flex-col gap-2" data-testid="tag-selector-container">
    {#if listTags && filter}
        <h4 class="h4 font-light text-lg">{capitaliseFirstLetter(filter)}</h4>
        <div class="flex flex-row flex-wrap gap-x-1 gap-y-2">
            {#key listTags}
                {#each listTags as tag}
                    <button data-testid="{filter}-chip" id="{removeSpaces(tag.name)}-filter" class="chip" class:variant-filled={tag.active} class:variant-filled-surface={!tag.active} onclick={() => handleClick(tag)} disabled={!tag.available}>{filter === 'authors' ? people[tag.name].name : tag.name} </button>
                {/each}
            {/key}
        </div>
    {:else}
        <p>Something went wrong...</p>
    {/if}
</div>