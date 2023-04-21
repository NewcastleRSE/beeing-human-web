<script>
    let numbers = [1, 2, 3, 4]

    function addNumber() {
        // This mutates the array, it will not be reactive
        // numbers.push(numbers.length + 1);

        // reactivity is only activated through attribution
        // numbers = numbers

        // or more concisely:
        numbers = [...numbers, numbers.length + 1]
    }

    $: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
    Add a Number
</button>