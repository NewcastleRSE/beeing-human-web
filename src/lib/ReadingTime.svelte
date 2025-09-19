<script>
    import ClockIcon from "./icons/ClockIcon.svelte";
    let {readingTime} = $props();
</script>

<div class="flex gap-2 items-center w-max">
    <ClockIcon class="h-6 w-6 fill-secondary-400"/>
    <div class="flex flex-col"><p class="text-xs font-light text-secondary-300">Estimated reading time:</p>
    <p class="text-xs font-light text-secondary-500">{readingTime.text}</p></div>
</div>