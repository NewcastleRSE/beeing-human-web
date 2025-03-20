<!--
    @component
    - Creates the options bar that goes above any direct exploration of data;
    - generates the controls from a JSON object called `controlsArray`, see default object for the structure;
    -forwards an event called `valueChange` everytime one of those controls changes
    
    @param controlsArray {array} - An array of objects containig options for each control to be added
  -->

<script>
    import DataSourceControl from "$lib/DataSelectorControls/DataSourceControl.svelte";
    import DataRadioGroupControl from "$lib/DataSelectorControls/DataRadioGroupControl.svelte";
    import DataSlideToggle from "$lib/DataSelectorControls/DataSlideToggle.svelte";

    import Maximize from "./icons/Maximize.svelte";
    import Minimize from "./icons/Minimize.svelte";

    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    import DataNavigator from "$lib/DataSelectorControls/DataNavigator.svelte";

    import { beforeNavigate, afterNavigate } from "$app/navigation";

    import { dataViewerState } from "../stores/dataViewer.svelte";

    let { controlsArray } = $props();

    function updateDataSource(changeObject) {
        let returnValue = changeObject.newValue;

        if (!isNaN(changeObject.newValue)) {
            returnValue = parseInt(changeObject.newValue);
        }

        dataViewerState.activeDataset = returnValue;
    }

    function updateOtherFilters(changeObject) {
        if (changeObject.origin === "view") {
            dataViewerState.activeView = changeObject.newValue;
        }

        if (changeObject.origin === "variation") {
            dataViewerState.variationDetail = changeObject.newValue;
        }

        if (changeObject.origin === "editorial notes") {
            dataViewerState.editorialNotes = changeObject.newValue;
        }

        if (changeObject.origin === "navigator") {
            dataViewerState.activeNavigator = changeObject.newValue;
        }
    }

    let width = $state(undefined);

    let showBar = $state(true);

    let smallScreen = $derived.by(() => {
        return width < 768;
    });

    const toggleBar = () => {
        restPoint = scrollValue;
        showBar = !showBar;
    };

    let scrollValue = $state(undefined);

    // set a variable that determines whether or not the user scrolled past a certain delta after the previous rest point
    const scrollDelta = 500;
    let restPoint = 0;
    let open = false;
    
    let pastDelta = $derived.by(() => {
        if (scrollValue && smallScreen) {
            if (scrollValue < restPoint) {
                restPoint = scrollValue;
                if (scrollValue < scrollDelta) {
                    open = true;
                    return true;
                } else {
                    return false;
                }
            }

            if (scrollValue > restPoint + scrollDelta) {
                restPoint = scrollValue;
                return true;
            } else {
                return false;
            }
        }
    });

    $effect(() => {
        if (pastDelta && !open) {
            showBar = false;
        } else if (pastDelta && open) {
            showBar = true;
            open = false;
        }
    });

    $effect(() => {
        if (!smallScreen) {
            showBar = true;
        }
    })

    // THIS SOLUTION SEEMS TO WORK BUT IS A LITTLE HACKY -- TEST IT MORE
    let lastScrollValue = 0;
    beforeNavigate(() => {
        lastScrollValue = scrollValue;
    });

    afterNavigate(() => {
        window.scrollTo(0, lastScrollValue);
    });

</script>

<svelte:window bind:innerWidth={width} bind:scrollY={scrollValue}/>

{#key dataViewerState}
    <form class="sticky top-0 md:static md:z-auto w-full bg-primary-400 py-6">
        {#if smallScreen}
            <button
                onclick={toggleBar}
                class="w-max ml-8 mr-auto"
                data-sveltekit-noscroll
                >{#if showBar}
                    <Minimize />
                {:else}
                    <Maximize />
                {/if}</button
            >
        {/if}
        {#if showBar}
            <div
                transition:slide={{ duration: 200, easing: cubicInOut }}
                class="flex flex-col flex-wrap md:flex-row items-center md:justify-between md:content-center md:px-12 py-10 gap-2"
            >
                <!-- Data source selector goes here -->
                {#each controlsArray as controlOptions}
                    {#if controlOptions.dataSource}
                        <DataSourceControl
                            options={controlOptions}
                            valueChange={(changeObject) =>
                                updateDataSource(changeObject)}
                            currentValue={dataViewerState.activeDataset}
                        />
                    {/if}
                {/each}
                <div
                    class="flex flex-col md:flex-row items-center md:content-center gap-4 md:gap-32 flex-wrap"
                >
                    <!-- Other controls go here -->
                    {#each controlsArray as controlOptions}
                        {#if !controlOptions.dataSource}
                            {#if controlOptions.type === "radioGroup"}
                                <DataRadioGroupControl
                                    options={controlOptions}
                                    valueChange={(changeObject) =>
                                        updateOtherFilters(changeObject)}
                                />
                            {:else if controlOptions.type === "toggle"}
                                <DataSlideToggle
                                    options={controlOptions}
                                    valueChange={(changeObject) =>
                                        updateOtherFilters(changeObject)}
                                />
                            {:else if controlOptions.type === "navigator"}
                                <DataNavigator
                                    options={controlOptions}
                                    valueChange={(changeObject) =>
                                        updateOtherFilters(changeObject)}
                                />
                            {/if}
                        {/if}
                    {/each}
                </div>
            </div>
        {/if}
    </form>
{/key}
