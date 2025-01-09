<script>
    import { onMount } from "svelte";

    let { message = "hello!", show = $bindable(false) } = $props();
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
                if (event.target.closest(".fixed")  && !buttonClicked) {
                    close();
                }
                buttonClicked = false;
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
        <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
        Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div
            class="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
        ></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
                <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                >
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                        >
                            <div class="mt-2">
                                <p class="text-gray-500">{message}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onclick={buttonClickedHandler}>Back</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
