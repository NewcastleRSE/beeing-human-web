<script>
    import { RangeSlider } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import {base} from '$app/paths';
    import PlayIcon from "$lib/icons/PlayIcon.svelte";
    import PauseIcon from "$lib/icons/PauseIcon.svelte";
    import ForwardIcon from "./icons/ForwardIcon.svelte";
    import BackwardIcon from "./icons/BackwardIcon.svelte";
    import { secsToMinSecs } from "../utils/MIDIPlaybackHelper";
    
    import CC from "$lib/icons/CC.svelte";
    import CCBy from "$lib/icons/CCBY.svelte";
    import CCNC from "$lib/icons/CCNC.svelte";
    import CCND from "$lib/icons/CCND.svelte";

    let { audioPath, artist='N/A', title='N/A', coverImage='https://picsum.photos/200', coverImageAlt='random things', license=undefined } = $props();

    let duration = $state(undefined);
    let currentPlace = $state(undefined);
    let audioElement = undefined;
    let playing = $state(false);

    const playPause = () => {
        if (!playing) {
            audioElement.play();
        } else if (playing) {
            audioElement.pause();
        }
    };

    const seek = (newTime) => {
        audioElement.fastSeek(newTime);
    };

    const skipBack = () => {
        if (currentPlace > 10) {
            audioElement.fastSeek(currentPlace - 10)
        } else {
            audioElement.fastSeek(0);
        }
    }

    const skipFwd = () => {
        audioElement.fastSeek(currentPlace + 10)
    }

    onMount(() => {
        audioElement = new Audio(`${base}/${audioPath}`);

        audioElement.addEventListener("loadeddata", () => {
            duration = audioElement.duration;
            currentPlace = 0;
        });

        audioElement.addEventListener("timeupdate", (event) => {
            currentPlace = audioElement.currentTime;
        });

        audioElement.addEventListener("pause", () => {
            playing = false;
        });

        audioElement.addEventListener("play", () => {
            playing = true;
        });
    });
</script>

<div
    class="w-full md:w-2/3 m-auto md:min-h-64 flex flex-col justify-center bg-secondary-50 p-6 rounded-lg shadow" data-testid = "audio-player"
>

    <div class="flex max-w-fit mb-4 md:mb-6 m-auto gap-2 md:gap-4 text-secondary-900">
        <img class="size-20 md:size-28 rounded-lg border-2 md:border-4 border-primary-800" src={coverImage} alt={coverImageAlt}/>
        <div class="flex flex-col h-fit md:max-w-40 place-self-center text-center">
            <p class="text-xs md:text-sm italic font-light">{artist}</p>
            <p class="md:text-lg">{title}</p>
        </div>
    </div>
    {#if duration != undefined}
        <div class="flex flex-col md:mb-2">
            <RangeSlider
                bind:value={currentPlace}
                max={duration}
                on:click={seek(currentPlace)}
                accent="accent-primary-500"
            />
            <div class="text-xs font-light max-w-fit place-self-end">
                <p>{secsToMinSecs(currentPlace)} / {secsToMinSecs(duration)}</p>
            </div>
        </div>
    {/if}

    <div class="flex justify-center">
        <button class="btn" onclick={skipBack}><BackwardIcon class="size-6 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 hover:stroke-0 transition-all ease-in-out duration-300 motion-reduce:transition-none"/></button>
        <button class="btn" onclick={playPause}>
            {#if !playing}
                <PlayIcon class="size-12 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none" />
            {:else}
                <PauseIcon class="size-12 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none" />
            {/if}
        </button>
        <button class="btn" onclick={skipFwd}><ForwardIcon class="size-6 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 hover:stroke-0 transition-all ease-in-out duration-300 motion-reduce:transition-none" /></button>
    </div>
    
    {#if license}
        <div class="text-xs font-light mt-2">
            {#if license === 'cc-by-nc-nd'}
                <p>Licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-ND 4.0</a> <CC/> <CCBy/> <CCNC/> <CCND/></p>
            {:else if license === 'cc-by-nc-sa'}
                <p>Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a></p>
            {:else}
                <p>License: {license}</p>
            {/if}
        </div>
    {/if}
</div>