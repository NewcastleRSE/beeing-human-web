import { addTailwindClasslist, wrapElement } from "./generalHelpers";
import { teiSetBodyLayout } from "./teiBehavioursHelper";

// just left it here as an example of how to select between elements with different attributes.
export let teiBehaviours = {
    "tei": {
        "text": function(e) {
            // main container
            const tailwindClasses = ['flex', 'flex-col']
            e.classList.add(...tailwindClasses);
            const listSigs = [...e.getElementsByTagName('tei-pb')]; 
            let sigsDict = {}
            for (const [i, tag] of listSigs.entries()) {
                if (i-1 > 0) {
                    sigsDict[tag.getAttribute('n')] = listSigs[i-1].getAttribute('n')
                }
            }
            this.sigsDict = sigsDict;
        },
        "foreign": function(elt) {
            addTailwindClasslist(elt, "italic")            
        },
        "lg": function(elt) {
            let tailwindString = "px-8 flex flex-col"
            if (elt.getAttribute('lang')) {
                tailwindString += ' italic'
            }
            addTailwindClasslist(elt, tailwindString)
        },
        "note": [
            ["[subtype=summary]",
                function (elt) {
                    addTailwindClasslist(elt, "text-sm, h-fit")
                }
            ],
            ["[subtype='bibliographic']", 
                function(elt) {
                    addTailwindClasslist(elt, 'text-sm')
                }
            ]
        ],
        'p': function(elt) {
            teiSetBodyLayout(elt);
            addTailwindClasslist(elt, 'indent-4 mb-2')
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
        "quote": function(elt) {
            teiSetBodyLayout(elt);

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
            if (this.sigsDict[elt.getAttribute('n')]) {
                var sig = document.createElement('p');
                sig.innerHTML = this.sigsDict[elt.getAttribute('n')];
                sig.classList.add('signature')
                return sig
            }
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
            elt.classList.add('hover');
        },
        "fw": [
            ["[type=horizontalRule]", function (elt) {
                return document.createElement('hr')
            }], 
            ["[type=catch]", function(elt) {
                // ensures the behaviour is only applied once
                if (elt.parentNode.tagName != 'DIV') {
                    const pageFooterDiv = document.createElement('div');
                    let tailwindStringWrapper = "gap-16 mt-2 mb-16 text-sm"
                    let tailwindStringElt = "justify-self-end"
                    if (elt.parentNode.tagName === 'TEI-DIV') {
                        tailwindStringWrapper += " grid grid-cols-4"
                        tailwindStringElt += " col-start-3"
                    } else {
                        tailwindStringWrapper += " grid grid-cols-3";
                    }
                    
                    addTailwindClasslist(pageFooterDiv, tailwindStringWrapper);
                    addTailwindClasslist(elt, tailwindStringElt);
                    if (elt.nextElementSibling && elt.nextElementSibling.tagName === 'TEI-PB') {
                        addTailwindClasslist(elt.nextElementSibling, 'col-start-2 justify-self-center');
                        pageFooterDiv.appendChild(elt.nextElementSibling);

                    };
                    wrapElement(elt, pageFooterDiv);
                }
            }],
            ["[type=header]", function(elt) {
                if (elt.parentNode.tagName != 'DIV') {
                    const pageHeaderDiv = document.createElement('div')
                    addTailwindClasslist(pageHeaderDiv, "grid grid-cols-4 gap-16 mb-2")
                    wrapElement(elt, pageHeaderDiv);
                    addTailwindClasslist(elt, 'italic text-lg justify-self-center col-span-3')
                } else {
                    addTailwindClasslist(elt, 'italic text-lg justify-self-center col-span-3 gap-16 mb-2 text-center')
                }
            }]
        ],
        "hi": [
            ["[rend=superscript]", ["<sup>", "</sup>"]],
            ["[rend=drop-capital]", function (elt) {
                addTailwindClasslist(elt.parentNode, "first-letter:float-left first-letter:text-7xl first-letter:pr-4")
                elt.parentNode.classList.remove("indent-4")
                // only removing does not trigger an update to the element
                elt.parentNode.classList.add("indent-0")
            }],
            ["[rend=italic]", function(elt) {
                addTailwindClasslist(elt, 'italic')
            }]
        ],
        "seg": [
            ["[rend='italic']", function(elt) {
                addTailwindClasslist(elt, "italic");
            }]
        ],
        "titlePage": function(elt) {
            addTailwindClasslist(elt, "flex flex-col")
        },
        "docTitle": function(elt) {
            addTailwindClasslist(elt, "flex flex-col")
        },
        "titlePart": [
            ["[type=main", function(elt) {
                addTailwindClasslist(elt, 'flex flex-col justify-center text-4xl')
            }],
            ["[type=sub", function(elt) {
                addTailwindClasslist(elt, 'flex flex-col justify-center text-xl')
            }]
        ]
    }
}