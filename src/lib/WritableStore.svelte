<script>
    import Incrementer from "./Incrementer.svelte";
    import Decrementer from "./Decrementer.svelte";
    import Resetter from "./Resetter.svelte";
    import {count} from "../utils/stores";

    let countValue;

    count.subscribe(value => {
        countValue = value;
    });
</script>

<h1>The count is {$count}</h1>
<Incrementer/>
<Decrementer/>
<Resetter/>