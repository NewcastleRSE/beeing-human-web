<script>
    import { base } from '$app/paths';
    let { person } = $props();
</script>

    <a href="{person.url}" class="relative p-2 flex flex-col self-center md:w-1/3 mx-auto justify-center group">
        <img
            class="object-cover brightness-[0.25] md:brightness-100 md:group-hover:brightness-[.25] transition duration-300"
            src="{base}/{person.img}"
            alt="A picture of {person.name}"
        />
        <p class="font-pfdisplay text-lg md:text-2xl absolute md:hidden w-full text-center group-hover:block text-white transition duration-300">{person.name}</p>
    </a>
