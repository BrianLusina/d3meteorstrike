import React, {Component} from "react";
import * as d3 from "d3";
import { feature } from "topojson-client"

export default class Map extends Component {
    constructor() {
        super();

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        //export const worldMapPts = "https://d3js.org/world-50m.v1.json";
        this.worldMapPts = "https://raw.githubusercontent.com/arshdkhn1/map-data-across-globe/master/worldmap.json";

// export const nasaMeteorData = "https://data.nasa.gov/resource/y77d-th95.geojson";
        this.nasaMeteorData = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";
    }

    componentDidMount() {
        let projection = d3.geoMercator().scale(120)
            .translate([this.state.width / 2, this.state.height / 2]);

        let path = d3.geoPath().projection(projection);

        let svg = d3.select("#container")
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height);

        let div = d3.select("#container")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", "0");

        d3.json(this.worldMapPts, (error, world) => {

            svg.selectAll("g")
                .append("g")
                .data(feature(world, world.objects.countries).features)
                .enter()
                .append("path")
                .attr("class", "land")
                .attr("d", path);

            d3.json(this.nasaMeteorData, (error, data) => {
                if (error) {
                    return console.error(error)
                }

                // removing all meteorites that doesn't have
                // position mentioned in json file
                let modifiedData = data.features.reduce((arr, elem) => {
                    if (elem.geometry) {
                        arr.push(elem);
                    }
                    return arr;
                }, []);

                svg.selectAll(".meteor")
                    .append("g")
                    .data(modifiedData)
                    .enter()
                    .append("circle")
                    .on("mouseover", (d) => {
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);
                        div.html('<span class="name"><span>Name:</span> ' + d.properties.name + '</span><span class="mass"><span>Mass:</span> ' + d.properties.mass + ' units</span><span class="year"><span>Date:</span> ' + Map.getDate(d.properties.year) + '</span><span class="fall"><span>Fall:</span> ' + d.properties.fall + '</span>')
                            .style("left", (((-d3.event.pageX + window.innerWidth) > window.innerWidth / 2) ? d3.event.pageX + 10 : d3.event.pageX - 240 ) + "px")
                            .style("top", (d3.event.pageY - 60) + "px");
                    }).on("mouseout", (d) => {
                    div.transition()
                        .duration(200).style("opacity", 0);
                })
                    .attr("class", "meteor")
                    .attr("r", function (d) {
                        return Math.sqrt((d.properties.mass) * .0001)
                    })
                    .attr("cx", function (d) {
                        return projection(d.geometry.coordinates)[0];
                    })
                    .attr("cy", function (d) {
                        return projection(d.geometry.coordinates)[1];
                    });
            });
        })
    }

    static getDate(str) {
        let date = new Date(str);
        return date.toUTCString().substr(0, date.toUTCString().length - 13);
    }

    render() {
        return (
            <div id="container">

            </div>
        )
    }

}