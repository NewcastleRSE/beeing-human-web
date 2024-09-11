<script>
    import { RangeSlider } from "@skeletonlabs/skeleton";

    import { onMount } from "svelte";

    import PlayIcon from "$lib/icons/PlayIcon.svelte";
    import PauseIcon from "$lib/icons/PauseIcon.svelte";
    import ForwardIcon from "./icons/ForwardIcon.svelte";
    import BackwardIcon from "./icons/BackwardIcon.svelte";

    import { secsToMinSecs } from "../utils/MIDIPlaybackHelper";

    export let audioPath;

    let duration = undefined;
    let currentPlace = undefined;
    let audioElement = undefined;
    let playing = false;

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
        audioElement = document.getElementById("audioPlayer");

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
    class="w-full md:w-2/3 m-auto md:min-h-64 flex flex-col justify-center bg-secondary-50 p-6 rounded-lg shadow"
>
    <audio id="audioPlayer">
        <source src={audioPath} type="audio/mpeg" />
    </audio>

    <div class="flex max-w-fit mb-4 md:mb-6 m-auto gap-2 md:gap-4 text-secondary-900">
        <img class="size-20 md:size-28 rounded-lg border-2 md:border-4 border-primary-800" src="https://picsum.photos/200" alt="random things"/>
        <div class="flex flex-col h-fit md:max-w-40 place-self-center text-center">
            <p class="text-xs md:text-sm italic font-light">Charles Butler</p>
            <p class="md:text-lg">Melissomelos, or the Bees Madrigal</p>
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
        <button class="btn" on:click={skipBack}><BackwardIcon class="size-6 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 hover:stroke-0 transition-all ease-in-out duration-300 motion-reduce:transition-none"/></button>
        <button class="btn" on:click={playPause}>
            {#if !playing}
                <PlayIcon class="size-12 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none" />
            {:else}
                <PauseIcon class="size-12 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 transition-all ease-in-out duration-300 motion-reduce:transition-none" />
            {/if}
        </button>
        <button class="btn" on:click={skipFwd}><ForwardIcon class="size-6 fill-secondary-500 stroke-secondary-700 hover:fill-secondary-400 hover:stroke-0 transition-all ease-in-out duration-300 motion-reduce:transition-none" /></button>
    </div>
</div>