import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob('/src/routes/\*\/about/\*\/*.md', {query: '?raw', eager: true});
    const aboutPortals = getPortalsAPI(listMds);
    return json(aboutPortals);
}



