<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import TextDivider from "./TextDivider.svelte";

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
            return [message.parentElement];
        } else if (message && message.hasAttribute('type') && message.getAttribute('type') ===  'attachment') {
            // the trigger is a point of attachment for an editorial note
            // find the element with the xml:id that matches the target and return that element
            let targetAttribute = message.getAttribute('target');

            // if there's mor than one target, split the string and return the first target
            let targets = [];
            if (targetAttribute.includes(' ')) {
                targets = targetAttribute.split(' ');
            } else {
                targets.push(targetAttribute);
            }

            let parentElements = [];
            for (let target of targets) {
                // remove the '#' from the target
                target = target.replace('#', '');
                let parentElement = document.getElementById(target);
                if (parentElement) {
                    parentElements.push(parentElement);
                }
            }
            if (parentElements.length > 0) {
                return parentElements;
            } else {
                return undefined;
            }
        } else if (message && message.hasAttribute('type') && message.getAttribute('type') === 'fragmentedNoteAttachement') {
            // the trigger is a fragment attachment point (there will be at least two of those)
            // find the element with the xml:id that matches corresp and return that element
            let corresp = message.getAttribute('corresp');
            // remove the '#' from the corresp
            corresp = corresp.replace('#', '');
            let parentElement = document.getElementById(corresp);
            if (parentElement) {
                return [parentElement];
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    });

    let bgColour = $derived.by(() => {
        if (parentElement) {
            if (parentElement[0].getAttribute("subtype") == "change") {
                return "bg-secondary-100";
            } else if (parentElement[0].getAttribute("subtype") == "add") {
                return "bg-success-100";
            } else if (parentElement[0].getAttribute("subtype") == "del") {
                return "bg-error-100";
            } else if (parentElement[0].getAttribute("type") == "editorial") {
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
            if (parentElement[0].getAttribute("subtype") == "change") {
                return "bg-secondary-500";
            } else if (parentElement[0].getAttribute("subtype") == "add") {
                return "bg-success-500";
            } else if (parentElement[0].getAttribute("subtype") == "del") {
                return "bg-error-500";
            } else if (parentElement[0].getAttribute("type") == "editorial") {
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
            if (parentElement[0].getAttribute("type") === "editorial") {
                return type[parentElement[0].getAttribute("type")];
            } else {
                return type[parentElement[0].getAttribute("subtype")];
            }
        } else {
            return "";
        }
    });

    let altReadings = $derived.by(() => {
        let altReadings = [];
        if (parentElement) {
            if (parentElement[0].tagName === 'TEI-APP') {
                let altReading = []
                // create a list of all tei-rdg siblings of the message element
                let siblings = parentElement[0].querySelectorAll("tei-rdg");
                siblings.forEach((sibling) => {
                    altReading.push(sibling);
                });
                altReadings.push(altReading);
                
            } else if (parentElement[0].tagName === 'TEI-NOTE') {
                // add all the children to the altReadings array
                for (const note of parentElement) {
                    let altReading = [];
                    note.childNodes.forEach((child) => {
                        altReading.push(child.cloneNode(true));
                    });
                    altReadings.push(altReading);
                }
            }
            // for each altReading check if they are a textual node
            for (const reading of altReadings) {
                for (const el of reading) {
                    // if the reading is a node type of 3 (text node) then create a new element
                    if (el.nodeType === 3) {
                        let span = document.createElement('span');
                        span.append(el);
                        el.innerHTML = span.outerHTML;
                    }
                }
            }
            return altReadings;
        } else {
            return undefined;
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
                                {#each altReadings as reading, i}
                                    <div class="mb-4">
                                        {#each reading as el}
                                            {@html el.innerHTML}
                                        {/each}
                                    </div>
                                    <!-- Only adds the divider if there are more than one readings and it's not the last one -->
                                    {#if altReadings.length > 1}
                                        {#if i < altReadings.length - 1}
                                            <TextDivider fillColour="#5E9DB5" class="mb-4"/>
                                        {/if}
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
