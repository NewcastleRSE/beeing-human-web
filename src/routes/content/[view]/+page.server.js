import { views } from '../data.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    let view = views.find((view) => view.slug === params.view);

    for (let section in view.sections) {
        let response = await fetch(`${view.slug}/${section}.md`);
        view['sections'][section]['content'] = response.body.json;
    }


    if (!view) throw error(404);

    return {
        view
    };
}