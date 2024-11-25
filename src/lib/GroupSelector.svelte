<script>
    let { groups, selected = $bindable(), name } = $props();
    
</script>

{#if name && selected && groups}
    <div class="md:col-start-2 flex flex-col my-auto w-24 md:w-fit text-xs md:text-base gap-2">
        <label for={name}>{name}</label>
        <select id={name} bind:value={selected} class="rounded-lg text-xs md:text-base">
            {#key groups}
            {#each groups as group}
                <option value={group}>{group}</option>
            {/each}
            {/key}
        </select>
    </div>
{:else}
    <p class="error-message">Error: nothing to be selected</p>
{/if}