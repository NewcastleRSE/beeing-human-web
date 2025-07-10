import { csvParse } from 'd3';

export async function load({ fetch }) {
    const res = await fetch('https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/refs/heads/data-analysis/data-analysis/cross-refs.csv');
    if (res.ok) {
        const data = await res.text();

        // Building a network chart requires information on nodes and links. This information can be stored in many different format as described here. Json format is the most convenient way to work with d3.js and looks basically like that:

        // { "nodes": [
        //   { "id": 1, "name": "A" },
        //   { "id": 2, "name": "B" }
        // ],
        // "links": [
        //   { "source": 1, "target": 2 }
        // ]}
        // https://d3-graph-gallery.com/network.html 

        // parse the data into JSON
        let parsedData = csvParse(data, (d) => d);

        // find unique values for source
        let uniqueSources = [...new Set(parsedData.map(d => d.source))];

        // turn unique sources into an array of objects with "id" and "name" properties
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

        // create an object that orders the nodes by number of outbound links
        let nodesByOutlinks = nodeLinks.nodes.map(node => {
            // count the number of links where this node is the source
            let outboundCount = nodeLinks.links.filter(link => link.source === node.id).length;
            // return a new object with the node's properties and the outbound count
            return { ...node, outboundCount };
        });

        // create an object that orders the nodes by number of inbound links
        let nodesByInlinks = nodeLinks.nodes.map(node => {
            // count the number of links where this node is the target
            let inboundCount = nodeLinks.links.filter(link => link.target === node.id).length;
            // return a new object with the node's properties and the inbound count
            return { ...node, inboundCount };
        });

        // create an object that orders the notes by the number of internal links
        let nodesByInternalLinks = nodeLinks.nodes.map(node => {
            // count the number of links where this node is both the source and target
            let internalCount = nodeLinks.links.filter(link => link.source === node.id && link.target === node.id).length;
            // return a new object with the node's properties and the internal count
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

        // create a matrix that counts the number of links between each two nodes in which each row will represent a source node and each column a target node
        // and the value will be the number of links between them
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
        
        


        return { xreferences: { ...nodeLinks }, 
                 nodesLinksCount: nodesLinksCount,
                 flowMatrix: {matrix: matrix, labels: labels} };
    } else {
        return { error: 'Failed to load content' };
    }
}