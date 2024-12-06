// Currently there are two behaviours for the same element, depending on the `type` attribute. If:
// type = gloss: content of the note is turned into endnote, and replaced with a numbered link
// type = side-note: these were in the original text, so they are retained, but styled slightly differently. Later, stylings shuch as these are probably better placed in the stylesheet,

import { wrapElement } from "./generalHelpers";

// just left it here as an example of how to select between elements with different attributes.
export let teiBehaviours = {
    "tei": {
        "text": function(e) {
            // main container
            const tailwindClasses = ['flex', 'flex-col']
            e.classList.add(...tailwindClasses)
        },
        "div":[
            ["[type=chapter]", function(e) {
                // const tailwindClasses = ['grid', 'grid-cols-2']
                // e.classList.add(...tailwindClasses)
                // for (const child of e.children) {
                //     if (!this.rowIndex) {
                //         this.rowIndex = 1;
                //     } else {
                //         this.rowIndex++;
                //     }
                // //     if (!this.rowIndex) {
                // //         this =  {'rowIndex': 1}
                // //     } else {
                // //         this.rowIndex++;
                // //     }
                //     child.classList.add('col-start-1')
                //     child.classList.add(`row-${this.rowIndex}`)
                // }
            }]
        ], 
        "note": [
            ["[subtype=summary]",
                function (elt) {
                    // if (!this.noteIndex) {
                    //     this["noteIndex"] = 1;
                    // } else {
                    //     this.noteIndex++;
                    // }
                    // let id = "note" + this.noteIndex;
                    // let link = document.createElement("a");
                    // link.setAttribute("id", "src" + id);
                    // link.setAttribute("href", "#" + id);
                    // link.innerHTML = this.noteIndex;
                    // let content = document.createElement("sup");
                    // content.appendChild(link);
                    // let chapterDiv = elt.closest("tei-div[type='chapter'");
                    // let note = document.createElement("p");
                    // note.classList.add('col-start-2', `row-start-${this.noteIndex}`)
                    // note.id = id;
                    // note.innerHTML = "<a href=\"#src" + id + "\">^</a> " + elt.innerHTML
                    // chapterDiv.appendChild(note);
                    // return content;
                }
            ],
            // ["[subtype=summary]", function(elt) {
            //     elt.classList.add('col-start-2')
            // }
            // ]
        ],
        'p': function(elt) {
            if (elt.parentNode.getAttribute('type') == "chapter" || elt.parentNode.getAttribute('type') == "section") {
                let parentDiv = document.createElement('div');
                parentDiv.classList.add('grid')
                parentDiv.classList.add('grid-cols-2')
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
        },
        "ptr": function (elt) {
            if (elt.getAttribute('target') === '#') {
                console.log('Ignoring empty ptrs...')
            } else {
                var link = document.createElement('a');
                link.href = elt.getAttribute('target');
                link.innerHTML = '>';
                return link
            }
        },
        "ref": function (elt) {
            let sup = false
            if (elt.getAttribute('rend') === 'superscript') {
                sup = true
            }
            if (elt.getAttribute('target') === '#') {
                console.log('Ignoring empty refs...')
                if (sup) {
                    const supEl = document.createElement('sup');
                    supEl.append(elt)
                    return sup
                }
            } else {
                var link = document.createElement('a');
                link.href = elt.getAttribute('target');
                if (sup) {
                    const supEl = document.createElement('sup');
                    supEl.innerHTML = elt.innerHTML;
                    link.append(supEl);
                } else {
                    link.innerHTML = elt.innerHTML;
                }
                return link
            }
        },
        "graphic": function (elt) {
            if (elt.getAttribute('url') === '#') {
                console.log('Ignoring non-existent graphics...')
            }
        },
        "pb": function (elt) {
            var sig = document.createElement('p');
            sig.innerHTML = elt.getAttribute('n');
            sig.classList.add('signature')
            return sig
        },
        "app": function (elt) {
            // populate children with subtype
            for (const child of elt.children) {
                child.classList.add(`var-${elt.getAttribute('subtype')}`)
            }
        },
        "rdg": function (elt) {
            if (elt.hasAttribute('data-empty')) {
                elt.innerHTML = '[Does not exist in 1609]'
            }
        },
        "lem": function (elt) {
            if (elt.hasAttribute('data-empty')) {
                elt.innerHTML = '[+1609]'
            }
            elt.classList.add('hover')
        },
        "fw": [
            ["[type=horizontalRule]", function (elt) {
                return document.createElement('hr')
            }]
        ],
        "hi": [
            ["[rend=superscript]", ["<sup>", "</sup>"]]
        ]
    }
}