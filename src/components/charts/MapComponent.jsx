"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import statePopulation from '../../../public/data/population-data-new.json';
import React from "react";

const MapComponent = () => {
    const [selectedStateData, setSelectedStateData] = useState([]);
    useEffect(() => {
        // Map dimensions
        const width = 850;
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
            .style("background", "#101317");

        // Tooltip div
        const tooltip = d3
            .select("#us-map")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background-color", "#222831")
            .style("border", "2px solid #79A3B1")
            .style("color", "#EEEEEE")
            .style("padding", "5px")
            .style("text-align", "left")
            .style("font-size", "0.8rem")
            .style("border-radius", "3px")
            .style("pointer-events", "none");

        // Fetch the counties GeoJSON file (TopoJSON format)
        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json").then((data) => {
            // console.log("new data", data);
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
                    const stateData = Object.entries(statePopulation).find(
                        ([stateNamekey]) => stateNamekey === stateName
                    );
                    // console.log(stateName, stateData);

                    if (stateData) {
                        tooltip
                            .style("visibility", "visible")
                            .html(
                                `<strong>${stateData[0]}</strong><br/>Population: ${stateData[1].ESTIMATESBASE2020}`
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
                    d3.select(this).attr("fill", newColor);
                    const stateName = d.properties.name; // Get state name
                    const stateData = Object.entries(statePopulation).find(
                        ([stateNamekey]) => stateNamekey === stateName
                    );
                    setSelectedStateData(stateData);
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

    useEffect(() => {
        if (selectedStateData) {
            
        }
    }, [selectedStateData])

    return (
        <div className='map-wrapper'>
            <div className='map-container'>
                <div id="us-map"></div>
            </div>
            <div className="data-wrapper">
                {!selectedStateData[0] && <div className="selection-overlay">Please select any state from the map to view the population values from 2020 to 2023</div>}
                <div className="state-name">State: <span className="value">{selectedStateData[0]}</span></div>
                <div className="population-count">2020 Estimates Base: <span className="value">{selectedStateData[1]?.ESTIMATESBASE2020}</span></div>
                <div className="population-count">Population in 2020: <span className="value">{selectedStateData[1]?.POPESTIMATE2020}</span></div>
                <div className="population-count">Population in 2021: <span className="value">{selectedStateData[1]?.POPESTIMATE2021}</span></div>
                <div className="population-count">Population in 2022: <span className="value">{selectedStateData[1]?.POPESTIMATE2022}</span></div>
                <div className="population-count">Population in 2023: <span className="value">{selectedStateData[1]?.POPESTIMATE2023}</span></div>
            </div>
        </div>
    );
};

export default MapComponent;
