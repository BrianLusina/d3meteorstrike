import React from 'react';
import * as d3 from 'd3';
import * as constants from 'constants';
// import * as utils from 'utils';
import { feature } from 'topojson-client';
import $ from 'jquery';

/**
 * Map stateless component
 */
const Map = () => {

    /**
     * Resize map on window resize
     * */
    function sizeChange() {
        d3.selectAll("g").attr("transform", "scale(" + $("#container").width() / 1900 + ")");
        $("svg").height($("#container").width() / 2);
    }

// Tooltip
    const divTooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    const projection = d3.geoMercator().translate([780, 360]).scale(300);

    const path = d3.geoPath(projection);


    /**
     * draws a world map
     * @param map {Object}
     * */
    function drawWorldMap(map) {
        d3.json(constants.worldMapPts, (json) => {
            map.select("path")
                .data(feature(json, json.objects.countries).features)
                .enter()
                .append('path')
                .attr('fill', '#95E1D3')
                .attr('stroke', '#266D98')
                .attr('d', path)
        })
    }

    /**
     * Generates world map
     * */
    function generateMeteorStrike() {
        let svg = d3.select("#container").append("svg").attr("width", "100%");
        let map = svg.append("g");
        let meteorites;

        // setting zoom
        const zoom = d3.zoom()
            .scaleExtent([.5, 18])
            .on("zoom", () => {
                map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                meteorites.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
            });

        // setting background color
        svg.append("rect")
            .attr("width", constants.width)
            .attr("height", constants.height)
            .attr("fill", "#266D98")
            .call(zoom);

        d3.select(window).on("resize", sizeChange);

        // draw our world map
        drawWorldMap(map)
    }

    return (
        <div id="container">
            {generateMeteorStrike()}
        </div>
    );
};


export default Map;