import { views } from "../data.js";
import { error } from "@sveltejs/kit";
import parseMD from "parse-md";
import { loadMei } from "../../../utils/loadFunctions.js";
import {getMean, getStdDeviation, getStdError, getGroups} from '../../../utils/sciDataHelper.js'
import { base } from "$app/paths";
import { getFileNameFromPath, getListOfUniqueElements } from "../../../utils/stringOperations.js";
import { csvParse } from 'd3'


export async function load({ fetch, params }) {
  let view = views.find((view) => view.slug === params.view);
  let listSections = [];

  if (!view) throw error(404, `${params.view} does not exist`);

  // get list of sections
  // import.meta.glob does not allow for dynamic variables in the search path, so it needs a switch statement to adjust based on the selected view
  // will need to be adapted if different/more views are necessary
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

  // Load MEI if in the music view
  if (view.slug === 'music') {
    // fetch MEI file, convert to string;
    let url = `${base}/content/${view.slug}/data/CRIM_Model_0001.mei`;
    let meiString = await fetch(url)
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
    tags = getListOfUniqueElements(tags);
    view['buzzwords'] = buzzwords;
    view['buzzwordTags'] = tags;

    // create a list of authors
    let authors = getListOfUniqueElements(buzzwords.map(entry => entry.author));
    view['buzzwordAuthors'] = authors;
  }

  if (view.slug === 'science') {
    let datasets = [];
    // this should probably be a loop if we're loading more than one dataset at the same time

    // read all experiment descriptions
    let expDesc = import.meta.glob("/static/content/science/data/*.md", {
      as: "raw",
      eager: true,
    });

    for (let experiment in expDesc) {
      // read and parse .md
      // reads the .md with the experiment description
      const fileName = getFileNameFromPath(experiment)
      let desc = await fetch(`${base}/content/${view.slug}/data/${fileName}`).then( function (response) {
        if (response.ok) {
          return response.text()
        }
      });
      desc = parseMD(desc);

      // reads the csv file as a string
      let csvString = await fetch(`${base}/content/${view.slug}/data/${desc.metadata.data}`).then( function (response) {
        if (response.ok) {
          return response.text()
        }
      });

      // parses csv into JSON
      let datasetJson = csvParse(csvString, (e) => (e))

      let summaryData = [];
      // build summary statistics for each treatment group/cue group pair
      let cues = [
          "Positive",
          "Near Positive",
          "Medium",
          "Near Negative",
          "Negative",
      ];

      let groups = getGroups('Treatment group', datasetJson)

      for (let group of groups) {
          if (group != 'All') {
              let data_grouped = datasetJson.filter((entry) => entry['Treatment group'] === group)
              for (let cue of cues) {
                  // put this into an object, calculate mean standard deviation, standard error
                  let dataArray = data_grouped.map((entry) => (parseInt(entry[cue])))
                  let mean = getMean(dataArray);
                  let stdDeviation = getStdDeviation(mean, dataArray)
                  let stdError = getStdError(stdDeviation, dataArray);

                  summaryData.push({'Treatment group': group, cue, mean, stdDeviation, stdError})
              }   
          }
      }

      // adds dataset to dataset array
      datasets.push({data: datasetJson, columns: datasetJson.columns, summaryData: summaryData, summaryColumns: ['Treatment group', 'cue', 'mean', 'stdDeviation', 'stdError'], desc});
    }    

    // adds dataset array to view variable
    view['datasets'] = datasets;
  }

  return {
    view /*, tei, teiString */
  };
}
