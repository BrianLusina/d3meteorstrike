/**
 * @author lusinabrian on 31/07/17.
 * @notes: Utility functions
 */
import $ from 'jquery';
import * as d3 from 'd3';

/**
 * Resize map on window resize
 * */
export function sizeChange() {
    d3.selectAll("g").attr("transform", "scale(" + $("#container").width() / 1900 + ")");
    $("svg").height($("#container").width() / 2);
}
// Tooltip
export const divTooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

export const projection = d3.geoMercator().translate([780, 360]).scale(300);

export const path = d3.geoPath(projection);

