import { addTailwindClasslist, findAncestor, findIfAncestor, findInDescendant, findPreviousElement, wrapChildren, wrapElement } from "./generalHelpers";
import { checkAncestorForClass, checkForParentNotes, getElementRect, teiSetBodyLayout } from "./teiBehavioursHelper";
import ornament from '../assets/text_divider.svg'

import transcriptionData from './../routes/(sections)/literature/transcription/transcriptionData.json'

// just left it here as an example of how to select between elements with different attributes.
export let teiBehaviours = {
    "tei": {
        "text": function (e) {
            // main container
            const tailwindClasses = ['flex', 'flex-col']
            e.classList.add(...tailwindClasses);
            let listSigs = []
            for (const pb of e.getElementsByTagName('tei-pb')) {
                if (pb.getAttribute('data-origfile') != '1609') {
                    // if the pb is not inside a rdg element, add it to the list
                    listSigs.push(pb);
                }
            }
            let sigsDict = {}
            for (const [i, tag] of listSigs.entries()) {
                if (i - 1 > 0) {
                    sigsDict[tag.getAttribute('n')] = listSigs[i - 1].getAttribute('n')
                }
            }
            this.sigsDict = sigsDict;
        },
        "figure": function (elt) {
            // if figure has a graphic element, add it as an img using the url of the graphic element
            let graphic = elt.querySelector('tei-graphic');
            if (graphic) {
                let imgDiv = document.createElement('div');

                let img = document.createElement('img');
                // get url from graphic element
                let src = graphic.getAttribute('url');
                // define the img.src by adding the src to the transcriptionData object
                img.src = transcriptionData['1623']['teiMediaRoot'] + src;
                if (graphic.getAttribute('rend') === 'small') {
                    addTailwindClasslist(img, 'w-1/4');                    
                } else {
                    addTailwindClasslist(img, 'w-full');
                }
                addTailwindClasslist(img, 'h-auto mx-auto',)
                imgDiv.appendChild(img);

                // add caption if it exists
                let caption = elt.querySelector('tei-figDesc');
                if (caption) {
                    let captionElt = document.createElement('p');
                    captionElt.innerHTML = caption.innerHTML;
                    addTailwindClasslist(captionElt, 'text-center text-sm');
                    imgDiv.appendChild(captionElt);
                }

                if (elt.getAttribute('type') === 'diagram') {
                    addTailwindClasslist(imgDiv, 'grid grid-cols-[4fr_1fr] md:gap-16 gap-4 leading-relaxed text-lg')
                }
                imgDiv.classList.add('mb-4', 'flex', 'flex-col', 'gap-2', 'p-4');
                return imgDiv;
            }
        },
        "foreign": function (elt) {
            addTailwindClasslist(elt, "italic")
        },
        "emph": [
            ["[rend='blackletter']", function (elt) {
                elt.classList.add('font-blackletter');
            }],
            ["[rend='italic']", function (elt) {
                elt.classList.add('italic');
            }],
            ["_", function (elt) {
                elt.classList.add('italic');
            }]

        ],
        "gloss": [
            ["[rend='italic']", function (elt) {
                addTailwindClasslist(elt, "italic")
            }
            ]
        ],
        "lb": function (elt) {
            // replace with a br element
            let br = document.createElement('br');
            elt.replaceWith(br);
        },
        "lg": [
            ["[rend='inline']", function (elt) {
                let tailwindString = "pl-8 mb-4"
                if (elt.getAttribute('lang') || elt.getAttribute('rend') === 'italic') {
                    tailwindString += ' italic'
                }
                addTailwindClasslist(elt, tailwindString)

                // add a br in between children elements
                let placesToAdd = [];
                for (let i = 0; i < elt.children.length - 1; i++) {
                    if (i < elt.children.length - 1) {
                        placesToAdd.push(elt.children[i])
                    }
                }

                for (const place of placesToAdd) {
                    let br = document.createElement('br');
                    place.after(br);
                }
            }],
            ["_", function (elt) {
                let tailwindString = "px-8 flex flex-col mb-4"
                if (elt.getAttribute('lang') || elt.getAttribute('rend') === 'italic') {
                    tailwindString += ' italic'
                }
                addTailwindClasslist(elt, tailwindString)
            }]
        ],
        "media": function (elt) {
            // checks if the media element has a url and is audio
            if (elt.getAttribute('url') && elt.getAttribute('mimeType') === 'audio/mp3') {
                let audioDiv = document.createElement('div');

                let audio = document.createElement('audio');
                audio.src = transcriptionData['1623']['teiMediaRoot'] + elt.getAttribute('url');
                audio.controls = true;
                audio.classList.add('w-full');
                audioDiv.appendChild(audio);
                // if the elt has a 'desc' child, add it as the audio description
                let desc = elt.querySelector('tei-desc');
                if (desc) {
                    let descElt = document.createElement('p');
                    descElt.innerHTML = desc.innerHTML;
                    addTailwindClasslist(descElt, 'text-center text-sm');
                    audioDiv.appendChild(descElt);
                }

                audioDiv.classList.add('mb-4', 'flex', 'flex-col', 'gap-2', 'p-4');

                return audioDiv;
            }
        },
        "note": [
            ["[type='editorial']", function (elt) {
                elt.classList.add('hidden');
            }],
            ["[data-origfile='1609']", function (elt) {
                elt.classList.add('text-sm', 'italic');
            }],
            ["[place='inline']", function (elt) {
                addTailwindClasslist(elt, "text-sm h-fit")
                teiSetBodyLayout(elt);
            }],
            ["[subtype=summary]",
                function (elt) {
                    addTailwindClasslist(elt, "text-sm h-fit")
                }
            ],
            ["[subtype=gloss]",
                function (elt) {
                    addTailwindClasslist(elt, "text-sm h-fit")
                }
            ],
            ["[subtype='bibliographic']",
                function (elt) {
                    addTailwindClasslist(elt, 'text-sm')
                }
            ],
        ],
        'p': function (elt) {
            if (elt.parentElement && elt.parentElement.tagName != 'TEI-NOTE') {
                teiSetBodyLayout(elt);
                addTailwindClasslist(elt, 'indent-4 mb-2')
            } else {
                elt.parentElement.classList.add('flex', 'flex-col');
            }
        },
        "ptr": [
            ["tei-item>tei-ptr", function (elt) {
                let link = document.createElement('a');
                link.setAttribute('data-href', elt.getAttribute('target'));
                link.setAttribute('href', elt.getAttribute('target'));
                link.setAttribute('data-type', 'internalLink');
                link.classList.add('text-secondary-500', 'hover:text-secondary-900', 'hover:cursor-pointer', 'hover:underline');

                wrapChildren(elt.parentElement, link);
            }]
        ],
        "persName": [
            ["_", function (elt) {
                if (!findIfAncestor(elt, 'tei-titlepage')) {
                    elt.classList.add('italic');
                }
            }],
        ],
        "placeName": [
            ["_", function (elt) {
                if (!findIfAncestor(elt, 'tei-titlepage')) {
                    elt.classList.add('italic');
                }
            }],
        ],
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
            } else if (elt.getAttribute('type') === 'attachment') {
                // This is a point of attachment for an editorial note, so any processing and styling is left to the TEI viwer component

                checkForParentNotes(elt);

                let event = new CustomEvent('editorialNoteClicked', { detail: elt });

                elt.onclick = function () {
                    window.dispatchEvent(event);
                }

            } else if (elt.getAttribute('type') === 'noteCrossRef') {
                // This is a cross-reference to an editorial note, so any processing and styling is left to the TEI viwer component

            } else {
                // creates a fake link instead
                var link = document.createElement('a');
                link.classList.add('anchor');

                if (elt.getAttribute('target')[0] === '#' && elt.getAttribute('target').length > 1) {
                    // adds these types only if it is an internal link to the same page
                    link.setAttribute('data-href', elt.getAttribute('target'));
                    link.setAttribute('data-type', 'internalLink');
                }

                link.href = elt.getAttribute('target');
                if (sup) {
                    const supEl = document.createElement('sup');
                    supEl.innerHTML = elt.innerHTML;
                    link.append(supEl);
                } else {
                    link.innerHTML = elt.innerHTML;
                }


                // highlights when hovered and finds the corresponding element to highlight
                link.addEventListener('mouseover', function () {
                    let target = document.querySelector(elt.getAttribute('target'));
                    if (target) {
                        // if the target attribute contains 'glo' apply the transformations to the entire element
                        let ref = undefined;
                        let bold = true;
                        if (elt.getAttribute('target').includes('glo')) {
                            ref = target;
                            bold = false
                        } else {
                            // finds the ref inside the target element
                            ref = findInDescendant(target, 'tei-ref', [])[0];
                            // if there is no ref, applies the styles to the target element
                            if (!ref) {
                                ref = target;
                            }
                        }
                        if (ref) {
                            ref.classList.add('bg-primary-200', 'border', 'rounded', 'transition', 'duration-200', 'ease-in-out');
                            if (bold) {
                                ref.classList.add('font-bold');
                            }
                            // add flash highlight
                            setTimeout(() => {
                                ref.classList.remove('bg-primary-200');
                            }, 200);

                            // if there is no arrow inside the ref, add it
                            if (!ref.querySelector('.arrow')) {
                                // add left-pointing arrow inside the ref
                                let arrow = document.createElement('span');
                                arrow.innerHTML = ' ← ';
                                arrow.classList.add('arrow', 'anchor');
                                ref.append(arrow);
                            }

                        }
                    }
                });

                // removes the highlight when the mouse leaves
                link.addEventListener('mouseleave', function () {
                    let target = document.querySelector(elt.getAttribute('target'));
                    if (target) {

                        // if the target attribute contains 'glo' apply the transformations to the entire element
                        let ref = undefined;
                        let bold = true;
                        if (elt.getAttribute('target').includes('glo')) {
                            ref = target;
                            bold = false
                        } else {
                            // if not, applies only to the ref element
                            ref = findInDescendant(target, 'tei-ref', [])[0];
                            // if there is no ref, applies the styles to the target element
                            if (!ref) {
                                ref = target;
                            }
                        }
                        if (ref) {
                            ref.classList.remove('transition', 'border', 'rounded', 'duration-200', 'ease-in-out');
                            if (bold) {
                                ref.classList.remove('font-bold');
                            }
                            // if there is an arrow inside the ref, remove it
                            let arrow = ref.querySelector('.arrow');
                            if (arrow) {
                                arrow.remove();
                            }
                        }
                    }
                });
                elt.setAttribute('data-wrapped', 'true');
                return link
            }
        },
        "graphic": function (elt) {
            if (elt.getAttribute('url') === '#') {
                console.log('Ignoring non-existent graphics...')
            }
        },
        "pb": function (elt) {
            let emptySigs = ['¶3r', 'A3r', 'B1r']
            if (!findIfAncestor(elt, 'tei-list')) {
                // if pb is in the contents page ignore it, causing too many issues
                // also ignores pbs in the rdg element (i.e., imported from 1609)

                if (this.sigsDict[elt.getAttribute('n')] && !emptySigs.includes(elt.getAttribute('n'))) {
                    var sig = document.createElement('p');
                    sig.innerHTML = this.sigsDict[elt.getAttribute('n')];
                    sig.classList.add('signature')
                    return sig
                } else if (elt.getAttribute('data-origfile') === '1609') {
                    // if the pb is not inside a rdg element, add it to the list
                    let sig = document.createElement('p');
                    sig.innerHTML = elt.getAttribute('n');
                    sig.classList.add('signature')
                    return sig
                }
            } else {
                addTailwindClasslist(elt, 'hidden')
            }

        },
        "cb": function (elt) {
            // hides the cb, causing too many issues
            addTailwindClasslist(elt, 'hidden')
        },
        "app": function (elt) {
            // populate children with subtype
            for (const child of elt.children) {
                child.classList.add(`var-${elt.getAttribute('subtype')}`)
            }

            // remove any whitespace nodes from the element
            for (const node of elt.childNodes) {
                if (node.nodeType === 3) {
                    node.remove()
                }
            }
        },
        "rdg": function (elt) {
            elt.classList.add('hidden');
            if (elt.hasAttribute('data-empty')) {
                elt.innerHTML = '[Does not exist in 1609]'
            }
        },
        "lem": function (elt) {
            // if (elt.hasAttribute('data-empty')) {
            //     elt.innerHTML = '[+1609]'
            //     addTailwindClasslist(elt, 'hidden')
            // }
            // elt.classList.add('hover');

            // inherits styles from its grandparent
            let ancestorClassList = elt.parentNode.parentNode.classList;
            if (ancestorClassList) {
                elt.classList.add(...ancestorClassList)
            }

            // registers a custom event that will send the element on click
            let event = new CustomEvent('variationClicked', { detail: elt });

            elt.onclick = function () {
                window.dispatchEvent(event);
            };

        },
        "fw": [
            ["tei-titlePage>tei-fw[type=horizontalRule]", function () {
                let fancyHr = document.createElement('div');
                addTailwindClasslist(fancyHr, 'h-0.5 bg-secondary-500 w-4/5 mx-auto my-4 rounded-full');
                return fancyHr
            }],
            ["[type=horizontalRule]", function (elt) {
                return document.createElement('hr')
            }],
            ["[type=catch]", function (elt) {
                // ensures the behaviour is only applied once

                if (elt.parentNode && elt.parentNode.tagName != 'DIV' && findIfAncestor(elt, 'tei-list') === false) {
                    // IF PAGE BREAK IS IN THE CONTENTS, IGNORE IT, CAUSING TOO MANY ISSUES

                    const pageFooterDiv = document.createElement('div');
                    let tailwindStringWrapper = "gap-16 mt-2 mb-16 text-sm tei-footer"
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
                } else if (findIfAncestor(elt, 'tei-list')) {
                    addTailwindClasslist(elt, 'hidden');
                }
            }],
            ["[type=header]", function (elt) {
                if (elt.parentNode.tagName != 'DIV') {
                    const pageHeaderDiv = document.createElement('div')
                    addTailwindClasslist(pageHeaderDiv, "grid grid-cols-4 gap-16 mb-2 tei-header")
                    wrapElement(elt, pageHeaderDiv);
                    addTailwindClasslist(elt, 'italic text-lg justify-self-center col-span-3')
                } else {
                    addTailwindClasslist(elt, 'italic text-lg justify-self-center col-span-3 gap-16 mb-2 text-center')
                }
            }],
            ["[type=ornament]", function (elt) {
                let ornamentEl = document.createElement('object');
                ornamentEl.setAttribute('data', ornament);
                addTailwindClasslist(elt, 'flex justify-center my-8')

                return ornamentEl;
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
            ["[rend=italic]", function (elt) {
                addTailwindClasslist(elt, 'italic')
            }],
            ["[rend=opposite]", function (elt) {
                // if any of its ancestors are in italics, remove the italic class
                if (checkAncestorForClass(elt, 'italic')) {
                    elt.classList.remove('italic');
                    elt.classList.add('not-italic');
                } else {
                    elt.classList.add('italic');
                }
            }],
            ["[rend='finis']", function (elt) {
                addTailwindClasslist(elt, 'my-24')
            }],
        ],
        "q": [
            ["[type='reported']", function (elt) {
                // insert text node at the start of the element
                let text = document.createTextNode('"');
                elt.insertBefore(text, elt.firstChild);
                // insert text node at the end of the element
                text = document.createTextNode('"');
                elt.appendChild(text);
            }],
            ["[rend='marks']", function (elt) {
                // insert text node at the start of the element
                let text = document.createTextNode('"');
                elt.insertBefore(text, elt.firstChild);
                // insert text node at the end of the element
                text = document.createTextNode('"');
                elt.appendChild(text);
            }],
            ["_", function (elt) {
                addTailwindClasslist(elt, 'italic');
            }]
        ],
        "seg": [
            ["[type='special-list-ch1']", function (elt) {
                addTailwindClasslist(elt, "italic flex flex-row justify-center items-center gap-8")
            }],
            ["[rend='italic']", function (elt) {
                addTailwindClasslist(elt, "italic");
            }],
            ["[rend='roman']", function (elt) {
                addTailwindClasslist(elt, "not-italic");
            }],
            ["[type='fragmentedNoteAttachement']", function (elt) {
                // This is a fragment point of attachment for an editorial note, so any processing and styling is left to the TEI viwer component

                checkForParentNotes(elt);

                let event = new CustomEvent('editorialNoteClicked', { detail: elt, bubbles: true });

                elt.onclick = function () {
                    window.dispatchEvent(event);
                }
            }]
        ],
        "titlePage": function (elt) {
            addTailwindClasslist(elt, "flex flex-col content-center py-32")
        },
        "docTitle": function (elt) {
            addTailwindClasslist(elt, "flex flex-col")

            for (let child of elt.children) {
                addTailwindClasslist(child, 'w-fit')
            }
        },
        "titlePart": [
            ["[type=main", function (elt) {
                addTailwindClasslist(elt, 'flex flex-col text-6xl self-center place-items-center mb-4 text-center')
            }],
            ["[type=sub", function (elt) {
                addTailwindClasslist(elt, 'flex flex-col text-xl self-center place-items-center mb-4 text-center')
            }]
        ],
        "byline": function (elt) {
            addTailwindClasslist(elt, "flex flex-col self-center place-items-center text-xl")
        },
        "epigraph": function (elt) {
            addTailwindClasslist(elt, "flex flex-col self-center place-items-center text-sm mb-4 text-center")
        },
        "docImprint": function (elt) {
            addTailwindClasslist(elt, "text-center");
        },
        "head": [
            ["tei-lg[id=melissomeloslyrics]>tei-lg>tei-head", function (elt) {
                // hides the heads in the lyrics to melissomelos
                addTailwindClasslist(elt, 'hidden');
            }],
            ["tei-div[type=preface]>tei-head", function (elt) {
                addTailwindClasslist(elt, 'text-4xl mb-16')
            }],
            ["tei-body>tei-head", function (elt) {
                addTailwindClasslist(elt, 'text-4xl mb-16 flex flex-col items-center')
            }],
            ["[type=chapter-number]", function (elt) {
                addTailwindClasslist(elt, 'text-2xl mb-2 text-center');
            }
            ],
            ["[type=chapter-title]", function (elt) {
                addTailwindClasslist(elt, 'text-2xl mb-8 italic text-center');
            }
            ],
            ["_", function (elt) {
                addTailwindClasslist(elt, 'text-4xl mb-16 text-center')
            }]
        ],
        "div": [
            ["[type=poem]", function (elt) {
                addTailwindClasslist(elt, "flex flex-col mb-8")
            }],
            ["[type=contents-chapter]", function (elt) {
                addTailwindClasslist(elt, "flex flex-col my-8")
            }],
            ["_", function (elt) {
                addTailwindClasslist(elt, 'flex flex-col')
            }]
        ],
        "bibl": [
            ["[rend=italic]", function (elt) {
                addTailwindClasslist(elt, 'italic')
            }]
        ],
        "term": function (elt) {
            addTailwindClasslist(elt, 'italic');
        },
        "placename": function (elt) {
            addTailwindClasslist(elt, 'italic')
        },
        "signed": function (elt) {
            addTailwindClasslist(elt, 'place-self-end');
            teiSetBodyLayout(elt);
        },
        "list": [
            ["tei-div[type=contents-chapter]>tei-list", function (elt) {
                addTailwindClasslist(elt, 'grid grid-cols-2 gap-x-4 gap-y-1.5');
            }],
            ["tei-div[type=contents-section]>tei-list", function (elt) {
                addTailwindClasslist(elt, 'grid grid-cols-2 gap-x-4 gap-y-1.5 mb-20');
            }],
            ["_", function (elt) {
                addTailwindClasslist(elt, 'flex flex-col')
            }]
        ],
        "item": [
            ["tei-div[type=contents-chapter]>tei-list>tei-item", function (elt) {
                let previousCb = findPreviousElement(elt, 'tei-cb');
                if (previousCb) {
                    let col = undefined;
                    if (previousCb.getAttribute('n') === "1") {
                        col = "left"
                    } else {
                        col = "right"
                    }
                    elt.classList.add(col);
                }
            }]
        ],
        "trailer": function (elt) {
            addTailwindClasslist(elt, 'flex flex-col text-xl my-8 items-center italic')
            // adds the same attributes to the child quote
            let quote = elt.querySelector('tei-quote');
            if (quote) {
                addTailwindClasslist(quote, 'text-center')
            }
            if (quote) {
                // adds a line break after the tei-bibl
                let br = document.createElement('br');
                // find the bibl element
                let bibl = elt.querySelector('tei-bibl');
                if (bibl) {
                    bibl.after(br);
                    addTailwindClasslist(bibl, 'not-italic')
                }
                // find the emph element and remove italic
                let emph = elt.querySelector('tei-emph');
                if (emph) {
                    emph.classList.add('not-italic')
                }
            }
        },
    }
}