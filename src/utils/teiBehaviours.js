// This has been tailored for the current example TEI file (the coopers hill edition) -- Butler's text is not meant to follow the same principles.
// Currently there are two behaviours for the same element, depending on the `type` attribute. If:
// type = gloss: content of the note is turned into endnote, and replaced with a numbered link
// type = side-note: these were in the original text, so they are retained, but styled slightly differently. Later, stylings shuch as these are probably better placed in the stylesheet,
// just left it here as an example of how to select between elements with different attributes.
export let teiBehaviours = {
    "tei": {
        "note": [
            ["[type=gloss]", 
                function(elt) {
                    if (!this.noteIndex){
                        this["noteIndex"] = 1;
                    } else {
                        this.noteIndex++;
                    }
                    let id = "note" + this.noteIndex;
                    let link = document.createElement("a");
                    link.setAttribute("id", "src" + id);
                    link.setAttribute("href", "#" + id);
                    link.innerHTML = this.noteIndex;
                    let content = document.createElement("sup");
                    content.appendChild(link);
                    let notes = this.dom.querySelector("ol.notes");
                    if (!notes) {
                        notes = document.createElement("ol");
                        notes.setAttribute("class", "notes");
                        this.dom.appendChild(notes);
                    }
                    let note = document.createElement("li");
                    note.id = id;
                    note.innerHTML = "<a href=\"#src" + id + "\">^</a> " + elt.innerHTML
                    notes.appendChild(note);
                    return content;
                }
            ]
        ],
        "ptr": function(elt) {
            if (elt.getAttribute('target') === '#'){
                console.log('Ignoring empty ptrs...')
            } else {
                var link = document.createElement('a');
                link.href = elt.getAttribute('target');
                link.innerHTML = '>';
                return link
            }
        }, 
        "ref": function(elt) {
            if (elt.getAttribute('target') === '#') {
                console.log('Ignoring empty refs...')
            } else {
                var link = document.createElement('a');
                link.href = elt.getAttribute('target');
                link.innerHTML = elt.innerHTML;
                return link
            }
        }, 
        "graphic": function(elt) {
            if (elt.getAttribute('url') === '#') {
                console.log('Ignoring non-existent graphics...')
            }
        },
        "pb": function(elt){
            var sig = document.createElement('p');
            sig.innerHTML = elt.getAttribute('n');
            sig.classList.add('signature')
            return sig
        },
        "fw": [
            ["[type=horizontalRule]", function(elt){
                return document.createElement('hr')
        }]
    ]
    }
}