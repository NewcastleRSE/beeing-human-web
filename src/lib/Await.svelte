<script>
    async function getRandomNumber() {
        const res = await fetch('./src/assets/random-number.txt');
        const text = await res.text();

        if (res.ok) {
            console.log(text)
            return text;
        } else {
            throw new Error(text);
        }
    }

    let promise = getRandomNumber();

    function handleClick() {
        promise = getRandomNumber();
    }
</script>

<button on:click={handleClick}>
    Generate random number
</button>

{#await promise}
    <p>waiting...</p>
{:then number}
    <p>The number is {number}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}