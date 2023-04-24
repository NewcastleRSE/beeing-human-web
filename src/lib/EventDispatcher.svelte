<script>
    import InnerEvent from "./InnerEvent.svelte";
    
    function handleMesssage(event) {
        alert(event.detail.text);
    }
</script>

<InnerEvent on:message={handleMesssage}/>