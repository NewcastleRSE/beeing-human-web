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
    class="w-2/3 m-auto min-h-64 flex flex-col justify-center bg-secondary-50 p-6 gap-2 rounded-lg shadow"
>
    <audio id="audioPlayer">
        <source src={audioPath} type="audio/mpeg" />
    </audio>

    <div class="flex max-w-fit m-auto gap-4 text-secondary-900">
        <img class="size-28 rounded-lg border-4 border-primary-800" src="https://picsum.photos/200" alt="random things"/>
        <div class="flex flex-col h-fit max-w-40 place-self-center text-center">
            <p class="text-sm italic font-light">Charles Butler</p>
            <p class="text-lg">Melissomelos, or the Bees Madrigal</p>
        </div>
    </div>
    {#if duration != undefined}
        <RangeSlider
            bind:value={currentPlace}
            max={duration}
            on:click={seek(currentPlace)}
        />
        <div class="text-xs font-light max-w-fit place-self-end">
            <p>{secsToMinSecs(currentPlace)} / {secsToMinSecs(duration)}</p>
        </div>
    {/if}

    <div class="flex justify-center">
        <button class="btn" on:click={skipBack}><BackwardIcon size="6" /></button>
        <button class="btn" on:click={playPause}>
            {#if !playing}
                <PlayIcon size="12" />
            {:else}
                <PauseIcon size="12" />
            {/if}
        </button>
        <button class="btn" on:click={skipFwd}><ForwardIcon size="6" /></button>
    </div>
</div>
