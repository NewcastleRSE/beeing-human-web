<script>
    export let options;
</script>

<select
    name="data-source"
    id="data-source-select"
    class="select text-3xl bg-transparent border-none rounded-lg pr-16 max-w-fit font-pfdisplay hover:font-bold hover:cursor-pointer transition-all ease-in-out duration-200 motion-reduce:transition-none"
>
    {#each Object.entries(options.values) as [label, value]}

        {#if (label === options.default)}
            <option value={value} selected>{label}</option>
        {:else}
            <option value={value}>{label}</option>
        {/if}
        
    {/each}
</select>
