import React from 'react';
import * as d3 from 'd3';
import * as constants from 'constants';

/**
 * Map stateless component
 */
const Map = () => {

    /**
     * Generates world map
     * */
    function generateWorldMap() {
        let svg = d3.select("#container").append("svg").attr("width", "100%");
        let map = svg.append("g");
        let meteorites;

        // setting zoom
        const zoom = d3.zoom()
            .translate([0, 0])
            .scale(1)
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

        
    }

    return (
        <div id="container">
            {generateWorldMap()}
        </div>
    );
};


export default Map;