<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    let { inputData } = $props();

    // Move colors array outside the function so it's accessible in markup
    const colors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#FFD700",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
        "#9edae5",
    ];

    onMount(() => {
        // Check if the #chord-graph element is already present
        if (document.getElementById("chord-graph")) {
            buildGraph();
        }
    });

    function buildGraph() {
        // 11 groups, so create a vector of 11 different colors

        // create the svg area
        var svg = d3
            .select("#chord-graph")
            .append("svg")
            .attr("width", 1300)      // Increased width for label space
            .attr("height", 1300)     // Increased height for label space
            .append("g")
            .attr("transform", "translate(650,650)"); // Center the graph

        // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
        var res = d3
            .chord()
            .padAngle(0.05) // padding between entities (black arc)
            .sortSubgroups(d3.descending)(inputData.matrix);

        // add the groups on the outer part of the circle
        svg.datum(res)
            .append("g")
            .selectAll("g")
            .data(function (d) {
                return d.groups;
            })
            .enter()
            .append("g")
            .each(function (d, i) {
                // Draw the arc
                d3.select(this)
                    .append("path")
                    .style("fill", colors[i])
                    .style("stroke", "black")
                    .attr("d", d3.arc().innerRadius(520).outerRadius(540));

                // Add the label
                const angle = (d.startAngle + d.endAngle) / 2;
                const x = Math.sin(angle) * 570; // 570 is just outside the arc
                const y = -Math.cos(angle) * 570;
                d3.select(this)
                    .append("text")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("text-anchor", angle > Math.PI ? "end" : "start")
                    .attr("alignment-baseline", "middle")
                    .attr("transform", `rotate(${(angle * 180) / Math.PI},${x},${y})`)
                    .text(inputData.labels ? inputData.labels[i] : `Group ${i + 1}`)
                    .style("font-size", "1.5em") // Larger font for readability
                    .style("fill", "#222");
            });

        // Add the links between groups
        svg.datum(res)
            .append("g")
            .selectAll("path")
            .data(function (d) {
                return d;
            })
            .enter()
            .append("path")
            .attr("d", d3.ribbon().radius(520)) // Increased radius
            .style("fill", function (d) {
                return colors[d.source.index];
            })
            .style("stroke", "black");
    }
</script>

<h2 class="h2 my-4">Chord Graph</h2>
<div class="flex flex-row items-start gap-8">
    <div id="chord-graph"></div>
    {#if inputData.labels}
        <div class="bg-white rounded-lg shadow p-6 mt-8 min-w-[220px]">
            <h3 class="font-bold mb-4 text-lg">Legend</h3>
            <ul class="space-y-3">
                {#each inputData.labels as label, i}
                    <li class="flex items-center space-x-3">
                        <span class="inline-block w-6 h-6 rounded-full border border-gray-300" style="background:{colors[i]}"></span>
                        <span class="text-base">{label}</span>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
