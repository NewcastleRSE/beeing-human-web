<script>
    import { onMount } from "svelte";
    import InternalLink from "./InternalLink.svelte";
    import {capitaliseFirstLetter} from '../utils/stringOperations'

    export let type = undefined;
    export let link = undefined;
    export let text = undefined;
    export let backgroundImage = undefined;

    onMount(async () => {
        if (!type) {
            throw new TypeError('Cannot create a cell of type undefined')
        } else if (type === 'section') {
            if (!link) {
                throw new Error('A section cell needs a link');
            }
        } else if (type === 'article') {
            if (!text) {
                throw new Error('An article cell needs text');
            }

            if (!link) {
                throw new Error('An article cell needs a link');
            }
        }

        if (!backgroundImage && type!= 'empty') {
            throw new Error('Cells need background images');
        }
    })
</script>

{#if type === 'section'}
    <!-- Main section -->
    <div class="clip-path-hexagonBorder w-[137px] h-[123px] bg-primary-600 relative">
        <InternalLink {link} class=group>
            <div class="clip-path-hexagon absolute w-[124px] h-[110px] top-[7px] left-[7px]  bg-black/50 bg-[url('{backgroundImage}')] bg-blend-multiply group-hover:bg-black/75 transition-all ease-in-out duration-300 motion-reduce:transition-none flex justify-center items-center">
                <p class="size-fit text-white md:text-xl">{capitaliseFirstLetter(link)}</p>
            </div>
        </InternalLink>
    </div>
{:else if type === 'article'}
    <!-- Direct links -->
    <div class="clip-path-hexagonBorder w-[137px] h-[123px] bg-secondary-50/75 bg-[url('https://picsum.photos/200')] bg-blend-overlay group hover:bg-secondary-900/75 transition-all ease-in-out duration-300 motion-reduce:transition-none">
        <InternalLink {link} class="invisible group-hover:visible">
            <p class="size-fit no-underline text-white text-xs text-center">{text}</p>
        </InternalLink>
    </div>
{:else if type === 'empty'}
    <div class=""/>
{/if}
