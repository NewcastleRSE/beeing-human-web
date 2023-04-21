<script>
    let count = 0;

    $: doubled = count*2;

    function incrementCounter() {
        count += 1;
    }

    $: {
        if (count >= 5) {
            console.log('The count is too high!');
            count = 4;
        }
    }
</script>

<button on:click={incrementCounter}>
    {count} doubled is {doubled}
</button>