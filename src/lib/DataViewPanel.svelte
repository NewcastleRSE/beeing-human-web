<script>
    import RawDataTable from "./RawDataTable.svelte";
    import GroupSelector from "./GroupSelector.svelte";
    import { TabGroup, Tab } from '@skeletonlabs/skeleton'
    export let datasets

    let selected = 'All'
    let tabset = 0;

    function getGroups(group, dataset) {
        // group is the column that contains the selector
        let result = new Set(dataset.map(entry => entry[group]))
        return ['All', ...result]
    }

</script>

{#each datasets as entry}
    <TabGroup>
        <Tab bind:group={tabset} name='tab1' value={0}>
            <span>Data table</span>
        </Tab>
        <Tab bind:group={tabset} name='tab2' value={1}>
            <span>Visualisation</span>
        </Tab>

        <svelte:fragment slot="panel">
            {#if tabset === 0}
                <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected/>
                <RawDataTable tableObject={entry} {selected}/>
            {:else if tabset === 1}
                <p>Nohting to see here</p>
            {/if}
        </svelte:fragment>
    </TabGroup>
{/each}