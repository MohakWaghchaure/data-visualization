"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const DivergingBarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch data
        d3.json("/data/diverging-data.json").then((data) => {
            if (!data) return;

            // Set dimensions
            const margin = { top: 20, right: 100, bottom: 40, left: 100 };
            const width = 800 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // Create SVG container
            const svg = d3
                .select(chartRef.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Set scales
            const x = d3
                .scaleLinear()
                .domain(d3.extent(data, (d) => d.value))
                .range([0, width]);

            const y = d3
                .scaleBand()
                .domain(data.map((d) => d.name))
                .range([0, height])
                .padding(0.1);

            // Add axes
            svg.append("g")
                .call(d3.axisLeft(y).tickSizeOuter(0))
                .attr("class", "y-axis");

            svg.append("g")
                .call(
                    d3.axisBottom(x).ticks(width / 80)
                        .tickFormat(d => `${d > 0 ? '+' : ''}${d}`)
                )
                .attr("transform", `translate(0,${height})`)
                .attr("class", "x-axis");

            // Add bars
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", (d) => y(d.name))
                .attr("x", (d) => (d.value < 0 ? x(d.value) : x(0)))
                .attr("width", (d) => Math.abs(x(d.value) - x(0)))
                .attr("height", y.bandwidth())
                .attr("fill", (d) => (d.value < 0 ? "#FFD369" : "#79A3B1"));
        });

        // Cleanup function to avoid duplicates
        return () => {
            d3.select(chartRef.current).select("svg").remove();
        };
    }, []);

    return <div ref={chartRef}></div>;
};

export default DivergingBarChart;
