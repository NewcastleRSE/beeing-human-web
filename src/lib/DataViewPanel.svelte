<!--@component
    Component to display datasets in various forms, including a complete data table, a table with summary data, visualisation(s), and a narrative description of the experimental details.

    properties:

    `datasets`: an **array** of datasets in json format.

 -->

<script>
    import { onMount } from "svelte";
    import RawDataTable from "./RawDataTable.svelte";
    import GroupSelector from "./GroupSelector.svelte";
    import DataViz from "./DataViz.svelte";
    import InjectMD from "./InjectMD.svelte";
    import { getGroups } from "../utils/sciDataHelper";

    import { activeView } from "../stores/dataViewer";
    import GraphControls from "./GraphControls.svelte";

    export let datasets;

    let selected = "All";
    let entry = undefined;
    let loaded = false;

    // Error codes
    // 0 = all good
    // 1 = No data received
    let error = 0;

    onMount(async () => {
        // initialise an array of selected filters and tabsets
        // Necessary to have independent navigation of each dataset
        if (datasets.length > 0 && datasets.length < 2) {
            entry = datasets[0];
        } else {
            error = 1;
        }
        loaded = true;
    });
</script>

<div class="w-2/3 m-auto">
    {#if loaded}
        {#if error == 0}
            {#if $activeView === "data"}
                <GraphControls
                >
                    <GroupSelector
                        groups={getGroups("Treatment group", entry.data)}
                        name={"Treatment group"}
                        bind:selected
                    />
                </GraphControls>

                <RawDataTable
                    tableObject={{ data: entry.data, columns: entry.columns }}
                    {selected}
                />
            {:else if $activeView === "summary"}
                <GraphControls>
                    <GroupSelector
                    groups={getGroups("Treatment group", entry.data)}
                    name={"Treatment group"}
                    bind:selected
                    />
                </GraphControls>
                <RawDataTable
                    tableObject={{
                        data: entry.summaryData,
                        columns: entry.summaryColumns,
                    }}
                    {selected}
                />
            {:else if $activeView === "visualisation"}
                <DataViz
                    dataObject={{
                        data: entry.summaryData,
                        labels: entry.summaryColumns,
                    }}
                    bind:selected
                    name={entry.desc.metadata.title}
                    rawData={entry.data}
                    groups={getGroups("Treatment group", entry.data)}
                />
            {:else if $activeView === "details"}
                <InjectMD content={entry.desc.content} />
            {/if}
        {:else if error == 1}
            <p class="error-message">Error: no data available</p>
        {/if}
    {/if}
</div>
