<script>
    import { onMount } from 'svelte';
    import InjectMd from './InjectMD.svelte';

    export let buzzwords;

    function shuffle(array) {
        // randomize order of the array
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    return array;
    }

    onMount( () => {
        buzzwords = shuffle(buzzwords);
    })

</script>

<div class="card-collection">
    {#each buzzwords as buzzword}
        <div class="card p-4 variant-glass-primary">
            <InjectMd content = {buzzword.content}/>
        </div>
    {/each}
</div>

<style>
    .card-collection {
        width: 90vw;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .card {
        max-width: 22%;
        height: fit-content;
    }
</style>