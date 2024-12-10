import { addTailwindClasslist, wrapElement } from "./generalHelpers";

export function teiSetBodyLayout(elt) {
    // takes an element and wraps it in the necessary divs, and applies the necessary styles, to turn it into a 2-column grid where the right hand side is left out for notes

    // prevents from applying to title page
    let titlePage = document.getElementsByTagName('tei-titlepage');
    if (!titlePage[0].contains(elt)) {
        
        if (elt.parentNode.tagName != 'DIV') {
            let parentDiv = document.createElement('div');
            const tailwindClasses = ['grid', 'grid-cols-4', 'gap-16', 'leading-relaxed', 'text-lg']
            parentDiv.classList.add(...tailwindClasses)
            elt.classList.add('col-span-3')
            wrapElement(elt, parentDiv);

            let notesDiv = document.createElement('div');
            addTailwindClasslist(notesDiv, 'grid h-full gap-4')
            let childNotes = [...elt.querySelectorAll('tei-note')]
            for (let child of childNotes) {
                if (child.getAttribute('type') === 'authorial') {
                    notesDiv.appendChild(child);
                }
            }
            parentDiv.append(notesDiv);
        }
    
    }
}