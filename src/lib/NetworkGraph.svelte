<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    let { inputData } = $props();

    onMount(() => {
        // chech to see if #network-graph is already present
        if (document.getElementById("network-graph")) {
            buildGraph();
        }
    });

    function buildGraph() {
        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 30, left: 40 },
            width = 800 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3
            .select("#network-graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")",
            );

        // Initialize the links
        var link = svg
            .selectAll("line")
            .data(inputData.links)
            .enter()
            .append("line")
            .style("stroke", "#aaa");

        // Initialize the nodes (circles)
        var node = svg
            .selectAll("circle")
            .data(inputData.nodes)
            .enter()
            .append("circle")
            .attr("r", 40)
            .style("fill", "#69b3a2");

        // Initialize the labels
        var label = svg
            .selectAll("text")
            .data(inputData.nodes)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(function (d) {
                return d.label || d.id;
            }); // Use d.label if available, else d.id

        // Let's list the force we wanna apply on the network
        var simulation = d3
            .forceSimulation(inputData.nodes) // Force algorithm is applied to data.nodes
            .force(
                "link",
                d3
                    .forceLink() // This force provides links between nodes
                    .id(function (d) {
                        return d.id;
                    }) // This provide  the id of a node
                    .links(inputData.links), // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-3000)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
            .on("end", ticked);

        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d) {
                    return d.x + 6;
                })
                .attr("cy", function (d) {
                    return d.y - 6;
                });

            label
                .attr("x", function (d) {
                    return d.x + 6;
                })
                .attr("y", function (d) {
                    return d.y - 6;
                });
        }
    }
</script>

<h2 class="h2 my-4">Network Graph</h2>
<div id="network-graph"></div>
