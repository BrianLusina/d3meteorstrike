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
export const zoom = d3.zoom().translate([0, 0]).scale(1).scaleExtent([.5, 18])
    .on("zoom", zoomed);

export const path = d3.geoPath(projection);

/**
 * Move and scale map on meteor interaction*/
export function zoomed(){
//     map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//     meteorites.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
}