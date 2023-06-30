import { views } from "../data.js";
import { error } from "@sveltejs/kit";
import parseMD from "parse-md";
import { loadMei } from "../../../utils/loadFunctions.js";


export async function load({ fetch, params }) {
  let view = views.find((view) => view.slug === params.view);
  let listSections = [];

  if (!view) throw error(404, `${params.view} does not exist`);

  // get list of sections
  // import.meta.glob does not allow for dynamic variables in the search path, so it needs a switch statement to adjust based on the selected view
  // will need to be adapted if different/more views are necessary
  console.log(view.slug);
  switch (view.slug) {
    case "literature":
      listSections = import.meta.glob("/static/content/literature/*.md", {
        as: "raw",
        eager: true,
      });
      break;
    case "science":
      listSections = import.meta.glob("/static/content/science/*.md", {
        as: "raw",
        eager: true,
      });
      break;
    case "music":
      listSections = import.meta.glob("/static/content/music/*.md", {
        as: "raw",
        eager: true,
      });
      break;
    case "connections":
      listSections = import.meta.glob(
        "/static/content/connections/*.md",
        { as: "raw", eager: true }
      );
      break;
    default:
      throw error(404, `${view} does not exist;`);
      break;
  }

  // iterate through the list of sections and add it to the `data.js` data
  let sections = {};
  for (const path in listSections) {
    const { metadata, content } = parseMD(listSections[path]);
    sections[metadata.title] = { ...metadata, content: content };
  }

  // add section metadata and data to export view
  view["sections"] = sections;

  // TEST CETEICEAN
  // This would be necessary for a more granular approach to implement CETEIcean, but is not needed for the simple approach;
  // let tei = '';
  // let teiString = '';
  // if (view.slug === 'literature') {
  //   // Get the content of the TEI file into a string
  //   teiString = await fetch("literature/data/test2.xml")
  //     .then(function(response) {
  //       if (response.ok) {
  //         return response.text();
  //       }
  //     });

  //   tei = transformTEI(teiString);

  // }

  // Load MEI if in the music view
  if (view.slug === 'music') {
    // fetch MEI file, convert to string;
    let meiString = await fetch('music/data/CRIM_Model_0001.mei')
    .then(function(response) {
        if (response.ok) {
        return response.text();
        };
    });
    // load mei into verovio, generate SVG and MIDI
    let mei = await loadMei(meiString);

    // if the transformation was successful, add mei to data.view
    if (mei) {
      view["mei"] = {...mei};
    }
  }

  if (view.slug === 'connections') {
    // load the buzzword mds
    let listBuzzWords = import.meta.glob('/static/content/connections/buzzwords/*.md', {as: 'raw', eager: true});
    let buzzwords = []
    for (const buzz in listBuzzWords) {
      const {metadata, content} = parseMD(listBuzzWords[buzz]);
      if (metadata.tags) {
        // splits the tags into an array, ensuring they are all lowercase
        metadata.tags = metadata.tags.toLowerCase().split(', ');
      }
      buzzwords.push({...metadata, content: content});
    }
    view['buzzwords'] = buzzwords;
  }

  return {
    view /*, tei, teiString */
  };
}
