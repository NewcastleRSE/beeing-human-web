<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    let { message, show = $bindable(false) } = $props();
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

    // find the siblings of the message element
    let parentElement = $derived.by(() => {
        if (message && !message.hasAttribute('type')) {
            return message.parentElement;
        } else if (message && message.hasAttribute('type') && message.getAttribute('type') ===  'attachment') {
            // the trigger is a point of attachment for an editorial note
            // find the element with the xml:id that matches the target and return that element
            let target = message.getAttribute('target');
            // remove the '#' from the target
            target = target.replace('#', '');
            let parentElement = document.getElementById(target);
            console.log(target);
            if (parentElement) {
                return parentElement;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    });

    let bgColour = $derived.by(() => {
        if (parentElement) {
            if (parentElement.getAttribute("subtype") == "change") {
                return "bg-secondary-100";
            } else if (parentElement.getAttribute("subtype") == "add") {
                return "bg-success-100";
            } else if (parentElement.getAttribute("subtype") == "del") {
                return "bg-error-100";
            } else if (parentElement.getAttribute("type") == "editorial") {
                return "bg-warning-200";
            } else  {
                return "";
            }
        } else {
            return "";
        }
    });

    let accentColour = $derived.by(() => {
        if (parentElement) {
            if (parentElement.getAttribute("subtype") == "change") {
                return "bg-secondary-500";
            } else if (parentElement.getAttribute("subtype") == "add") {
                return "bg-success-500";
            } else if (parentElement.getAttribute("subtype") == "del") {
                return "bg-error-500";
            } else if (parentElement.getAttribute("type") == "editorial") {
                return "bg-warning-600";
            } else {
                return "";
            }
        } else {
            return "";
        }
    });

    let type = $derived.by(() => {
        if (parentElement) {
            let type = {
                change: "change",
                add: "addition",
                del: "deletion",
                editorial: "editorial note",
            };
            if (parentElement.getAttribute("type") === "editorial") {
                return type[parentElement.getAttribute("type")];
            } else {
                return type[parentElement.getAttribute("subtype")];
            }
        } else {
            return "";
        }
    });

    let altReadings = $derived.by(() => {
        let altReadings = [];
        if (parentElement) {
            if (parentElement.tagName === 'TEI-APP') {
                // create a list of all tei-rdg siblings of the message element
                let siblings = parentElement.querySelectorAll("tei-rdg");
                siblings.forEach((sibling) => {
                    altReadings.push(sibling);
                });
                
            } else if (parentElement.tagName === 'TEI-NOTE') {
                // add all the children to the altReadings array
                parentElement.childNodes.forEach((child) => {
                    altReadings.push(child);
                });
            }
            // for each altReading check if they are a textual node
            for (const reading of altReadings) {
                // if the reading is a node type of 3 (text node) then create a new element
                if (reading.nodeType === 3) {
                    let span = document.createElement('span');
                    span.append(reading);
                    reading.innerHTML = span.outerHTML;
                }
            }
            return altReadings;
        } else {
            return undefined;
        }
    });
</script>

{@debug altReadings}

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
            transition:fade={{ duration: 300 }}
            id="backdrop"
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
                    class="relative transform overflow-hidden rounded-lg {bgColour} px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left"
                        >
                            <div class="flex gap-2 items-center mb-10"><h3 class=" font-bold w-fit">{type} </h3>
                            <span class="h-1 w-full {accentColour} my-2"></span></div>
                            <div class="mt-2">
                                {#each altReadings as reading}
                                    {@html reading.innerHTML}
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
