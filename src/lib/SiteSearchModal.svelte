<script>
    import MagGlass from './icons/MagGlass.svelte';
    import lunr from 'lunr';

    // receives an array of posts to search
    let {searchIndex, show=$bindable(false)} = $props();

    let index = $derived(lunr.Index.load(JSON.parse(searchIndex)))
    let searchValue = $state('');

    function closeModal() {
        show = !show;
    }

    // Close modal when clicking outside
    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    // Close modal on Escape key
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    let searchResults = $derived.by(() => {
        if (!searchValue) {
            return [];
        } else {
            return index.search(searchValue);
        }
    })
</script>

{@debug searchValue, searchResults}

{#if show}
    <div 
        class="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-50"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <div class="bg-white rounded-lg p-4 relative md:w-1/2 w-full mx-4 flex flex-col gap-1 outline outline-2 outline-secondary-400 shadow-lg max-h-[70vh]">
            <div class="pl-2 font-light text-secondary-500 flex items-center flex-shrink-0">
                <h2 class="text-xl flex-grow">Search</h2>
                <!-- Close button -->
                <button 
                    onclick={closeModal}
                    class="text-secondary-200 hover:text-secondary-400 transition-colors duration-200 text-xl font-bold w-6 h-6 self-end mb-6"
                    aria-label="Close modal"
                >
                    &#x2715;
                </button>
            </div>
            
            <div class="relative flex-shrink-0">
                <input 
                    type="text" 
                    placeholder="Start typing..." 
                    class="border border-gray-300 rounded-lg p-2 pl-10 w-full mb-4"
                    bind:value={searchValue}
                />
                <MagGlass class="absolute left-3 top-3 w-4 h-4 fill-gray-400 pointer-events-none" />
            </div>
            
            <div class="overflow-y-auto flex-grow">
                {#if searchResults.length > 0}
                    <ul class="list-none p-0 m-0">
                        {#each searchResults as result}
                            <li class="py-2 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                <a href={result.ref} class="text-blue-600 hover:underline" onclick={() => closeModal()}>
                                    {result.ref}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {:else if searchValue}
                    <p class="text-gray-500">No results found for "{searchValue}"</p>
                {/if}
            </div>
        </div>
    </div>
{/if}