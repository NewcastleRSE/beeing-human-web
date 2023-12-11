<script>
    import { onMount } from 'svelte'
    export let tableObject;
    export let selected;

    let entire_dataset = [];
    let colNames = [];
    let loaded = false;
    let dataset = []

    function filterDataset(selected) {
        if (selected === 'All') {
            return entire_dataset
        } else {
            return entire_dataset.filter((entry) => entry['Treatment group'] === selected);
        }
    }
    
    onMount( async () => {
        // turn tableObject into an array of objects
        for (let [index, entry] of Object.entries(tableObject.data)) {
            entire_dataset.push(entry);
        }

        for (let [index, entry] of Object.entries(tableObject.columns)) {
            colNames.push(entry)
        }

        dataset = filterDataset(selected);

        loaded = true;

    });

    $: dataset = filterDataset(selected)
    $: console.log(dataset)

</script>

{#if loaded}
    <div class="px-4 sm:px-6 lg:px-8 ">
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-fit divide-y divide-gray-300">
                        <thead>
                            <tr>
                            {#each colNames as colName}
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">{colName}</th>
                            {/each}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                        {#each dataset as entry}
                            <tr>
                            {#each colNames as colName}
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry[colName]}</td>
                            {/each}
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
{:else}
    <p>Loading...</p>
{/if}