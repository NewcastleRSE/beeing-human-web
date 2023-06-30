<script>
    import { onMount } from 'svelte';
    import InjectMd from './InjectMD.svelte';

    export let buzzwords;

    const daysOfTheWeek = ['Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday'];
    const monthsOfTheYear = ['January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'];

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
        <div class="card">
            <header class="card-header">
                {#if buzzword.date}
                    <p class="date">{daysOfTheWeek[buzzword.date.getDay()]}, {buzzword.date.getDate()} of {monthsOfTheYear[buzzword.date.getMonth()]} {buzzword.date.getFullYear()}</p>
                {/if}
            </header>
            <section class="p-4"><InjectMd content = {buzzword.content}/></section>
            <footer class="card-footer">
                {#if buzzword.author}
                    <p class="byline">by {buzzword.author}</p>
                {/if}
                {#if buzzword.tags}
                    <div class="tags">
                        {#each buzzword.tags as tag}
                            <span class="chip variant-ghost">{tag}</span>
                        {/each}
                    </div>
                {/if}
            </footer>
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

    .date {
        font-size: smaller;
    }

    .byline {
        font-size: small;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
    }

    .chip {
        font-size: x-small;
    }
</style>