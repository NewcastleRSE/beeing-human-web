import { views } from '../data.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const view = views.find((view) => view.slug === params.view);

    if (!view) throw error(404);

    return {
        view
    };
}