<script>
    import { onMount } from "svelte";

    // listIndex should be an array of arrays in which the first value is the display name and the second value is the xml:id
    let { options, valueChange, currentSelected, disabled = false } = $props();

    let selected = $state(0);
    let validValues = [];

    onMount(() => {

        // list all possible values of  listIndex
        
        for (const val of options.listIndex) {
            validValues.push(val[1]);
        }
        
        if (validValues.includes(currentSelected)) {
            // find the index of the currentSelected value in the listIndex array
            selected = currentSelected;
        } else if (options && options.defaultSelected != 0) {
            selected = options.defaultSelected;
        }
    });

    function changeSelected(event) {
        valueChange({ origin: "navigator", newValue: selected });
    }

    $effect(() => {
        if (validValues.includes(currentSelected)) {
            selected = currentSelected;
        }
    });
</script>

{#if options != undefined}
    <div
        class="flex text-4xl md:text-5xl justify-center items-center text-gray-600 w-48 {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
    >
        <button
            class="hover:font-bold hover:cursor-pointer hover:text-black transition-all ease-in-out duration-200 motion-reduce:transition-none"
            onclick={() => {
                const currentlySelectedIndex = options.listIndex.findIndex(
                    (section) => section[1] == selected,
                );
                selected = options.listIndex[currentlySelectedIndex - 1][1];
                changeSelected();
            }}
            disabled={!disabled ? selected == options.listIndex[0][1] : disabled} aria-label="Previous section"
        >
            <svg
                class="size-[32px] fill-secondary-400 hover:fill-secondary-800 rotate-180"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
            >
                <path
                    id="XMLID_222_"
                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
            C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
            C255,161.018,253.42,157.202,250.606,154.389z"
                />
            </svg>
        </button>
        <select
            bind:value={selected}
            class="select text-lg text-center md:text-xl bg-transparent border-none rounded-lg max-w-fit font-pfdisplay hover:font-bold hover:cursor-pointer transition-all ease-in-out duration-200 motion-reduce:transition-none text-black w-40"
            onchange={changeSelected}
            id="navigator-select"
            disabled={disabled}
        >
            {#each options.listIndex as section}
                <option value={section[1]}>{section[0]}</option>
            {/each}
        </select>
        <button
            class="hover:font-bold hover:cursor-pointer hover:text-black transition-all ease-in-out duration-200 motion-reduce:transition-none"
            onclick={() => {
                const currentlySelectedIndex = options.listIndex.findIndex(
                    (section) => section[1] == selected,
                );
                selected = options.listIndex[currentlySelectedIndex + 1][1];
                changeSelected();
            }}
            disabled={!disabled ? selected == options.listIndex[options.listIndex.length - 1][1] : disabled} aria-label="Next section"
        >
            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg
                class="size-[32px] fill-secondary-400 hover:fill-secondary-800"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
            >
                <path
                    id="XMLID_222_"
                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
            c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
            C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
            C255,161.018,253.42,157.202,250.606,154.389z"
                />
            </svg></button
        >
    </div>
{/if}
