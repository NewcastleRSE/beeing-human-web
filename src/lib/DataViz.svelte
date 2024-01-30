<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import {makeHtmlId} from '../utils/stringOperations';
    import {getExperimentBees} from '../utils/sciDataHelper'
    import { SlideToggle } from '@skeletonlabs/skeleton';

    export let dataObject = undefined;
    export let selected = undefined;
    export let name;
    export let rawData = undefined;

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
    
    let svg = undefined;
    let colour = undefined;
    let x;
    let y;
    let tooltip;
    let showErrorBars = true;

    let loaded = false;
    // Error codes
    // 0 = All good
    // 1 = Error in update()
    // 2 = Error in toggleErrorBars();
    // 3 = Error in onMount();
    // 4 = Error in addData();
    let errorCode = 0;

    function update(newSelection) {
        // to avoid clearing the graph on mounting
        try {
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
        } catch(err) {
            console.log('Update error: \n', err);
            errorCode = 1;
        }
    }

    // hovering functions -- data points
    var dpMouseover = function(event, d) {
        tooltip = d3.select(`#tooltip-${makeHtmlId(name)}`)
        tooltip.classed("opacity-0", false);
        d3.select(this)
            .classed("stroke-black", true)
            .classed("opacity-100", true)
            .classed("opacity-75", false);
    }

    let dpMousemove = function(event, d) {
        tooltip = d3.select(`#tooltip-${makeHtmlId(name)}`)
        let beeList = getExperimentBees(rawData, d['Treatment group'], d.cue);
        let beeListUl =''
        for (let bee of beeList) {
            beeListUl += `<li>${bee}</li>`
        }
        let tip = `<p><span class="tooltip-label font-medium">Mean:</span> <span class="tooltip-value font-light">${d.mean}</span></p>
            <p><span class="tooltip-label font-medium">Standard Deviation:</span> <span class="tooltip-value font-light">${d.stdDeviation}</span></p>
            <p><span class="tooltip-label font-medium">Standard Error:</span> <span class="tooltip-value font-light">${d.stdError}</span></p>
            <hr/>
            <p><span class="tooltip-label font-medium">Bees: </span>
                <ul class="indent-2">${beeListUl}</ul>
            </p>`
        tooltip.html(tip).classed(`left-${event.pageX+70}`, true)
            .classed(`top-${event.pageY}`, true)
    }

    let dpMouseleave = function(event, d) {
        tooltip = d3.select(`#tooltip-${makeHtmlId(name)}`)
        tooltip.html('')
            .classed("opacity-0", true)
        d3.select(this)
            .classed("stroke-black", false)
            .classed("opacity-100", false)
            .classed("opacity-75", true)
    }

    // hovering functions -- labels
    let labelMouseover = function (event, d) {
        // context
        let context = d3.select(`div#line-graph-${makeHtmlId(name)}`);

        // labels
        let labels = context.select('g.labels-data')
        labels.selectAll('text').style('font-weight', 'lighter');
        d3.select(this)
            .style('font-weight', 'bold')
        
        // paths
        let paths = context.selectAll('path.line-data');
        paths.attr('stroke-width', 0.5);

        // error bars
        let errorBars = context.selectAll('.error-data')
        errorBars.selectAll('line').attr('stroke-width', 0.5);
    }
    
    let labelMousemove = function (event, d) {
        // context
        let context = d3.select(`div#line-graph-${makeHtmlId(name)}`);

        // paths
        let pathsGroup = context.selectAll('g.line-data');
        let pathId = `path#${makeHtmlId(d)}-path`;
        pathsGroup.selectAll(pathId).attr('stroke-width', 2.5);

        // error bars
        let errorBars = context.selectAll('.error-data');
        errorBars.selectAll(`.${makeHtmlId(d)}`).attr('stroke-width', 2);
    }

    let labelMouseleave = function (event, d) {
        // context
        let context = d3.select(`div#line-graph-${makeHtmlId(name)}`);

        // labels
        let labels = context.select('g.labels-data')
        labels.selectAll('text').style('font-weight', 'normal');
        d3.select(this)
            .style('font-weight', 'normal')

        // paths
        let paths = context.selectAll('path.line-data');
        paths.attr('stroke-width', 1.5);

        // error bars
        let errorBars = context.selectAll('.error-data')
        errorBars.selectAll('line').attr('stroke-width', 1);
    }

    // clicking functions -- labels
    let labelClick = function (event, d) {
        selected = d;
    }

    // hovering functions -- lines
    let lineMouseover = function (event, d) {
        labelMouseover(event, d[0]);
        
        // context
        let context = d3.select(`div#line-graph-${makeHtmlId(name)}`);
        
        context.selectAll('text')
            .filter(function(){ 
                return d3.select(this).text() == d[0]
        })
        .style("font-weight", "bold");
    }

    let lineMousemove = function (event, d) {
        labelMousemove(event, d[0]);
    }

    let lineMouseleave = function (event, d) {
        // context
        let context = d3.select(`div#line-graph-${makeHtmlId(name)}`);

        context.selectAll('text').attr('font-weight', 'normal');
        labelMouseleave(event, d[0]);
    }

    let lineClick = function (event, d) {
        labelClick(event, d[0]);
    }

    $: update(selected);
    $: toggleErrorBars(showErrorBars);

    // based on this: https://d3-graph-gallery.com/graph/line_basic.html

    function addData(data) {

        let dataGroup = d3.group(data, d => d['Treatment group']);

        try {
            let lineData = svg.append('g').attr('class', 'line-data data');
            lineData.attr('data-testid', 'line-data')
            // Add the line
            lineData.selectAll(".line-data")
            .data(dataGroup)
            .join('path')
            .on('mouseover', lineMouseover)
            .on('mousemove', lineMousemove)
            .on('mouseleave', lineMouseleave)
            .on('click', lineClick)
                .attr("fill", "none")
                .attr("stroke", function(d) { return colour(d[0])})
                .attr("stroke-width", 1.5)
                .attr('id', function(d) {return `${makeHtmlId(d[0])}-path`})
                .attr('class', 'line-data')
                .attr("d", function (d) {
                    return d3.line()
                        .x(function(d) { return x(d.cue) })
                        .y(function(d) { return y(d.mean) })
                        (d[1])
                    }
                )   
        } catch (err) {
            errorCode = 4;
            console.log(err);
        }

        try {
            let dataPoint = svg.append('g').attr('class', 'point-data data');
            dataPoint.attr('data-testid', 'point-data');
        
            // Add the points
            dataPoint.selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function(d) { return x(d.cue) } )
                .attr("cy", function(d) { return y(d.mean) } )
                .attr("r", 5)
                .attr("fill", function (d)  {return colour(d['Treatment group'])})
                .classed('opacity-75', true)
            .on('mouseover', dpMouseover)
            .on('mousemove', dpMousemove)
            .on('mouseleave', dpMouseleave)

            // draw error lines
            let errorLines = dataPoint.append('g').attr('class', 'error-data data');
            errorLines.attr('data-testid', 'error-lines')
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
                    .attr('class', function(d) {return makeHtmlId(d['Treatment group'])})

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
                    .attr("stroke", function (d)  {return colour(d['Treatment group'])})
                    .attr('class', function(d) {return makeHtmlId(d['Treatment group'])});

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
                    .attr('class', function(d) {return makeHtmlId(d['Treatment group'])});
        } catch (err) {
            errorCode = 4
            console.log(err);
        }

        // Add legend
        // Add one dot in the legend for each name.
        try {
            let labels = svg.append('g').attr('class', 'labels-data data');
            labels.attr('data-testid', 'labels-data')
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
                .on('mouseover', labelMouseover)
                .on('mousemove', labelMousemove)
                .on('mouseleave', labelMouseleave)
                .on('click', labelClick)
        } catch (err) {
            console.log(err);
            errorCode = 4;
        }
        
        
    }

    function toggleErrorBars(showErrorBars) { 
        try {
            let context = d3.select(`div#line-graph-${makeHtmlId(name)}`);
            let errorBars = context.selectAll('.error-data')
            if (showErrorBars) {
                errorBars.selectAll('line').attr('opacity', 1);
            } else {
                errorBars.selectAll('line').attr('opacity', 0);
            }
        } catch(err) {
            console.log('Toggle error bars error: \n', err);
            errorCode = 2
        }
    }   

    onMount(async () => {
        try {
            // append the svg object to the body of the page
            svg = d3.select(`#line-graph-${makeHtmlId(name)}`)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("data-testid", 'svg-line-graph')
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            
            if (svg.empty()) {
                throw new ReferenceError(`Could not create the svg, div with id ${makeHtmlId(name)} does not exist on mount.`)
            }
            
            // // create a tooltip
            // tooltip = d3.select(`#tooltip-${makeHtmlId(name)}`)
            //     .append("div")
            //     .style("opacity", 0)
            //     .attr("class", "tooltip")
            //     .style("background-color", "white")
            //     .style("border", "solid")
            //     .style("border-width", "2px")
            //     .style("border-radius", "5px")
            //     .style("padding", "5px")
            //     .style("position", 'absolute')
            
            // add X axis
            x = d3.scalePoint()
                .domain(dataObject.data.map((e) => (e.cue)))
                .range([0, width]);
            svg.append('g').attr('transform', "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the text label for the x axis
            svg.append("text")
                .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Cue");

            // Add Y axis
            y = d3.scaleLinear()
                .domain([0, d3.max(dataObject.data.map((e) => (e.mean)))])
                .range([ height, 0 ]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the text label for the Y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Mean");

            // colour pallette
            colour = d3.scaleOrdinal()
                .domain(dataObject.data.map((e) => (e['Treatment group'])))
                .range(['#e41a1c','#377eb8','#4daf4a']);
            
            loaded = true
            update(selected);
        } catch (err) {
            errorCode = 3
            console.log(err);
        }        

        loaded = true;
    })

</script>

{#if !name}
    <p class="error-message">Error: No name given (Error code: {errorCode})</p>
{:else}
    <div id="line-graph-{makeHtmlId(name)}" data-testid="line-graph">
        {#if errorCode > 0}
            <p class="error-message">Error: No data passed (Error code: {errorCode})</p>
        {:else if errorCode == 0 && loaded}
            <SlideToggle name="error-bar-show" size="sm" bind:checked={showErrorBars}>Error bars</SlideToggle>
            <div id="tooltip-{makeHtmlId(name)}" data-testid="tooltip-{makeHtmlId(name)}"></div>
        {/if}
    </div>
{/if}