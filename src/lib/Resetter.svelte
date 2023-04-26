<script>
    import {count} from '../utils/stores';

    function reset() {
        count.set(0);
    }
</script>

<button on:click={reset}>reset</button>