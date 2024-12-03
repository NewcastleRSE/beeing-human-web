import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listBuzzWords = import.meta.glob('/src/routes/\*\/connections/buzzwords/*.md', {query: '?raw', eager: true});
    const portalBuzzwords = getPortalsAPI(listBuzzWords);
    return json(portalBuzzwords);
}



