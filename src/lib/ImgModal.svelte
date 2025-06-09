<script>
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import InjectMD from "./InjectMD.svelte";

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
                class="flex min-h-full items-center justify-center md:p-4 text-center"
            >
                <div
                    class="md:rounded-lg text-left shadow-xl transition-all md:my-8 w-full max-w-lg md:w-fit md:max-w-none md:max-w-dvw md:px-12 md:pb-6 md:pt-4 py-1 bg-surface-50 md:max-h-fit flex flex-col items-center gap-4"
                    transition:fly={{ y: 20, duration: 300 }}
                    id="modal-screen"
                >
                        <button
                            type="button"
                            class="text-xl hover:font-bold self-end p-2"
                            onclick={buttonClickedHandler}>&#x2715;</button
                        >
                    <img
                        src={base + imgDetails.url}
                        alt={imgDetails.alt}
                        class="object-contain max-h-[75vh]"
                    />
                    {#if imgDetails.caption}
                        <p class="w-fit max-w-lg"><InjectMD
                                content={imgDetails.caption}
                                layout={false}
                            /></p>
                    {/if}
                    {#if imgDetails.captionCustomStyle}
                        <p class="w-fit max-w-lg">
                            <InjectMD
                                content={imgDetails.captionCustomStyle}
                                layout={false}
                            />
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}