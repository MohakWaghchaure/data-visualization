"use client"; // Ensure client-side rendering
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const testData = {
  name: "root",
  children: [
    { name: "A", value: 100 },
    {
      name: "B",
      children: [
        { name: "B1", value: 50 },
        { name: "B2", value: 50 },
      ],
    },
  ],
};

const Sunburst = () => {
  const ref = useRef(null);

  const data = testData;

  useEffect(() => {
    if (!data || !ref.current) return;

    // Specify the chart’s dimensions.
    const width = 928;
    const height = width;
    const radius = width / 6;

    // Create the color scale.
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

    // Partition layout
    const partition = (data) =>
      d3.partition().size([2 * Math.PI, radius])(
        d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value)
      );

    // Arc generator
    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle(1 / radius)
      .padRadius(radius / 2) // Adjusted padding radius
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);

    const root = partition(data);

    // Clear previous chart if it exists
    d3.select(ref.current).selectAll("*").remove();

    // Create the SVG container
    const svg = d3
      .select(ref.current)
      .attr("viewBox", `0 0 ${width} ${width}`) // Keeps the viewBox the same
      .style("font", "10px sans-serif");

    // Render the chart
    svg
      .append("g")
      .selectAll("path")
      .data(root.descendants())
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .on("click", (event, p) => {
        root.each((d) => {
          d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.y0),
            y1: Math.max(0, d.y1 - p.y0),
          };
        });

        const t = svg.transition().duration(750);

        svg
          .selectAll("path")
          .transition(t)
          .attrTween("d", (d) => () =>
            arc({
              x0: d.target.x0,
              x1: d.target.x1,
              y0: d.target.y0,
              y1: d.target.y1,
            })
          );
      })
      .append("title")
      .text((d) =>
        d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join("/")
      );
  }, [data]);

  return (
    <div
      className="sunburst-wrapper"
      style={{
        width: "500px",
        height: "500px",
        margin: "auto",
        overflow: "hidden", // Ensure content doesn't overflow
      }}
    >
      <svg ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Sunburst;
