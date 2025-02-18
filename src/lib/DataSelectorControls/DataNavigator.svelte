<script>
    import { onMount } from "svelte";

    // listIndex should be an array of arrays in which the first value is the display name and the second value is the xml:id
    let { options, valueChange } = $props();

    let selected = $state(0);

    onMount(() => {
        if (options && options.defaultSelected != 0) {
            selected = options.defaultSelected;
        }
    })

    function changeSelected () {
        valueChange({origin: 'navigator', newValue: options.listIndex[selected][1]})
    }
</script>

{#if options != undefined}
    <div>
        <button 
            onclick={() => {
                selected -= 1;
                changeSelected();
            }}
        disabled={selected == 0}>
            ←
        </button>
        <select bind:value={selected}
        onchange= {changeSelected}>
            {#each options.listIndex as section, i}
                <option value={i}>{section[0]}</option>
            {/each}
        </select>
        <button
            onclick={() => {
                selected += 1;
                changeSelected();
            }}
        disabled={selected == options.listIndex.length - 1}>
            →
        </button>
    </div>
{/if}
