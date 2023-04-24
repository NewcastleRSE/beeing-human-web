<script>
    import EfOuter from "./EFOuter.svelte";

    function handleMessage(event) {
        alert(event.detail.text);
    }
</script>

<EfOuter on:message={handleMessage}/>