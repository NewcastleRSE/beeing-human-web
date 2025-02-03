import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
   
   const allData = await parent();

   const peopleData = allData.people;
   const slug = params.slug;

//    find all articles where 'slug' matches the 'author' field in allData
//    return the articles in an array
    let articles = [];
    for (let article of Object.keys(allData)) {
         if (allData[article].author === slug) {
              articles.push(allData[article]);
         }
    }
    
    if (articles.length > 0) {
     //     create an object with title, url and parent for each article
           articles = articles.map(article => {
                 return {
                       title: article.title,
                       url: article.link,
                       parent: article.parent
                 }
           });
    }

//    if slug is a key in peopleData, return the person object
    if (slug in peopleData) {
         return {
              person: {...peopleData[slug], articles: articles}
         }
    } else {
         error(404, 'Person does not exist');
    }
}