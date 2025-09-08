<script>
    import { base } from "$app/paths";
    const colours = ["bg-primary-500", "bg-secondary-700", "bg-success-500"];
    const randomColour = colours[Math.floor(Math.random() * colours.length)];
    let { person, empty = false } = $props();
</script>

{#if !empty}
<a
    href={person.url}
    class="relative p-2 flex flex-col self-center md:w-1/3 mx-auto justify-center group"
>
    <img
        class="object-cover brightness-[0.25] md:brightness-100 md:group-hover:brightness-[.25] transition duration-300"
        src="{base}/medium/{person.img}"
        alt="A picture of {person.name}"
    />
    <p
        class="font-pfdisplay text-lg md:text-2xl absolute md:hidden w-full text-center group-hover:block text-white transition duration-300"
    >
        {person.name}
    </p>
</a>

{:else}
<div class="hidden md:block relative p-2 md:w-1/3 mx-auto justify-center group min-h-full">
    <div class="w-full h-full {randomColour}"></div>
</div>

{/if}