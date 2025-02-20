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

    function changeSelected (event) {
        valueChange({origin: 'navigator', newValue: selected})
    }
</script>

{#if options != undefined}
    <div>
        <button 
            onclick={() => {
                const currentlySelectedIndex = options.listIndex.findIndex((section) => section[1] == selected);
                selected = options.listIndex[currentlySelectedIndex - 1][1];
                changeSelected();
            }}
        disabled={selected == options.listIndex[0][1]}>
            ←
        </button>
        <select bind:value={selected}
        onchange= {changeSelected} id="navigator-select">
            {#each options.listIndex as section}
                <option value={section[1]}>{section[0]}</option>
            {/each}
        </select>
        <button
            onclick={() => {
                const currentlySelectedIndex = options.listIndex.findIndex((section) => section[1] == selected);
                selected = options.listIndex[currentlySelectedIndex + 1][1];
                changeSelected();
            }}
        disabled={selected == options.listIndex[options.listIndex.length - 1][1]}>
            →
        </button>
    </div>
{/if}
