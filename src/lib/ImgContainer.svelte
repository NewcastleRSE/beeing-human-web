<script>
    import {base} from '$app/paths'
    import InjectMD from '$lib/InjectMD.svelte';
    let { imgUrl, altText, caption='', captionCustomStyle='' } = $props();

    import ImgModal from './ImgModal.svelte'

    let show = $state(false);

    function openModal() {
        show = !show;
    }

</script>

<div class="flex flex-col items-center gap-2 my-8 w-full" onclick={openModal} onkeypress={openModal} role="button" aria-roledescription="opens full size image" tabindex="0">
    <img src='{base}/medium/{imgUrl}' alt={altText} class="max-h-[40rem] hover:cursor-zoom-in"/>
    {#if caption}
        <p class="text-sm italic max-w-prose"><InjectMD content={caption} layout={false}/></p>
    {/if}
    {#if captionCustomStyle}
        <p class="text-sm max-w-prose"><InjectMD content={captionCustomStyle} layout={false}/></p>
    {/if}
</div>

<ImgModal imgDetails={{url: imgUrl, alt: altText, caption:caption, captionCustomStyle:captionCustomStyle}} bind:show={show} />