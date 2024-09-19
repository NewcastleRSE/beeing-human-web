<script>
    export let groups;
    export let selected;
    export let name
    
</script>

{#if name && selected && groups}
    <div class="col-start-2 flex flex-col max-w-fit my-auto">
        <label for={name}>{name}</label>
        <select id={name} bind:value={selected} class="rounded-lg">
            {#each groups as group}
                <option value={group}>{group}</option>
            {/each}
        </select>
    </div>
{:else}
    <p class="error-message">Error: nothing to be selected</p>
{/if}