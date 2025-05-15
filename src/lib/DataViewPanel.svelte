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

    import { dataViewerState } from "../stores/dataViewer.svelte";
    import GraphControls from "./GraphControls.svelte";
    import { derived } from "svelte/store";

    let { datasetArray } = $props();

    let dataset = $derived.by(() => {
        return datasetArray[dataViewerState.activeDataset];
    });

    let selected = $state("All");
    let loaded = $state(false);

    // Error codes
    // 0 = all good
    // 1 = No data received
    let error = $derived.by(() => {
        if (dataset) {
            return 0;
        } else {
            return 1;
        }
    });

    onMount(() => {
        if (!dataset && datasetArray) {
            dataViewerState.activeDataset = 0;
            dataViewerState.activeView = "details";
        }
        loaded = true;
    });
</script>

{#key dataViewerState.activeDataset}
    {#if error == 0 && loaded}
        <div class="md:w-2/3 m-auto" data-testid="data-content-div">
            {#if dataViewerState.activeView === "data"}
                <GraphControls>
                    <GroupSelector
                        groups={getGroups("Treatment group", dataset.data)}
                        name={"Treatment group"}
                        bind:selected
                    />
                </GraphControls>

                <RawDataTable
                    tableObject={{
                        data: dataset.data,
                        columns: dataset.columns,
                    }}
                    {selected}
                />
            {:else if dataViewerState.activeView === "summary"}
                <GraphControls>
                    <GroupSelector
                        groups={getGroups("Treatment group", dataset.data)}
                        name={"Treatment group"}
                        bind:selected
                    />
                </GraphControls>
                <RawDataTable
                    tableObject={{
                        data: dataset.summaryData,
                        columns: dataset.summaryColumns,
                    }}
                    {selected}
                />
            {:else if dataViewerState.activeView === "visualisation"}
                <DataViz
                    dataObject={{
                        data: dataset.summaryData,
                        labels: dataset.summaryColumns,
                    }}
                    bind:selected
                    name={dataset.desc.metadata.title}
                    rawData={dataset.data}
                    groups={getGroups("Treatment group", dataset.data)}
                />
            {:else if dataViewerState.activeView === "details"}
                <InjectMD content={dataset.desc.content} />
            {/if}
        </div>
    {:else if error == 1 && loaded}
        <p class="error-message">Error: no data available</p>
    {/if}
{/key}
