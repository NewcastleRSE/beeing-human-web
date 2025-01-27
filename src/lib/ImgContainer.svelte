<script>
    import {base} from '$app/paths'
    let { imgUrl, altText, caption='' } = $props();
</script>

{@debug imgUrl, altText, caption}
<div class="flex flex-col items-center gap-2 my-8 w-full">
    <img src={base + imgUrl} alt={altText} class="max-h-[40rem] hover:cursor-zoom-in"/>
    {#if caption}
        <p class="text-sm italic">{caption}</p>
    {/if}
</div>