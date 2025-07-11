<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    let { inputData } = $props();

    let container;
    let width = 800;
    let height = 800;

    function getContainerSize() {
        if (container) {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
        }
    }

    onMount(() => {
        getContainerSize();
        window.addEventListener("resize", handleResize);
        if (document.getElementById("network-graph")) {
            buildGraph();
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    function handleResize() {
        // Remove old SVG and redraw with new size
        d3.select("#network-graph svg").remove();
        getContainerSize();
        buildGraph();
    }

    function buildGraph() {
        var margin = { top: 10, right: 30, bottom: 30, left: 40 },
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom;

        var svg = d3
            .select("#network-graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function getMultiLinks(links) {
            const map = {};
            links.forEach((link) => {
                const key =
                    link.source < link.target
                        ? link.source + "|" + link.target
                        : link.target + "|" + link.source;
                if (!map[key]) map[key] = [];
                map[key].push(link);
            });
            return map;
        }

        const multiLinks = getMultiLinks(inputData.links);

        inputData.links.forEach((link) => {
            const key =
                link.source < link.target
                    ? link.source + "|" + link.target
                    : link.target + "|" + link.source;
            link.multiIndex = multiLinks[key].indexOf(link);
            link.multiTotal = multiLinks[key].length;
        });

        // Draw links as paths
        var link = svg
            .selectAll("path.link")
            .data(inputData.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .style("stroke", "#aaa")
            .style("fill", "none")
            .style("stroke-width", function (d) {
                return d.count ? Math.max(1, d.count) : 1;
            });

        // Draw nodes
        var node = svg
            .selectAll("circle")
            .data(inputData.nodes)
            .enter()
            .append("circle")
            .attr("r", 40)
            .attr("class", "node")
            .style("fill", "#69b3a2");

        // Draw labels
        var label = svg
            .selectAll("text")
            .data(inputData.nodes)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .attr("class", "nodelabel")
            .text(function (d) {
                return d.label || d.id;
            });

        // Build a map for fast lookup of node connections
        const linkedByIndex = {};
        inputData.links.forEach(function (d) {
            linkedByIndex[d.source + "," + d.target] = true;
            linkedByIndex[d.target + "," + d.source] = true;
        });

        function isConnected(a, b) {
            return (
                a === b ||
                linkedByIndex[a.id + "," + b.id] ||
                linkedByIndex[b.id + "," + a.id]
            );
        }

        // Highlight logic with subtle animation
        // Helper to highlight nodes, labels, and links
        function highlightNodeAndConnections(d) {
            const connectedIds = new Set();
            inputData.links.forEach(link => {
                if (link.source.id === d.id) connectedIds.add(link.target.id);
                if (link.target.id === d.id) connectedIds.add(link.source.id);
            });
            connectedIds.add(d.id);

            node.transition()
                .duration(250)
                .style("opacity", o => connectedIds.has(o.id) ? 1 : 0.2);

            label.transition()
                .duration(250)
                .style("opacity", o => connectedIds.has(o.id) ? 1 : 0.2);

            link.transition()
                .duration(250)
                .style("stroke", l => l.source.id === d.id || l.target.id === d.id ? "#d62728" : "#aaa")
                .style("opacity", l => l.source.id === d.id || l.target.id === d.id ? 1 : 0.2);
        }

        function resetHighlight() {
            node.transition().duration(250).style("opacity", 1);
            label.transition().duration(250).style("opacity", 1);
            link.transition().duration(250).style("stroke", "#aaa").style("opacity", 1);
        }

        // Attach to both node and label
        node.on("mouseover", function (event, d) {
            highlightNodeAndConnections(d);
        });
        node.on("mouseout", function () {
            resetHighlight();
        });
        label.on("mouseover", function (event, d) {
            highlightNodeAndConnections(d);
        });
        label.on("mouseout", function () {
            resetHighlight();
        });

        var simulation = d3
            .forceSimulation(inputData.nodes)
            .force(
                "link",
                d3
                    .forceLink()
                    .id(function (d) {
                        return d.id;
                    })
                    .links(inputData.links),
            )
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2))
            .on("end", ticked);

        function ticked() {
            link.attr("d", function (d) {
                const dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr =
                        Math.sqrt(dx * dx + dy * dy) *
                        (1 + (d.multiIndex - (d.multiTotal - 1) / 2) * 0.3);
                return (
                    "M" +
                    d.source.x +
                    "," +
                    d.source.y +
                    "A" +
                    dr +
                    "," +
                    dr +
                    " 0 0,1 " +
                    d.target.x +
                    "," +
                    d.target.y
                );
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
<div id="network-graph" bind:this={container} class="w-full h-[70vh] min-h-[400px]"></div>
