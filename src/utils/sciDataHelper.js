export function getMean(dataArray) {
    const n = dataArray.length;
    return dataArray.reduce((a, b) => a + b) / n
}

export function getStdDeviation(mean, dataArray) {
    const n = dataArray.length;
    return Math.sqrt(dataArray.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export function getStdError(stdDeviation, dataArray) {
    const n = dataArray.length;
    return stdDeviation / Math.sqrt(n);
}

export function getGroups(group, dataset) {
    // group is the column that contains the selector
    let result = new Set(dataset.map(entry => entry[group]))
    return ['All', ...result]
}

export function getExperimentBees(rawData, tGroup, cue) {
    // for a particular data point, retrieve a list of bees
    let fData = rawData.filter((entry) => (entry['Treatment group'] === tGroup && entry[cue] === '1'));
    return fData.map((e) => e['Bee Id']);
}