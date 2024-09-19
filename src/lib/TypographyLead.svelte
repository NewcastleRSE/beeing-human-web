<script>
    import TextDivider from "./TextDivider.svelte";
</script>

<div class="w-2/3 m-auto font-light my-14 flex flex-col gap-4">
    <slot/>
    <TextDivider class="w-2/5 m-auto" fillColour ="#765405"/>
</div>