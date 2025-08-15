<script>
    import MagGlass from './icons/MagGlass.svelte';
    import SiteSearchModal from './SiteSearchModal.svelte';

    // receives an array of posts to search
    let {searchIndex} = $props();

    let show = $state(false);

    function toggleModal() {
        show = !show;
    }

</script>

<button onclick={toggleModal} class="m-2 py-2 px-2 md:px-4 flex font-light text-sm gap-4 items-center text-secondary-400 group hover:text-secondary-500 outline outline-1 outline-secondary-200 hover:outline-secondary-400 hover:outline-2 rounded-full transition-all duration-200 ease-in-out">
    <MagGlass class="w-4 fill-secondary-400 group-hover:fill-secondary-500 transition-colors duration-200"/><span class="hidden md:inline"> Search...</span>
</button>

<SiteSearchModal {searchIndex} bind:show={show}/>
