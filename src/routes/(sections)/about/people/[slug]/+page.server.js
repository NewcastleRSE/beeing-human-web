import { error } from '@sveltejs/kit';
import people from '../people.json'

// Necessary to prerender the pages for people who are not the authors of any articles. See https://svelte.dev/docs/kit/page-options#entries for more details.
export async function entries() {
     let entriesArray = [];
     for (let person of Object.keys(people)) {
          entriesArray.push({
               slug: person,
          })
     }
     return entriesArray;
}

export async function load({ parent, params, fetch }) {

     const allData = await parent();

     const peopleData = allData.people;
     const slug = params.slug;


     //    find all articles where 'slug' matches the 'author' field in allData
     //    return the articles in an array
     let articles = [];
     for (let [key, article] of Object.entries(allData.articleData)) {
          if (article.author === slug) {
               articles.push(article);
          } else if (Array.isArray(article.author)) {
               for (let a of article.author) {
                    if (a === slug) {
                         articles.push(article);
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

     const personData = { person: { ...peopleData[slug], articles: articles, buzzwords: buzzwordsArr } }

     //    if slug is a key in peopleData, return the person object
     if (slug in peopleData) {
          return personData
     } else {
          error(404, 'Person does not exist');
     }
}