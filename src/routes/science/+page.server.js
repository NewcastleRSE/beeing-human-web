import { getFileNameFromPath } from '../../utils/stringOperations.js';
import { base } from '$app/paths';
import parseMD from 'parse-md';
import { csvParse } from 'd3';
import {getMean, getStdDeviation, getStdError, getGroups} from '../../utils/sciDataHelper.js'


export async function load({ fetch }) {
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
        let desc = await fetch(`${base}/content/science/data/${fileName}`).then(function (response) {
            if (response.ok) {
                return response.text()
            }
        });
        desc = parseMD(desc);

        // reads the csv file as a string
        let csvString = await fetch(`${base}/content/science/data/${desc.metadata.data}`).then(function (response) {
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

                    summaryData.push({ 'Treatment group': group, cue, mean, stdDeviation, stdError })
                }
            }
        }

        // adds dataset to dataset array
        datasets.push({ data: datasetJson, columns: datasetJson.columns, summaryData: summaryData, summaryColumns: ['Treatment group', 'cue', 'mean', 'stdDeviation', 'stdError'], desc });
    }

    return { datasets }
}