<!--
    @component
    This is the beginning of a possible implementation that would take a more granular approach than the naive CEITEICEAN implementation currently working. It would essentially create a svelte element for each TEI custom element, and build a document from that, rather than load the CETEICEAN library on the client and make the transformation there. 
-->

<script>
    import { defineCustomElement } from 'CETEIcean/utilities.js';
    import TeiElement from './TEIElement.svelte';
    

    /**
     * @typedef {Object} Props
     * @property {any} doc - import { JSDOM } from 'jsdom'
     * @property {any} elements
     */

    /** @type {Props} */
    let { doc, elements } = $props();
    // export let routes = undefined;

    for (const el of elements) {
        defineCustomElement(el);
    }

    // const teiDom = new JSDOM(doc, {contentType: 'text/xml'})
    // const teiDoc = teiDom.window.document;
</script>

<TeiElement element='tei-text'>This is a test TEI element</TeiElement>
<div>{@html doc}</div>