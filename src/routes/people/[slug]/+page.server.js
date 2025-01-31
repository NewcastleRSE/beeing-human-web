import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
   
   const allData = await parent();

   const peopleData = allData.people;
   const slug = params.slug;

//    if slug is a key in peopleData, return the person object
    if (slug in peopleData) {
         return {
              person: peopleData[slug]
         }
    } else {
         error(404, 'Person does not exist');
    }
}