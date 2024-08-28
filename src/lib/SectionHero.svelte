<script>
    import TextDivider from "./TextDivider.svelte";
    import {base} from '$app/paths'
    export let title = undefined;
    export let img = undefined;
    export let type = undefined;

    let classString = ''

    
    if (type === 'section') {
        classString = 'flex flex-col gap-2.5 md:gap-4 place-content-center items-center min-h-80 bg-primary-300 w-screen md:py-14'
    } else if (type === 'article') {
        classString = 'flex flex-col gap-2.5 md:gap-4 place-content-center items-center min-h-80 bg-secondary-500 bg-blend-multiply w-screen md:py-14'
    }
</script>

<div style="{img ? `background-image: url(${base}/${img}); background-position: center; background-size: cover;` : ''}" class="flex flex-col gap-2.5 md:gap-4 place-content-center items-center min-h-80  w-screen md:py-14 {type==='section' ? 'bg-primary-300' : 'bg-secondary-500 bg-blend-multiply'}">
    <h2 class="text-2xl md:text-4xl text-secondary-500 font-pfdisplay italic {type === 'section' ? '' : 'text-white'}">{title}</h2>
    <TextDivider class="max-w-xs md:max-w-3xl" fillColour={type==='section' ? '#5E9DB5' : '#FEF9EB'}/>
    <p class="max-w-xs md:max-w-3xl md:text-lg text-center font-light {type === 'section' ? '' : 'text-white'}"><slot/></p>
</div>