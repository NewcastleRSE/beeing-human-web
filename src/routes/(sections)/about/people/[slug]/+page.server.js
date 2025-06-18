import { error } from '@sveltejs/kit';

export async function load({ parent, params, fetch }) {
   
   const allData = await parent();

   const peopleData = allData.people;
   const slug = params.slug;

//    find all articles where 'slug' matches the 'author' field in allData
//    return the articles in an array
    let articles = [];
    for (let article of Object.keys(allData)) {
         if (allData[article].author === slug) {
              articles.push(allData[article]);
         } else if (Array.isArray(allData[article].author)) {
               for (let a of allData[article].author) {
                   if (a === slug) {
                        articles.push(allData[article]);
                   }
              }
          }
    }

//     find all buzzwords where 'author' matches 'slug
// get the buzzwords from /api/buzzwords
     const res = await fetch('/api/buzzwords');
     const buzzwords = await res.json();
     let buzzwordsArr = [];
     for (let bz of Object.keys(buzzwords.buzzwords)) {
          if (buzzwords.buzzwords[bz].author === slug) {
               buzzwordsArr.push(buzzwords.buzzwords[bz]);
          };
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
              person: {...peopleData[slug], articles: articles, buzzwords: buzzwordsArr}
         }
    } else {
         error(404, 'Person does not exist');
    }
}