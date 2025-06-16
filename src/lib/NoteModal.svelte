<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import TextDivider from "./TextDivider.svelte";
    import { base } from "$app/paths";

    let { message, show = $bindable(false) } = $props();
    let buttonClicked = $state(false);

    function buttonClickedHandler() {
        buttonClicked = true;
        close();
    }

    function close() {
        show = !show;
    }

    function removeNotes() {
        let noteContent = document.getElementById("note-content");
        if (noteContent) {
            noteContent.innerHTML = "";
        }
    }

    function appendNotes() {
        // attach readings to correct div
        if (altReadings) {
            const notesDiv = document.getElementById("note-content");
            // checks to see if there is an object in the altReadings array
            let ids = [];
            for (const [i, reading] of altReadings.entries()) {
                // checks to see if the last element is an object
                if (typeof reading[reading.length - 1] === "object") {
                    // if it is an object, add it to ids dictionary
                    ids[i] = reading[reading.length - 1].id;
                    //pop it from the reading array
                    reading.pop();
                } else {
                    ids[i] = null;
                }
            }
            for (const [i, reading] of altReadings.entries()) {
                let singNoteDiv = document.createElement("div");
                singNoteDiv.classList.add("mb-4");
                singNoteDiv.classList.add("single-note");
                if (ids[i]) {
                    // checks to see if the id exists in the notesDiv
                    const existingNote = document.getElementById(
                        `modal-${ids[i]}`,
                    );
                    if (existingNote) {
                        // if it exists, remove it
                        existingNote.remove();
                    }

                    singNoteDiv.setAttribute("id", `modal-${ids[i]}`);
                }

                for (const elRead of reading) {
                    if (elRead.tagName != "TEI-PERSNAME") {
                        // check to see if it is not a text node and not hidden:
                        if (
                            elRead.nodeType != 3 &&
                            elRead.classList.contains("hidden")
                        ) {
                            elRead.classList.remove("hidden");
                        }
                        singNoteDiv.appendChild(elRead);
                    } else {
                        let authorName = document.createElement("div");
                        authorName.innerHTML = "— ";
                        authorName.classList.add(
                            "text-sm",
                            "text-secondary-600",
                            "italic",
                            "mt-4",
                            "pr-4",
                            "text-right",
                            "w-full",
                        );
                        let authorLink = document.createElement("a");
                        authorLink.setAttribute(
                            "href",
                            `${base}/people/${elRead.getAttribute("corresp")}`,
                        );
                        authorLink.setAttribute("target", "_blank");
                        authorLink.classList.add("hover:anchor");
                        authorLink.innerHTML = elRead.innerHTML;
                        authorName.appendChild(authorLink);
                        singNoteDiv.appendChild(authorName);
                    }
                }
                notesDiv.appendChild(singNoteDiv);
                if (altReadings.length > 1) {
                    if (i < altReadings.length - 1) {
                        // find the hidden text divider
                        let textDivider = document.querySelector(
                            ".text-divider.hidden",
                        );
                        if (textDivider) {
                            textDivider.classList.remove("hidden");
                            textDivider.classList.add("block");
                            notesDiv.appendChild(textDivider);
                        }
                    }
                }
            }
        }
    }

    $effect(() => {
        if (show) {
            appendNotes();
        } else {
            // remove the notes
            removeNotes();
        }
    });

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
                    } else if (event.target.hasAttribute("type") &&
                        event.target.getAttribute("type") === "noteCrossRef"){
                        // check if the target has an attribute of type === 'noteCrossRef'
                        // get original ref
                        let originalRef = document.querySelector(event.target.getAttribute("target"));
                        let originalNote = document.querySelector(originalRef.getAttribute("target"));
                            console.log(originalRef, originalNote);
                    }
                    buttonClicked = false;
                }
            });
        }
    });

    // find the siblings of the message element
    let parentElement = $derived.by(() => {
        if (message && !message.hasAttribute("type")) {
            return [message.parentElement];
        } else if (
            message &&
            message.hasAttribute("type") &&
            message.getAttribute("type") === "attachment"
        ) {
            // the trigger is a point of attachment for an editorial note
            // find the element with the xml:id that matches the target and return that element
            let targetAttribute = message.getAttribute("target");

            // if there's more than one target, split the string and return the first target
            let targets = [];
            if (targetAttribute.includes(" ")) {
                targets = targetAttribute.split(" ");
            } else {
                targets.push(targetAttribute);
            }

            let parentElements = [];
            for (let target of targets) {
                // remove the '#' from the target
                target = target.replace("#", "");
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
        } else if (
            message &&
            message.hasAttribute("type") &&
            message.getAttribute("type") === "fragmentedNoteAttachement"
        ) {
            // the trigger is a fragment attachment point (there will be at least two of those)

            let correspAttribute = message.getAttribute("corresp");

            // if there's more than one corresp, split the string
            let corresps = [];
            if (correspAttribute.includes(" ")) {
                corresps = correspAttribute.split(" ");
            } else {
                corresps.push(correspAttribute);
            }

            let parentElements = [];
            for (let corresp of corresps) {
                // remove the '#' from the corresp
                corresp = corresp.replace("#", "");
                let parentElement = document.getElementById(corresp);
                if (parentElement) {
                    parentElements.push(parentElement);
                }
            }
            if (parentElements.length > 0) {
                return parentElements;
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
            } else {
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
            if (parentElement[0].tagName === "TEI-APP") {
                let altReading = [];
                // create a list of all tei-rdg siblings of the message element
                let siblings = parentElement[0].querySelectorAll("tei-rdg");
                siblings.forEach((sibling) => {
                    altReading.push(sibling.cloneNode(true));
                });
                altReadings.push(altReading);
            } else if (parentElement[0].tagName === "TEI-NOTE") {
                // add all the children to the altReadings array
                for (const note of parentElement) {
                    let altReading = [];
                    note.childNodes.forEach((child) => {
                        altReading.push(child.cloneNode(true));
                    });

                    // Finds the author of the note
                    if (note.getAttribute("resp")) {
                        try {
                            let peopleCodes = note
                                .getAttribute("resp")
                                .split(" ");
                            // if there is more than one author, it finds all
                            for (const persCode of peopleCodes) {
                                const person = document.querySelector(persCode);
                                let persName =
                                    person.querySelector("tei-persName");
                                altReading.push(persName.cloneNode(true));
                            }
                        } catch (e) {
                            console.warn(
                                "Could not find the person element with the id: " +
                                    note.getAttribute("resp"),
                            );
                        }
                    }

                    if (note.getAttribute("xml:id")) {
                        altReading.push({ id: note.getAttribute("xml:id") });
                    }

                    altReadings.push(altReading);
                }
            }
            // for each altReading check if they are a textual node
            for (const reading of altReadings) {
                for (const el of reading) {
                    // if the reading is a node type of 3 (text node) then create a new element
                    if (el.nodeType === 3) {
                        let span = document.createElement("span");
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
                            <div class="flex gap-2 items-center mb-10">
                                <h3 class=" font-bold w-fit">{type}</h3>
                                <span class="h-1 w-full {accentColour} my-2"
                                ></span>
                            </div>
                            <div class="mt-2" id="note-content"></div>
                        </div>
                    </div>
                </div>
                <!-- BEGIN: Vertically centered, right-aligned floating modal -->
                <div
                    class="fixed top-1/2 right-8 -translate-y-1/2 z-20"
                    style="pointer-events: none;"
                >
                    <div
                        class="w-96 max-w-full bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col pointer-events-auto"
                        style="min-height: 300px;"
                    >
                        <div class="flex justify-end p-2">
                            <button
                                type="button"
                                class="text-xl hover:font-bold"
                                onclick={buttonClickedHandler}>&#x2715;</button>
                        </div>
                        <div class="flex-1 p-4">
                            <h3 class="font-bold mb-2">Floating Modal</h3>
                            <div>
                                <!-- Add your floating modal content here -->
                                <p>This is the floating modal vertically centered and to the right of the main modal.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END: Vertically centered, right-aligned floating modal -->
            </div>
        </div>
    </div>
    <TextDivider fillColour="#5E9DB5" class="mb-4 text-divider hidden" />
{/if}
