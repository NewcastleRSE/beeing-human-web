import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob('./../../../literature/*.md', {as: 'raw', eager: true});
    const literaturePortals = getPortalsAPI(listMds);
    return json(literaturePortals);
}



