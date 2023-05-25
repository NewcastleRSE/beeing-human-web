<!-- Auxiliar component to load an external library -->
<script>
    import {onMount, createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let path;
    let script;

    onMount(async () => {
        script.addEventListener('load', () => {
            console.info('loaded');
            dispatch('loaded');
        })

        script.addEventListener('error', (event) => {
            console.error('something went wrong', event);
            dispatch('error');
        })

    })
</script>

<svelte:head>
    <script bind:this={script} src={path}/>
</svelte:head>