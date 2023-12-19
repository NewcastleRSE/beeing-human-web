<script>
    export let dataObject = undefined;
</script>

{#if dataObject.data == undefined || dataObject.labels == undefined}
    <p>No data passed</p>
{:else}
    {#each dataObject.data as d}
        <p>{JSON.stringify(d)}</p>
    {/each}
    {#each dataObject.labels as l}
        <p>{l}</p>
    {/each}
{/if}