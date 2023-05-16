import { views } from '../data.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    let view = views.find((view) => view.slug === params.view);
    
    for (let section in view.sections) {
        if (view['sections'][section]['type'] == 'md') {
            let response = await fetch(`${view.slug}/${section}.md`)
            .then(function(response) {
                if (response.ok) {
                    return response.text();
                } else {
                    throw error(404, `'${section}' section does not exist.`)
                }
            }).then(function (data) {
                view['sections'][section]['content'] = data;
            });   
        }
    }


    if (!view) throw error(404, `${view.slug} does not exist`);

    return {
        view
    };
}