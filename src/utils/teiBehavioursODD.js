import { addTailwindClasslist, findAncestor, findIfAncestor, findInDescendant, findPreviousElement, wrapChildren, wrapElement } from "./generalHelpers";
import { checkAncestorForClass, checkForParentNotes, getElementRect, splitElementIntoThree, teiSetBodyLayout } from "./teiBehavioursHelper";
import ornament from '../assets/text_divider.svg'

import transcriptionData from '../routes/(sections)/literature/transcription/transcriptionData.json'

// just left it here as an example of how to select between elements with different attributes.
export let teiBehaviours = {
    "tei": {
        "div": function (e) {
            addTailwindClasslist(e, "flex flex-col my-8");
        },
        "head": function (e) {
            addTailwindClasslist(e, "font-sans font-bold text-2xl my-4");
        },
        "p": function (e) {
            addTailwindClasslist(e, "my-2");
        },
        "title": function (e) {
            addTailwindClasslist(e, "italic");
        },
        "ref": function (e) {
            let link = document.createElement("a");
            link.href = e.getAttribute("target");
            wrapElement(e, link);
            addTailwindClasslist(link, "text-blue-600 underline");
        },
        "ptr": function (e) {
            let link = document.createElement("a");
            link.href = e.getAttribute("target");
            // find the element with the id referenced in the target attribute
            let target = document.getElementById(e.getAttribute("target").substring(1));
            // find tei-head element inside target
            let header = target.getElementsByTagName("tei-head")[0];
            e.innerHTML = header ? header.innerHTML : "broken link";
            wrapElement(e, link);
            addTailwindClasslist(link, "text-blue-600 underline");
        },
        "list": function (e) {
            // replace with a ul
            let ul = document.createElement("ul");
            ul.innerHTML = e.innerHTML;
            addTailwindClasslist(ul, 'flex flex-col pl-4 list-disc')
            return ul;
        },
        "item": function (e) {
            let li = document.createElement("li");
            li.innerHTML = e.innerHTML;
            return li;
        },
        "emph": function (e) {
            addTailwindClasslist(e, "font-bold");
        },
        "ident": function (e) {
            addTailwindClasslist(e, "font-mono bg-gray-200 px-1 rounded");
        },
        "tag": function (e) {
            // add < > around the content
            e.innerHTML = "&lt;" + e.innerHTML + "&gt;";
            addTailwindClasslist(e, "font-mono bg-gray-200 px-1 rounded");
        },
        "att": function (e) {
            // add @ before the content
            e.innerHTML = "@" + e.innerHTML;
            addTailwindClasslist(e, "font-mono bg-gray-200 px-1 rounded");
        },
        "val": function (e) {
            e.innerHTML = "\"" + e.innerHTML + "\"";
            addTailwindClasslist(e, "font-mono bg-gray-200 px-1 rounded");
        },
        "label": function (e) {
            addTailwindClasslist(e, "font-sans font-semibold mt-2");
        },
        "schemaSpec": function (e) {
            addTailwindClasslist(e, "hidden");
        }
    }
}