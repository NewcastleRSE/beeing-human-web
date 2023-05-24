<script>
    import CETEI from 'CETEIcean';
    import { onMount } from 'svelte';

    export let teiString = '';
    let transformed = '';

    onMount(async () => {
        var cetei = new CETEI();
        transformed = cetei.domToHTML5(teiString);
        console.log(transformed)
    })
</script>

<div></div>