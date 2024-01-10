<script>
    import { onMount } from "svelte";
    import RawDataTable from "./RawDataTable.svelte";
    import GroupSelector from "./GroupSelector.svelte";
    import DataViz from "./DataViz.svelte";
    import InjectMD from './InjectMD.svelte';
    import { TabGroup, Tab } from '@skeletonlabs/skeleton'
    import {getGroups} from '../utils/sciDataHelper';
    
    export let datasets

    let selected = [];
    let tabset = [];
    let loaded = false;

    // Error codes
    // 0 = all good
    // 1 = No data received
    let error = 0

    onMount(async () => {
        // initialise an array of selected filters and tabsets
        // Necessary to have independent navigation of each dataset
        if (datasets.length > 0) {
            for (let i = 0; i < datasets.length; i++) {
                selected.push('All');
                tabset.push(0);
            }
        }
        else {
            error = 1
        }
        loaded = true;
    })
</script>

{#if loaded}
    {#if error == 0}
        {#each datasets as entry, index}
            <h2>{entry.desc.metadata.title}</h2>
            <TabGroup>
                <Tab bind:group={tabset[index]} name='tab1' value={0}>
                    <span>Data table</span>
                </Tab>
                <Tab bind:group={tabset[index]} name='tab2' value={1}>
                    <span>Summary Data</span>
                </Tab>
                <Tab bind:group={tabset[index]} name='tab2' value={2}>
                    <span>Visualisation</span>
                </Tab>
                <Tab bind:group={tabset[index]} name='tab2' value={3}>
                    <span>Experimental Details</span>
                </Tab>

                <svelte:fragment slot="panel">
                    {#if tabset[index] === 0}
                        <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected = {selected[index]}/>
                        <RawDataTable tableObject={{data: entry.data, columns: entry.columns}} selected = {selected[index]}/>
                    {:else if tabset[index] === 1}
                        <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected = {selected[index]}/>
                        <RawDataTable tableObject = {{data: entry.summaryData, columns: entry.summaryColumns}} selected = {selected[index]}/>
                    {:else if tabset[index] === 2}
                        <GroupSelector groups={getGroups('Treatment group', entry.data)} name = {'Treatment group'} bind:selected = {selected[index]}/>
                        <DataViz dataObject = {{data: entry.summaryData, labels: entry.summaryColumns}} bind:selected = {selected[index]} name = {entry.desc.metadata.title} rawData = {entry.data}/>
                    {:else if tabset[index] === 3}
                        <InjectMD content={entry.desc.content}/>
                    {/if}
                </svelte:fragment>
            </TabGroup>
        {/each}
    {:else}
        {#if error == 1}
            <p class="error-message">Error: no data available</p>
        {/if}            
    {/if}
{/if}