import { addTailwindClasslist, wrapElement } from "./generalHelpers";

export function teiSetBodyLayout(elt) {
    // takes an element and wraps it in the necessary divs, and applies the necessary styles, to turn it into a 2-column grid where the right hand side is left out for notes

    // prevents from applying to title page
    let titlePage = document.getElementsByTagName('tei-titlepage');
    if (!titlePage[0].contains(elt)) {
        
        if (elt.parentNode.tagName != 'DIV') {
            let parentDiv = document.createElement('div');
            // Define a grid with 2 columns, where the first column takes 3/4 and the second column takes 1/4 of the width
            const tailwindClasses = ['grid', 'grid-cols-[4fr_1fr]', 'md:gap-16', 'gap-4', 'leading-relaxed', 'text-lg']
            parentDiv.classList.add(...tailwindClasses)
            // Make the element span the first column
            elt.classList.add('col-span-1')
            wrapElement(elt, parentDiv);

            let notesDiv = document.createElement('div');
            // Make the notes div span the second column
            addTailwindClasslist(notesDiv, 'col-span-1 grid md:h-full gap-4')
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