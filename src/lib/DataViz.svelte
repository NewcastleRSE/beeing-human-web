<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import {removeSpaces} from '../utils/stringOperations';
    export let dataObject = undefined;
    export let selected = undefined;
    export let name;

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
    
    let svg = undefined;
    let colour = undefined;
    let x;
    let y;
    let tooltip;

    let loaded = false;

    function update(newSelection) {
        // to avoid clearing the graph on mounting
        if (loaded) {
            let filteredData = undefined;
            // clear all previously drawn data and labels
            svg.selectAll('.data').remove();

            // filter dataset with new selection
            if (newSelection === 'All') {
                filteredData = dataObject.data;
            } else {
                filteredData = dataObject.data.filter((entry) => (entry['Treatment group'] === selected))
            }
            addData(filteredData)
        }
    }

    // hovering functions -- data points
    var mouseover = function(event, d) {
        tooltip.style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }

    let mousemove = function(event, d) {
        let tip = `<p><span class="tooltip-label font-medium">Mean:</span> <span class="tooltip-value font-light">${d.mean}</span></p>
            <p><span class="tooltip-label font-medium">Standard Deviation:</span> <span class="tooltip-value font-light">${d.stdDeviation}</span></p>
            <p><span class="tooltip-label font-medium">Standard Error:</span> <span class="tooltip-value font-light">${d.stdError}</span></p>`
        tooltip.html(tip)
            .style("left", (event.pageX+70) + "px")
            .style("top", (event.pageY) + "px")
    }

    let mouseleave = function(event, d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    $: update(selected);

    // based on this: https://d3-graph-gallery.com/graph/line_basic.html

    function addData(data) {
        // trying to plot a single group first
        // data = data.filter((entry) => (entry['Treatment group'] === 'Free-flying (control)'))

        let dataGroup = d3.group(data, d => d['Treatment group']);

        let lineData = svg.append('g').attr('class', 'line-data data');
        // Add the line
        lineData.selectAll(".line-data")
        .data(dataGroup)
        .join('path')
            .attr("fill", "none")
            .attr("stroke", function(d) { return colour(d[0])})
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(function(d) { return x(d.cue) })
                    .y(function(d) { return y(d.mean) })
                    (d[1])
                }
            )

        let dataPoint = svg.append('g').attr('class', 'point-data data');
        
        // Add the points
        dataPoint.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.cue) } )
            .attr("cy", function(d) { return y(d.mean) } )
            .attr("r", 5)
            .attr("fill", function (d)  {return colour(d['Treatment group'])})
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)

        // draw error lines
        let errorLines = dataPoint.append('g').attr('class', 'error-data data');
        // line itself
        errorLines.selectAll('line-error')
            .data(data)
            .attr('class', 'error')
            .enter()
            .append('line')
                .attr('x1', function(d) { return x(d.cue); })
                .attr('x2', function(d) { return x(d.cue); })
                .attr('y1', function(d) { return y(d.mean + d.stdError); })
                .attr('y2', function(d) { return y(d.mean - d.stdError); })
                .attr("stroke", function (d)  {return colour(d['Treatment group'])})

        // bottom termination line
        errorLines.selectAll('line-error')
            .data(data)
            .attr('class', 'error')
            .enter()
            .append('line')
                .attr('x1', function(d) { return x(d.cue) -5; })
                .attr('x2', function(d) { return x(d.cue) + 5; })
                .attr('y1', function(d) { return y(d.mean - d.stdError); })
                .attr('y2', function(d) { return y(d.mean - d.stdError); })
                .attr("stroke", function (d)  {return colour(d['Treatment group'])});

        // top termination line
        errorLines.selectAll('line-error')
            .data(data)
            .attr('class', 'error')
            .enter()
            .append('line')
                .attr('x1', function(d) { return x(d.cue) -5; })
                .attr('x2', function(d) { return x(d.cue) + 5; })
                .attr('y1', function(d) { return y(d.mean + d.stdError); })
                .attr('y2', function(d) { return y(d.mean + d.stdError); })
                .attr("stroke", function (d)  {return colour(d['Treatment group'])})

        // Add legend
        // Add one dot in the legend for each name.
        let labels = svg.append('g').attr('class', 'labels-data data');
        labels.selectAll("dots-labels")
        .data(new Set(data.map((e) => (e['Treatment group']))))
        .enter()
        .append("circle")
            .attr("cx", width-270)
            .attr("cy", function(d,i){ return 50 + i*30}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", function(d){ return colour(d)})
        labels.selectAll('labels')
            .data(new Set(data.map((e) => (e['Treatment group']))))
            .enter()
            .append('text')
                .attr("x", width-250)
                .attr("y", function(d,i){ return 50 + i*30}) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", function(d) { return colour(d)})
                .text(function(d){ return d})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
        
    }

    onMount(async () => {
        // append the svg object to the body of the page
        svg = d3.select(`#line-graph-${removeSpaces(name)}`)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // create a tooltip
        tooltip = d3.select(`#tooltip-${removeSpaces(name)}`)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position", 'absolute')
        
        // add X axis
        x = d3.scalePoint()
            .domain(dataObject.data.map((e) => (e.cue)))
            .range([0, width]);
        svg.append('g').attr('transform', "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        y = d3.scaleLinear()
            .domain([0, d3.max(dataObject.data.map((e) => (e.mean)))])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // colour pallette
        colour = d3.scaleOrdinal()
            .domain(dataObject.data.map((e) => (e['Treatment group'])))
            .range(['#e41a1c','#377eb8','#4daf4a']);

        loaded = true;
        update(selected);
    })

</script>

{#if dataObject.data == undefined || dataObject.labels == undefined}
    <p>No data passed</p>
{:else}
    <div id="line-graph-{removeSpaces(name)}">
        <div id="tooltip-{removeSpaces(name)}" class="text-sm"></div>
    </div>
{/if}