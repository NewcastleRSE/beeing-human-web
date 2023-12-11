<script>
    import { onMount } from "svelte";
    import RawDataTable from "./RawDataTable.svelte";
    export let data;
    export let groups;
    let summaryData = [];
    let loaded = false;

    function getMean(dataArray) {
        const n = dataArray.length;
        return dataArray.reduce((a, b) => a + b) / n
    }

    function getStdDeviation(mean, dataArray) {
        const n = dataArray.length;
        return Math.sqrt(dataArray.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }

    function getStdError(stdDeviation, dataArray) {
        const n = dataArray.length;
        return stdDeviation / Math.sqrt(n);
    }

    onMount(() => {
        // build summary statistics for each treatment group/cue group pair
        let cues = [
            "Cue Near Positive",
            "Cue Positive",
            "Medium",
            "Near Negative",
            "Negative",
        ];

        for (let group of groups) {
            if (group != 'All') {
                let data_grouped = data.filter((entry) => entry['Treatment group'] === group)
                for (let cue of cues) {
                    // put this into an object, calculate mean standard deviation, standard error
                    let dataArray = data_grouped.map((entry) => (parseInt(entry[cue])))
                    let mean = getMean(dataArray);
                    let stdDeviation = getStdDeviation(mean, dataArray)
                    let stdError = getStdError(stdDeviation, dataArray);

                    summaryData.push({group, cue, mean, stdDeviation, stdError})
                }   
            }
        }
        
        loaded = true;
    });
</script>

{#if loaded}
    <RawDataTable tableObject = {{data: summaryData, columns:['group', 'cue', 'mean', 'stdDeviation', 'stdError']}} selected='All'/>
{/if}