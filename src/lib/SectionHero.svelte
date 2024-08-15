<script>
    import TextDivider from "./TextDivider.svelte";
    export let title = undefined;
    let img = undefined;
</script>

<div class="flex flex-col place-content-center items-center min-h-80 bg-primary-300">
    <h2 class="text-4xl text-secondary-500 font-pfdisplay italic">{title}</h2>
    <TextDivider/>
    <p><slot/></p>
</div>