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
    class="w-4/5 m-auto min-h-64 flex flex-col justify-center bg-secondary-50 px-6 gap-2 rounded-lg shadow"
>
    <audio id="audioPlayer">
        <source src={audioPath} type="audio/mpeg" />
    </audio>

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
