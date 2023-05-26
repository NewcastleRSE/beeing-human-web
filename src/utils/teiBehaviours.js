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
            ],
            ["[type=side-note]", function(elt) {
                elt.style.fontSize = '0.75em';
                elt.style.marginLeft = '1em';
                elt.style.fontStyle = 'italic';
            }]
        ]
        
    }
}