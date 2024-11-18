<script>
    import { onMount } from "svelte";
    import InternalLink from "./InternalLink.svelte";
    import { capitaliseFirstLetter } from "../utils/stringOperations";

    export let type = undefined;
    export let link = undefined;
    export let text = undefined;
    export let backgroundImage = undefined;
    export let testid = undefined;

    onMount(async () => {
        if (!type) {
            throw new TypeError("Cannot create a cell of type undefined");
        } else if (type === "section") {
            if (!link) {
                throw new Error("A section cell needs a link");
            }
        } else if (type === "article") {
            if (!text) {
                throw new Error("An article cell needs text");
            }

            if (!link) {
                throw new Error("An article cell needs a link");
            }
        }

        if (!backgroundImage && type != "empty") {
            throw new Error("Cells need background images");
        }
    });
</script>

{#if type === "section"}
    <!-- Main section -->
    <div
        class="clip-path-hexagonBorder w-[137px] h-[123px] bg-primary-600 relative"
    data-testid = {testid}>
        <InternalLink {link} class="group">
            <div
                style="background-image: url({backgroundImage}); background-position: center;"
                class="clip-path-hexagon absolute w-[124px] h-[110px] top-[7px] left-[7px] bg-black/50 bg-blend-multiply group-hover:bg-black/75 transition-all ease-in-out duration-300 motion-reduce:transition-none flex justify-center items-center"
            >
                <p class="size-fit text-white md:text-xl">
                    {capitaliseFirstLetter(link)}
                </p>
            </div>
        </InternalLink>
    </div>
{:else if type === "article"}
    <!-- Direct links -->
    <div class="" data-testid = {testid}>
        <InternalLink {link} class="group">
        <div
            style="background-image: url({backgroundImage}); background-position: center;"
            class="clip-path-hexagonBorder w-[137px] h-[123px] bg-secondary-50/75 bg-blend-overlay group-hover:bg-secondary-900/75 transition-all ease-in-out duration-300 motion-reduce:transition-none flex justify-center items-center">
                <p class="invisible size-fit no-underline text-white text-sm text-center group-hover:visible transition-all ease-in-out duration-300 motion-reduce:transition-none">
                    {text}
                </p>
        </div>
        </InternalLink>
    </div>
{:else if type === "empty"}
    <div class=""  data-testid = {testid}></div>
{/if}
