import { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedAreaChart = () => {
  const chartRef = useRef(null);

  const data = [
    { date: new Date(2000, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
    { date: new Date(2001, 0, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
    { date: new Date(2002, 0, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },
    { date: new Date(2003, 0, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 },
  ];
  
  const keys = ["apples", "bananas", "cherries", "dates"];
  const colors = ["#222831", "#393E46", "#FFD369", "#FCF8EC", "#456268"];
  

  useEffect(() => {
    // Clear any existing content
    d3.select(chartRef.current).selectAll("*").remove();

    // Set dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    // Create scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal().domain(keys).range(colors);

    // Create area generator
    const area = d3
      .area()
      .x((d) => x(d.data.date))
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]));

    // Stack the data
    const stack = d3.stack().keys(keys).offset(d3.stackOffsetExpand)(data);

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Draw areas
    svg
      .append("g")
      .selectAll("path")
      .data(stack)
      .join("path")
      .attr("fill", (d) => color(d.key))
      .attr("d", area);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(10, "%"));

    // Clean up on unmount
    return () => d3.select(chartRef.current).selectAll("*").remove();
  }, [data, keys, colors]);

  return <div ref={chartRef}></div>;
};

export default StackedAreaChart;
