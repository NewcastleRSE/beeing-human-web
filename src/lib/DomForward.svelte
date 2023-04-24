<script>
    import CustomButton from "./CustomButton.svelte";

    function handleClick() {
        alert('Button clicked');
    }
</script>

<CustomButton on:click={handleClick}/>