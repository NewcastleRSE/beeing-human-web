<script>
    export let data = [];
</script>

{#if data.length > 0}
    <div class="px-4 sm:px-6 lg:px-8 ">
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-fit divide-y divide-gray-300">
                        <thead>
                            <tr>
                    {#each data.columns as colName}
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">{colName}</th>
                    {/each}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                {#each data as entry}
                            <tr>
                        {#each data.columns as colName}
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