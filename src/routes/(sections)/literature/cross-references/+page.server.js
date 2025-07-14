import { csvParse } from 'd3';

async function processCrossRefCSV(url) {
    const res = await fetch(url);
    if (!res.ok) return { error: 'Failed to load content' };

    const data = await res.text();
    let parsedData = csvParse(data, (d) => d);

    // find unique values for source
    let uniqueSources = [...new Set(parsedData.map(d => d.source))];
    let sources = uniqueSources.map(source => ({ id: source, name: source }));

    // extract the data array in parsedData and edit each entry to include source and destination, but renaming 'destination' to 'target'
    let xreferences = parsedData.map(entry => ({
        source: entry.source,
        target: entry.destination,
    }));

    // build the node links object
    let nodeLinks = {
        nodes: sources,
        links: xreferences
    };

    // create an object that orders the nodes by number of outbound links to other nodes
    let nodesByOutlinks = nodeLinks.nodes.map(node => {
        let outboundCount = nodeLinks.links.filter(link => link.source === node.id && link.target !== node.id).length;
        return { ...node, outboundCount };
    });

    // create an object that orders the nodes by number of inbound links from other nodes
    let nodesByInlinks = nodeLinks.nodes.map(node => {
        let inboundCount = nodeLinks.links.filter(link => link.target === node.id && link.source !== node.id).length;
        return { ...node, inboundCount };
    });

    // create an object that orders the notes by the number of internal links
    let nodesByInternalLinks = nodeLinks.nodes.map(node => {
        let internalCount = nodeLinks.links.filter(link => link.source === node.id && link.target === node.id).length;
        return { ...node, internalCount };
    });

    // merge the counts into a single object for each node
    let nodesLinksCount = nodesByOutlinks.map(node => {
        let inlinkNode = nodesByInlinks.find(n => n.id === node.id) || { inboundCount: 0 };
        let internalNode = nodesByInternalLinks.find(n => n.id === node.id) || { internalCount: 0 };
        return {
            ...node,
            inboundCount: inlinkNode.inboundCount,
            internalCount: internalNode.internalCount
        };
    });

    // create a matrix that counts the number of links between each two nodes
    let labels = nodeLinks.nodes.map(node => node.name);
    let matrix = [];
    for (let i = 0; i < nodeLinks.nodes.length; i++) {
        let row = [];
        for (let j = 0; j < nodeLinks.nodes.length; j++) {
            let sourceNode = nodeLinks.nodes[i].id;
            let targetNode = nodeLinks.nodes[j].id;
            let count = nodeLinks.links.filter(link => link.source === sourceNode && link.target === targetNode).length;
            row.push(count);
        }
        matrix.push(row);
    }

    return {
        xreferences: { ...nodeLinks },
        nodesLinksCount: nodesLinksCount,
        flowMatrix: { matrix: matrix, labels: labels }
    };
}

async function fetchClassicalAuthors(url) {
    const res = await fetch(url);
    if (!res.ok) return { error: 'Failed to load content' };

    const data = await res.text();
    let parsedData = csvParse(data, (d) => d);

    // find unique values for source and target
    let uniqueSources = [...new Set(parsedData.map(d => d.source))];
    let uniqueTargets = [...new Set(parsedData.map(d => d.target))];

    // join the two arrays to create a combined list of authors
    let nodes = [...new Set([...uniqueSources, ...uniqueTargets])].map(author => ({
        id: author,
        name: author
    }));

    // extract the data array in parsedData and edit each entry to include source and destination, but renaming 'destination' to 'target'
    let xreferences = parsedData.map(entry => ({
        source: entry.source,
        target: entry.target,
    }));

    // build the node links object
    let nodeLinks = {
        nodes: nodes,
        links: xreferences
    };

    return {
        classicalXreferences: { ...nodeLinks }
    }

}

export async function load({ fetch }) {
    // List of CSV URLs to process
    const urls = [
        'https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/data-analysis/data-analysis/cross-refs-1623.csv',
        'https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/data-analysis/data-analysis/cross-refs-1609.csv'
        // Add more URLs here as needed
    ];

    const classicalUrls = [
        'https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/data-analysis/data-analysis/classical-refs-1623.csv',
        'https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/data-analysis/data-analysis/classical-refs-1609.csv'
    ];

    // Process all files in parallel
    const results = await Promise.all(urls.map(url => processCrossRefCSV(url)));
    const classicalResults = await Promise.all(classicalUrls.map(url => fetchClassicalAuthors(url)));

    // You can return all results, or just the first if only one file is used
    // Here, return an object keyed by file index (or you could use a label)

    return {
        datasets: results,
        classicalDatasets: classicalResults,
    };
}