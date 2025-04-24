<script>
    import {base} from '$app/paths'
    let { imgUrl, altText, caption='' } = $props();

    import ImgModal from './ImgModal.svelte'

    let show = $state(false);

    function openModal() {
        show = !show;
    }

</script>

<div class="flex flex-col items-center gap-2 my-8 w-full" onclick={openModal} onkeypress={openModal} role="button" aria-roledescription="opens full size image" tabindex="0">
    <img src={base + imgUrl} alt={altText} class="max-h-[40rem] hover:cursor-zoom-in"/>
    {#if caption}
        <p class="text-sm italic max-w-prose">{caption}</p>
    {/if}
</div>

<ImgModal imgDetails={{url: imgUrl, alt: altText, caption:caption}} bind:show={show} />