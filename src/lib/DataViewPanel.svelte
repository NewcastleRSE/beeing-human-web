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

    onMount(async () => {
        // initialise an array of selected filters and tabsets
        // Necessary to have independent navigation of each dataset
        for (let i = 0; i < datasets.length; i++) {
            selected.push('All');
            tabset.push(0);
        }
        loaded = true;
    })
</script>

{#if loaded}
    {#each datasets as entry, index}
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
                    <DataViz dataObject = {{data: entry.summaryData, labels: entry.summaryColumns}} selected = {selected[index]}/>
                {:else if tabset[index] === 3}
                    <InjectMD content={entry.desc.content}/>
                {/if}
            </svelte:fragment>
        </TabGroup>
    {/each}
{/if}