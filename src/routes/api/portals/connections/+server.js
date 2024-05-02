import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob('./../../../connections/*.md', {as: 'raw', eager: true});
    const connectionsPortals = getPortalsAPI(listMds);
    return json(connectionsPortals);
}



