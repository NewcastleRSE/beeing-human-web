<script>
    export let groups;
    export let selected;
    export let name
    
</script>

{#if name && selected && groups}
    <label for={name}>{name}</label>
    <select id={name} bind:value={selected}>
        {#each groups as group}
            <option value={group}>{group}</option>
        {/each}
    </select>
{:else}
    <p class="error-message">Error: nothing to be selected</p>
{/if}