<script>
    import RawDataTable from "./RawDataTable.svelte";
    export let datasets
</script>

{#each datasets as entry}
    <RawDataTable tableObject={entry}/>
{/each}