import { views } from '../data.js';
import { error } from '@sveltejs/kit';
import { findSectionNameAndType } from '../../../utils/stringManipulation.js';

export async function load({ fetch, params }) {
    let view = views.find((view) => view.slug === params.view);
    let listSections = []

    // get list of sections
    // import.meta.glob does not allow for dynamic variables in the search path, so it needs a switch statement to adjust based on the selected view
    // will need to be adapted if different/more views are necessary
    switch(view.slug) {
        case 'literature': 
            listSections = import.meta.glob('/static/content/literature/*.md', { as: 'raw', eager: true });
            break;
        case 'science':
            listSections = import.meta.glob('/static/content/science/*.md', { as: 'raw', eager: true });
            break;
        case 'music':
            listSections = import.meta.glob('/static/content/music/*.md', { as: 'raw', eager: true });
            break;
        case 'interdisciplinarity':
            listSections = import.meta.glob('/static/content/interdisciplinarity/*.md', { as: 'raw', eager: true });
            break;
        default:
            throw error (404, `${view} does not exist;`);
            break;
    }

    // iterate through the list of sections and add it to the `data.js` data
    let sections = {}
    for (const path in listSections) {
        let fields = findSectionNameAndType(path);
        sections[fields.section] = {type: fields.type, content: listSections[path]};
    }

    // add section metadata and data to export view
    view['sections'] = sections;
        
    // // Get content for each listed section (i.e., fetch the .md file, place it in `data`)
    // for (let section in view.sections) {
    //     if (view['sections'][section]['type'] == 'md') {
    //         let response = await fetch(`${view.slug}/${section}.md`)
    //         .then(function(response) {
    //             if (response.ok) {
    //                 return response.text();
    //             } else {
    //                 throw error(404, `'${section}' section does not exist.`)
    //             }
    //         }).then(function (data) {
    //             view['sections'][section]['content'] = data;
    //         });   
    //     }
    // }


    if (!view) throw error(404, `${view.slug} does not exist`);

    return {
        view
    };
}