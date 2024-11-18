import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob('/src/routes/\*\/music/\*\/*.md', {query: '?raw', eager: true});
    const musicPortals = getPortalsAPI(listMds);
    return json(musicPortals);
}



