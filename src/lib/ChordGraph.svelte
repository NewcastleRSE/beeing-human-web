<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    let { inputData, graphId = "chord-graph-" + Math.random().toString(36).slice(2, 10) } = $props();

    const colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#FFD700", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#9edae5"
    ];

    let svg;
    let container;
    let width = 800;
    let height = 800;
    let radius = 350;

    function getContainerSize() {
        if (container) {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            radius = Math.min(width, height) / 2 - 40; // leave some margin
        }
    }

    onMount(() => {
        getContainerSize();
        window.addEventListener("resize", handleResize);
        if (container) buildGraph();
        return () => window.removeEventListener("resize", handleResize);
    });

    function handleResize() {
        d3.select(`#${graphId} svg`).remove();
        getContainerSize();
        buildGraph();
    }

    function buildGraph() {
        d3.select(`#${graphId}`).selectAll("svg").remove();

        svg = d3
            .select(`#${graphId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        var res = d3
            .chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending)(inputData.matrix);

        // Add groups (arcs)
        const group = svg.datum(res)
            .append("g")
            .selectAll("g")
            .data(d => d.groups)
            .enter()
            .append("g")
            .attr("class", "chord-group");

        group.append("path")
            .style("fill", (d, i) => colors[i])
            .style("stroke", "black")
            .attr("d", d3.arc().innerRadius(radius - 30).outerRadius(radius - 10));

        // Add group labels
        group.append("text")
            .each(function (d, i) {
                const angle = (d.startAngle + d.endAngle) / 2;
                const x = Math.sin(angle) * (radius + 20);
                const y = -Math.cos(angle) * (radius + 20);
                d3.select(this)
                    .attr("x", x)
                    .attr("y", y)
                    .attr("text-anchor", angle > Math.PI ? "end" : "start")
                    .attr("alignment-baseline", "middle")
                    .attr("transform", `rotate(${(angle * 180) / Math.PI},${x},${y})`)
                    .text(inputData.labels ? inputData.labels[i] : `Group ${i + 1}`)
                    .style("font-size", "1.2em")
                    .style("fill", "#222");
            });

        // Add ribbons (connections)
        const ribbons = svg.datum(res)
            .append("g")
            .selectAll("path.chord-ribbon")
            .data(d => d)
            .enter()
            .append("path")
            .attr("class", "chord-ribbon")
            .attr("d", d3.ribbon().radius(radius - 30))
            .style("fill", d => colors[d.source.index])
            .style("stroke", "black")
            .style("opacity", 1);

        // --- Hover effects (as before) ---
        ribbons.on("mouseover", function(event, d) {
            const sourceIndex = d.source.index;
            ribbons.transition().duration(200)
                .style("opacity", r => r.source.index === sourceIndex ? 1 : 0.1);

            const targetIndices = new Set(
                res.filter(r => r.source.index === sourceIndex).map(r => r.target.index)
            );
            targetIndices.add(sourceIndex);

            group.transition().duration(200)
                .style("opacity", (g, i) => targetIndices.has(i) ? 1 : 0.1);

            group.select("path")
                .transition().duration(200)
                .style("stroke-width", (g, i) => i === sourceIndex ? "4px" : "1px");
        });

        ribbons.on("mouseout", function() {
            ribbons.transition().duration(200).style("opacity", 1);
            group.transition().duration(200).style("opacity", 1);
            group.select("path")
                .transition().duration(200)
                .style("stroke-width", "1px");
        });

        group.on("mouseover", function(event, d) {
            const groupIndex = d.index;
            const connectedGroups = new Set([groupIndex]);
            res.forEach(ribbon => {
                if (ribbon.source.index === groupIndex) connectedGroups.add(ribbon.target.index);
                if (ribbon.target.index === groupIndex) connectedGroups.add(ribbon.source.index);
            });

            ribbons.transition().duration(200)
                .style("opacity", r =>
                    r.source.index === groupIndex || r.target.index === groupIndex ? 1 : 0.1
                );

            group.transition().duration(200)
                .style("opacity", (g, i) => connectedGroups.has(i) ? 1 : 0.1);

            d3.select(this).select("path")
                .transition().duration(200)
                .style("stroke-width", "4px");
        });

        group.on("mouseout", function(event, d) {
            ribbons.transition().duration(200).style("opacity", 1);
            group.transition().duration(200).style("opacity", 1);
            d3.select(this).select("path")
                .transition().duration(200)
                .style("stroke-width", "1px");
        });
    }
</script>

<div id={graphId} bind:this={container} class="w-full h-[70vh] min-h-[400px]"></div>
