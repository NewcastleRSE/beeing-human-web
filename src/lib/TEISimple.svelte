<!-- 
    @component
    This is a naive implementation of CETEIcean to transform and display a TEI document -- it replicates the simple use case of loading the library into an html page, and using simple JS to inject the transformed markup into the html, while registering the custom components. It also loads an additional stylesheet with basic styling for these components It works fine, but it does not take advatange of the capabilities of a framework like svelte. An updated implementation should take a more granular approach and, eventually, instead of simply registering the new elements, it should create new svelte elements at build time. It essentially should follow the principles in the astro / react implementation here https://github.com/raffazizzi/astro-tei
    
    props:
        `path`: a path to a TEI-encoded XML file
    
    usage:
        ```
        <TEISimple path='link/to/tei/file.xml'/>
        ```
-->

<script>
    import { onMount } from 'svelte';
    import CETEI from 'CETEIcean';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { base } from "$app/paths";
    import {teiBehaviours} from '../utils/teiBehaviours';

    let loaded = false;
    let error = undefined;
    export let path = '';

    onMount(async () => {
        try {
            if (path === '') {
                throw 'No path specified';
            }
            var cetei = new CETEI();
            cetei.addBehaviors(teiBehaviours);
            cetei.getHTML5(path, function(data) {
                document.getElementById('TEI-container').appendChild(data);
            });
            loaded = true;
        } catch (err) {
            error = err.toString();
            loaded = true;
            return
        }
    })
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="{base}/additional-style/TEIstyle.css"/>
</svelte:head>

<div id='TEI-container' data-testid="TEI-container">
    {#if !loaded}
        <ProgressRadial/>
    {/if}
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>