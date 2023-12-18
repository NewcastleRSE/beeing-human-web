<script>
    import RawDataTable from "./RawDataTable.svelte";
    import GroupSelector from "./GroupSelector.svelte";
    import DataViz from "./DataViz.svelte";
    import { TabGroup, Tab } from '@skeletonlabs/skeleton'
    import {getGroups} from '../utils/sciDataHelper';
    export let datasets

    let selected = 'All'
    let tabset = 0;
</script>

{#each datasets as entry}
    <TabGroup>
        <Tab bind:group={tabset} name='tab1' value={0}>
            <span>Data table</span>
        </Tab>
        <Tab bind:group={tabset} name='tab2' value={1}>
            <span>Summary Data</span>
        </Tab>
        <Tab bind:group={tabset} name='tab2' value={2}>
            <span>Visualisation</span>
        </Tab>
        <Tab bind:group={tabset} name='tab2' value={3}>
            <span>Experimental Details</span>
        </Tab>

        <svelte:fragment slot="panel">
            {#if tabset === 0}
                <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected/>
                <RawDataTable tableObject={{data: entry.data, columns: entry.columns}} {selected}/>
            {:else if tabset === 1}
                <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected/>
                <RawDataTable tableObject = {{data: entry.summaryData, columns: entry.summaryColumns}} {selected}/>
            {:else if tabset === 2}
                <DataViz/>
            {:else if tabset === 3}
                <p>TBD</p>
            {/if}
        </svelte:fragment>
    </TabGroup>
{/each}