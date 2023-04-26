<script>
    import {customCount} from '../utils/stores';
</script>

<h1>The count is {$customCount}</h1>

<button on:click={customCount.increment}>+</button>
<button on:click={customCount.decrement}>-</button>
<button on:click={customCount.reset}>reset</button>