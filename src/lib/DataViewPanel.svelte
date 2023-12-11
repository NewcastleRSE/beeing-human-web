<script>
    import RawDataTable from "./RawDataTable.svelte";
    import GroupSelector from "./GroupSelector.svelte";
    export let datasets

    let selected = 'All'

    function getGroups(group, dataset) {
        // group is the column that contains the selector
        let result = new Set(dataset.map(entry => entry[group]))
        return ['All', ...result]
    }

</script>

{#each datasets as entry}
    <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected/>
    <RawDataTable tableObject={entry} {selected}/>
{/each}