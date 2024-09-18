<script>
    import {SlideToggle} from '@skeletonlabs/skeleton'

    export let options;

    let slideValue = options.values.default
</script>

<div class="flex flex-col gap-2 font-light text-sm min-w-32 justify-center">
    <label for="slide" class="font-light text-sm pl-2">{options.label}</label>
    <SlideToggle
        name="slide"
        bind:checked={slideValue}
        size="lg"
        background="bg-secondary-500"
        active="bg-secondary-100">{!slideValue ? "off" : "on"}</SlideToggle
    >
</div>
