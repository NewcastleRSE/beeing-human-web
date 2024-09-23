<script>
    export let groups;
    export let selected;
    export let name
    
</script>

{#if name && selected && groups}
    <div class="md:col-start-2 flex flex-col my-auto w-24 md:w-fit text-xs md:text-base gap-2">
        <label for={name}>{name}</label>
        <select id={name} bind:value={selected} class="rounded-lg text-xs md:text-base">
            {#each groups as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
    </div>
{:else}
    <p class="error-message">Error: nothing to be selected</p>
{/if}