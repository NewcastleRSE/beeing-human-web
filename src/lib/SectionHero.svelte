<script>
    import TextDivider from "./TextDivider.svelte";
    import InjectMd from "./InjectMD.svelte";
    import {base} from '$app/paths'
    let {
        title = undefined,
        img = undefined,
        type = undefined,
        lead = undefined
    } = $props();

</script>

<div style="{img ? `background-image: url(${base}/${img}); background-position: center; background-size: cover;` : ''}" class="flex flex-col gap-2.5 py-4 md:gap-4 place-content-center items-center min-h-80  w-screen md:py-14 {type==='section' ? 'bg-primary-300' : 'bg-secondary-500 bg-blend-multiply'}">
    <h2 class="text-2xl md:text-4xl text-secondary-500 font-pfdisplay italic {type === 'section' ? '' : 'text-white'}"><InjectMd content={title} layout={false}/></h2>
    <TextDivider class="max-w-xs md:max-w-3xl" fillColour={type==='section' ? '#5E9DB5' : '#FEF9EB'}/>
    <p class="max-w-xs md:max-w-3xl md:text-lg text-center font-light {type === 'section' ? '' : 'text-white'}"><InjectMd content={lead} layout={false}/></p>
</div>