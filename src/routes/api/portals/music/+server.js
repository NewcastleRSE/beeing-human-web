import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob('./../../../music/*.md', {as: 'raw', eager: true});
    const musicPortals = getPortalsAPI(listMds);
    return json(musicPortals);
}



