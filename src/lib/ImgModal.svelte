<script>
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    let { imgDetails, show = $bindable(false) } = $props();
    let buttonClicked = $state(false);

    function buttonClickedHandler() {
        buttonClicked = true;
        close();
    }

    function close() {
        show = !show;
    }

    onMount(() => {
        // prevents window is not defined errors
        let isBrowser = typeof window !== "undefined";

        if (isBrowser) {
            window.addEventListener("click", (event) => {
                // define whether the user clicked inside the '#modal-screen' element
                if (show) {
                    let modalScreen = document.getElementById("modal-screen");
                    let clickInside = modalScreen.contains(event.target);

                    if (
                        event.target.closest(".fixed") &&
                        !buttonClicked &&
                        !clickInside
                    ) {
                        close();
                    }
                    buttonClicked = false;
                }
            });
        }
    });
</script>

{#if show}
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
            transition:fade={{ duration: 300 }}
            id="backdrop"
        ></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
                <div
                    class="rounded-lg text-left shadow-xl transition-all my-8 w-full max-w-lg md:w-fit md:max-w-none md:max-w-dvw px-12 pb-6 pt-4 bg-surface-50"
                    transition:fly={{ y: 20, duration: 300 }}
                    id="modal-screen"
                >
                    <div class="flex justify-end">
                        <button
                            type="button"
                            class="text-xl hover:font-bold"
                            onclick={buttonClickedHandler}>&#x2715;</button
                        >
                    </div>
                    <div class="flex flex-col items-center gap-8">
                            <img src={base + imgDetails.url} alt={imgDetails.alt} />
                            {#if imgDetails.caption}
                                <p class="w-fit">{imgDetails.caption}</p>
                            {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
