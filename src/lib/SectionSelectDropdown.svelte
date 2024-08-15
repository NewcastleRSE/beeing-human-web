<script>
    import { onMount } from "svelte";

    let sections = ["connections", "literature", "music", "science"];
    export let section = undefined;

    onMount( () => {
        if (section) {
            sections = new Set([section, ...sections]);
            sections = Array.from(sections);
        }
    })
</script>

<div id="dropdown-menu" class="md:relative">
    <ul
        class="absolute left-0 top-0 md:-top-8 flex flex-col w-screen md:w-60 md:rounded-b-lg font-thin text-2xl md:text-4xl bg-white md:bg-surface-50/25 divide-y divide-solid"
    >
        {#each sections as sec}
            <a href="/{sec}" class="w-full hover:font-medium md:rounded-b-lg py-4 md:py-2 transition-all ease-in-out duration-300 motion-reduce:transition-none"><li class="md:w-fit">{sec}</li></a>
        {/each}
    </ul>
</div>
