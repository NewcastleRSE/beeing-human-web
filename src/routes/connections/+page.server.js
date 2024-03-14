import parseMD from 'parse-md';
import { getListOfUniqueElements } from '../../utils/stringOperations.js';

export async function load({fetch}) {
    // load the buzzword mds
    let listBuzzWords = import.meta.glob('/static/content/connections/buzzwords/*.md', {as: 'raw', eager: true});
    let buzzwords = []
    let buzzwordTags = []
    let buzzwordAuthors = []
    for (const buzz in listBuzzWords) {
      let path = JSON.stringify(buzz);
      let id = path.slice(path.lastIndexOf('/') + 1, path.length - 4);
      const {metadata, content} = parseMD(listBuzzWords[buzz]);
      if (metadata.tags) {
        // splits the tags into an array, ensuring they are all lowercase
        metadata.tags = metadata.tags.toLowerCase().split(', ');
        metadata.author = metadata.author.toLowerCase();
      }
      buzzwords.push({...metadata, id: id, content: content});
    }

    // create list of tags for buzzwords
    let tags = buzzwords.map(entry => entry.tags).flat();
    
    // get a list of unique elements in the array and remove any undefined
    buzzwordTags = getListOfUniqueElements(tags);

    // create a list of authors
    buzzwordAuthors = getListOfUniqueElements(buzzwords.map(entry => entry.author));

    return {buzzwords, buzzwordTags, buzzwordAuthors}
}