import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob('/src/routes/\*\/science/\*\/*.md', {query: '?raw', eager: true});
    const sciencePortals = getPortalsAPI(listMds);
    return json(sciencePortals);
}



