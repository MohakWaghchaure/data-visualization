"use client";

import { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client"; 
import statePopulation from '../../public/data/population-data.json';
import React from "react";

const MapComponent = () => {
    useEffect(() => {
        // Map dimensions
        const width = 900;
        const height = 500;

        // Create a projection for the map (Albers USA projection)
        const projection = d3.geoAlbersUsa().scale(1000).translate([width / 2, height / 2]);
        const path = d3.geoPath().projection(projection);

        // Create the SVG element to hold the map
        const svg = d3
            .select("#us-map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#222831");

        // Tooltip div
        const tooltip = d3
            .select("#us-map")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background-color", "#FCF8EC")
            .style("border", "2px solid #79A3B1")
            .style("color", "#456268")
            .style("padding", "5px")
            .style("font-size", "0.8rem")
            .style("border-radius", "3px")
            .style("pointer-events", "none");

        // Fetch the counties GeoJSON file (TopoJSON format)
        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then((data) => {
            console.log("new data", data);
            const states = topojson.feature(data, data.objects.states).features;


            // Create a group for all map elements (states)
            const mapGroup = svg.append("g");

            // Render the states
            mapGroup
                .selectAll("path")
                .data(states)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "#D0E8F2")
                .attr("stroke", "#456268")
                .attr("stroke-width", 0.5)
                .style("cursor", "pointer") // Add cursor pointer on hover
                .on("mouseover", function (event, d) {
                    const stateName = d.properties.name; // Get state name
                    const stateData = Object.values(statePopulation).find(
                        (state) => state.state === stateName
                    );

                    if (stateData) {
                        tooltip
                            .style("visibility", "visible")
                            .html(
                                `<strong>${stateName}</strong><br/>Population: ${stateData["2020_census"]}`
                            );
                    }
                })
                .on("mousemove", function (event) {
                    tooltip
                        .style("top", event.pageY + 10 + "px")
                        .style("left", event.pageX + 10 + "px");
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                })
                .on("click", function (event, d) {
                    mapGroup.selectAll("path").attr("fill", "#D0E8F2");

                    const currentColor = d3.select(this).attr("fill");
                    const newColor = currentColor === "#D0E8F2" ? "#FFD369" : "#D0E8F2";
                    d3.select(this).attr("fill", newColor); // Change the clicked state fill color
                });

            // Create a zoom behavior that handles both zoom and pan
            const zoom = d3
                .zoom()
                .scaleExtent([1, 8]) // Set limits for zoom scale (1 = normal, 8 = maximum zoom)
                .on("zoom", (event) => {
                    // Apply the transformation (scaling and translation) to the map group
                    mapGroup.attr("transform", event.transform); // Apply zoom and pan transformation
                });

            // Apply zoom behavior to the SVG
            svg.call(zoom);
        });
    }, []);

    return (
        <div className='map-wrapper'>
            <div className='map-container'>
                <div id="us-map"></div>
            </div>
            {/* <div className="data-wrapper">
                <div>State: California</div>
                <div>Population: 2345678</div>
            </div> */}
        </div>
    );
};

export default MapComponent;
