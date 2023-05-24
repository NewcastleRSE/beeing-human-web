<script>
    import { defineCustomElement } from 'CETEIcean/utilities.js';
    import TeiElement from './TEIElement.svelte';
    // import { JSDOM } from 'jsdom'

    export let doc;
    export let elements;
    // export let routes = undefined;

    for (const el of elements) {
        defineCustomElement(el);
    }

    // const teiDom = new JSDOM(doc, {contentType: 'text/xml'})
    // const teiDoc = teiDom.window.document;
</script>

<TeiElement element='tei-text'>This is a test TEI element</TeiElement>
<div>{@html doc}</div>