/**
 * @author lusinabrian on 31/07/17.
 * @notes: Constant variables used in app
 */
import * as d3 from 'd3';


export const width = "100%";
export const height = '100%';
export const sizeModifier = 50;
export const hue = 0;
export const colors = {};
export const meteorites = undefined;

export const projection = d3.geoMercator().translate([780,360]).scale(300);

export const path = d3.geoPath(projection);

// Resize map on window resize
function sizeChange() {
    d3.selectAll("g").attr("transform", "scale(" + $("#container").width()/1900 + ")");
    $("svg").height($("#container").width()/2);
}