import { addTailwindClasslist, wrapElement, findAncestor } from "./generalHelpers";

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

export function getElementRect(elt) {
    // with fragmented notes elements, getBoundingClientRect() was returning all 0s, so this function is a workaround to make sure the element is in the DOM and visible before checking if the element is in view and dispatching an event

    if (elt && elt.offsetParent !== null) {
        return elt.getBoundingClientRect();
    } else {
        // console.warn('Element is not in the DOM or is hidden');
        return null;
    }
}

export function isElementVisibleInViewport(elt, callback) {
    if (!elt) {
        console.warn('Element is not provided');
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible in the viewport
                console.log('in view')
                callback(true);
                observer.unobserve(entry.target);
            } else {
                // Element is not visible in the viewport
                console.log('not in view')
                callback(false);
            }
        });
    }, {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger callback when 10% of the element is visible
    });

    observer.observe(elt);
}

export function checkForParentNotes(elt) {
    // checks to see if the element is also contained by a another ref with the same type
    let parentRef = findAncestor(elt, 'tei-ref');
    let potentialSeg = findAncestor(elt, 'tei-seg');
    let parentSeg = undefined;
    
    // checks to see if the element is contained by a fragmented note
    if (potentialSeg) {
        if (potentialSeg.getAttribute('type') === 'fragmentedNoteAttachement') {
            parentSeg = potentialSeg;
        }
    }

    // sets the bit to add
    let additionalTarget = '';
    if (elt.tagName === 'TEI-REF') {
        additionalTarget = elt.getAttribute('target');
    } else if (elt.tagName === 'TEI-SEG') {
        additionalTarget = elt.getAttribute('corresp');
    }
    
    if (parentRef || parentSeg) {
        // if it is contained by a ref, add the point of attachement to the ref target
        if (parentRef && !parentSeg) {
            // if the it is contained by a ref, add the target to the parent ref and does not dispatch an event on the inner ref;
            parentRef.setAttribute('target', `${parentRef.getAttribute('target')} ${additionalTarget}`);
        } else if (parentSeg && !parentRef) {
            // if it is by a fragmented note, add the target to the corresp
            parentSeg.setAttribute('corresp', `${parentSeg.getAttribute('corresp')} ${additionalTarget}`);
        }
        
    } else {
        parentRef = undefined;
    }

    return parentRef;

}

export function checkAncestorForClass(elt, className) {
    // checks to see if the element is contained by or a descendent of an element with a specific className
    let parent = elt.parentNode;
    while (parent.tagName != 'TEI-TEI') {
        if (parent.classList.contains(className)) {
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
}