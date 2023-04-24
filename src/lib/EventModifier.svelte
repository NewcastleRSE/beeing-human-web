<script>
    function handleClick() {
        alert('clicked')
    }
</script>

<button on:click|once={handleClick}>Click me</button>