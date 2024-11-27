import { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ populationData2020, populationData2021, populationData2022, populationData2023 }) => {
  // Combine the data for all years into a format suitable for stacking by state
  const states = populationData2020.map(d => d.state);
  const data = states.map(state => ({
    state,
    2020: populationData2020.find(d => d.state === state)?.population || 0,
    2021: populationData2021.find(d => d.state === state)?.population || 0,
    2022: populationData2022.find(d => d.state === state)?.population || 0,
    2023: populationData2023.find(d => d.state === state)?.population || 0,
  }));

  const years = ["2020", "2021", "2022", "2023"];
  const keys = years; // Use years as keys
  const colors = ["#393E46", "#FFD369", "#EEEEEE", "#456268"]; // Colors for each year

  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(chartRef.current).selectAll("*").remove();

    // Define dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 100, bottom: 30, left: 100 }; // Increased right margin for legend space

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.state))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d3.sum(years.map(year => d[year])))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal().domain(keys).range(colors);

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Stack data
    const stack = d3.stack().keys(keys)(data);

    // Add bars for stacking per state
    svg
      .append("g")
      .selectAll("g")
      .data(stack)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.state))
      .attr("y", (d) => y(d[1])) // Y position should be stacked
      .attr("height", (d) => y(d[0]) - y(d[1])) // Height based on stacked values
      .attr("width", x.bandwidth());

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    // Add Legend (on the right side)
    const legend = svg
      .append("g")
      .selectAll("g")
      .data(keys)
      .join("g")
      .attr("transform", (d, i) => `translate(${width - margin.right + 10}, ${i * 25 + margin.top})`); // Adjust vertical spacing in legend

    // Add colored rectangles for the legend
    legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 15)
      .attr("fill", (d) => color(d));

    // Add labels for each color in the legend
    legend
      .append("text")
      .attr("x", 30) // Adjust horizontal space between rectangle and text
      .attr("y", 12) // Positioning the text vertically at the center of the rectangle
      .style("font-size", "12px") // Font size for readability
      .style("fill", "#EEEEEE")
      .style("font-weight", "600")
      .text((d) => `${d}`); // Add year as label

    // Clean up on unmount
    return () => d3.select(chartRef.current).selectAll("*").remove();
  }, [data, keys, colors]);

  return <div ref={chartRef}></div>;
};

export default StackedBarChart;
