<!-- This is a naive implementation of CETEIcean to transform and display a TEI document -- it replicates the simple use case of loading the library into an html page, and using simple JS to inject the transformed markup into the html, while registering the custom components. It also loads an additional stylesheet with basic styling for these components It works fine, but it does not take advatange of the capabilities of a framework like svelte. An updated implementation should take a more granular approach and, eventually, instead of simply registering the new elements, it should create new svelte elements at build time. It essentially should follow the principles in the astro / react implementation here https://github.com/raffazizzi/astro-tei -->

<script>
    import { onMount } from 'svelte';
    import CETEI from 'CETEIcean';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { base } from "$app/paths";

    let loaded = false;
    export let path = '';

    onMount(async () => {
        var cetei = new CETEI();
        cetei.addBehaviors({ "tei": {
            "note": function(elt){
                if (!this.noteIndex){
                    this["noteIndex"] = 1;
                } else {
                    this.noteIndex++;
                }
                let id = "note" + this.noteIndex;
                let link = document.createElement("a");
                link.setAttribute("id", "src" + id);
                link.setAttribute("href", "#" + id);
                link.innerHTML = this.noteIndex;
                let content = document.createElement("sup");
                content.appendChild(link);
                let notes = this.dom.querySelector("ol.notes");
                if (!notes) {
                    notes = document.createElement("ol");
                    notes.setAttribute("class", "notes");
                    this.dom.appendChild(notes);
                }
                let note = document.createElement("li");
                note.id = id;
                note.innerHTML = "<a href=\"#src" + id + "\">^</a> " + elt.innerHTML
                notes.appendChild(note);
                return content;
                }
        }});
        cetei.getHTML5(path, function(data) {
            document.getElementById('TEI-container').appendChild(data);
        });
        loaded = true;
    })
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="{base}/additional-style/TEIstyle.css"/>
</svelte:head>

<div id='TEI-container'>
    {#if !loaded}
        <ProgressRadial/>
    {/if}
</div>