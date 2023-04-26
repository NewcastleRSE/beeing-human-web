<script>
    import NumericInput from "./NumericInput.svelte";
    import {time, elapsed} from '../utils/stores';


    const formatter = new Intl.DateTimeFormat('en', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    })
</script>

<h1>The time is {formatter.format($time)}</h1>
<h2>This page has been opened for {$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}</h2>