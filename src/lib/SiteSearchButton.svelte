<script>
    import MagGlass from './icons/MagGlass.svelte';
    import SiteSearchModal from './SiteSearchModal.svelte';
    import { page } from "$app/stores";


    // receives an array of posts to search
    let {searchIndex, articleData} = $props();

    let show = $state(false);

    let isRoot = $derived($page.route.id.split("/").length === 2);

    function toggleModal() {
        show = !show;
    }
</script>

{@debug isRoot}

<div class="fixed top-8 right-8 z-40">
    <button onclick={toggleModal} class="py-2 px-2 md:px-4 flex font-light text-sm gap-4 items-center text-secondary-400 group hover:text-secondary-500 outline outline-1 outline-secondary-200 hover:outline-secondary-400 hover:outline-2 rounded-full transition-all duration-200 ease-in-out {!isRoot ? 'bg-white shadow-lg' : ''}">
        <MagGlass class="w-4 fill-secondary-400 group-hover:fill-secondary-500 transition-colors duration-200"/><span class="hidden {!isRoot ? 'md:inline' : ''}"> Search...</span>
    </button>
</div>

<SiteSearchModal {articleData} {searchIndex} bind:show={show}/>