<!--
    @component
    - Creates an on/off switch ;
    - generates the options from an object called `options`;
    - sends an event called `valueChange` everytime one of those controls changes
    
    @param options {object} - An object containing at least an object of options and their values and the value of the default value;
  -->
<script>
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let { options, valueChange, currentValue } = $props();

    let slideValue = $state(undefined);

    let disabled = $derived.by(() => {
        if (currentValue === 'disabled') {
            return true;
        } else {
            return false;
        }
    });

    onMount(() => {
        if ([true, false].includes(currentValue)) {
            slideValue = currentValue;
        } else {
            slideValue = options.values.default;
        }
    });

    $effect(() => {
        updateRadioValue(currentValue);
    })

    function updateRadioValue(newValue) {
        if ([true, false].includes(newValue)) {
            slideValue = newValue;
        } else {
            slideValue = options.values.default;
        }
    }
</script>

<div
    class="flex flex-col gap-2 font-light text-sm w-fit md:min-w-32 justify-center {disabled
        ? 'opacity-50 cursor-not-allowed'
        : ''}"
>
    <label for="slide" class="font-light text-sm pl-2">{options.label}</label>
    <SlideToggle
        name="slide"
        bind:checked={slideValue}
        size="lg"
        background="bg-secondary-500"
        active="bg-secondary-100"
        onchange={() => {
            !disabled
                ? valueChange({ origin: options.label, newValue: slideValue })
                : (slideValue = options.values.default);
        }}>{!slideValue ? "off" : "on"}</SlideToggle
    >
</div>
