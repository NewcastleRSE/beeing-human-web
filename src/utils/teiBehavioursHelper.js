import { wrapElement } from "./generalHelpers";

export function teiSetBodyLayout(elt) {
    // takes an element and wraps it in the necessary divs, and applies the necessary styles, to turn it into a 2-column grid where the right hand side is left out for notes
    if (elt.parentNode.tagName != 'DIV') {
        let parentDiv = document.createElement('div');
        const tailwindClasses = ['grid', 'grid-cols-4', 'gap-16']
        parentDiv.classList.add(...tailwindClasses)
        elt.classList.add('col-span-3')
        wrapElement(elt, parentDiv);

        let notesDiv = document.createElement('div');
        notesDiv.classList.add('grid')
        let childNotes = [...elt.querySelectorAll('tei-note')]
        for (let child of childNotes) {
            if (child.getAttribute('type') === 'authorial') {
                notesDiv.appendChild(child);
            }
        }
        parentDiv.append(notesDiv);
    }
}