import {json} from '@sveltejs/kit'
import { getPortalsAPI } from '../../../../utils/apiHelper.js';

export const prerender = true

export async function GET(event) {
    let listMds = import.meta.glob(['/src/routes/\*\/connections/\*\/*.md', '!**/buzzwords/*.md'], {query: '?raw', eager: true});
    try {
        const connectionsPortals = getPortalsAPI(listMds);
        return json(connectionsPortals);
    }  catch(e) {
      return json({})  
    }
}



