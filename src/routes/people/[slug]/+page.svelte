<script>
    let {data} = $props();

    let personData = $derived(data.person)
</script>


<p>{JSON.stringify(personData)}</p>