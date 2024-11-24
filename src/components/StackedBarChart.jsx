import { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ }) => {

    const data = [
        { name: "A", a: 3840, b: 1920, c: 960, e: 400, e: 3840, f: 1920, g: 960, },
        { name: "B", a: 1600, b: 1440, c: 960, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
        { name: "C", a: 640, b: 960, c: 640, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
        { name: "D", a: 320, b: 480, c: 640, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
        { name: "E", a: 3840, b: 1920, c: 960, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
        { name: "F", a: 1600, b: 1440, c: 960, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
        { name: "G", a: 640, b: 960, c: 640, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
        { name: "H", a: 320, b: 480, c: 640, e: 400, e: 400, e: 3840, f: 1920, g: 960,  },
      ];
      
      const keys = ["a", "b", "c", "d", "e", "f", "g"];
      const colors = ["#222831", "#393E46", "#FFD369",, "#456268", "#79A3B1", "#FCF8EC", "#456268"];
      
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(chartRef.current).selectAll("*").remove();

    // Define dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Create scales
    const x = d3
      .scaleLinear()
      .domain([0, 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    const color = d3.scaleOrdinal().domain(keys).range(colors);

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Stack data
    const stack = d3
      .stack()
      .keys(keys)
      .offset(d3.stackOffsetExpand)(data);

    // Add bars
    svg
      .append("g")
      .selectAll("g")
      .data(stack)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d.data.name))
      .attr("width", (d) => x(d[1]) - x(d[0]))
      .attr("height", y.bandwidth());

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80, "%"));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Clean up on unmount
    return () => d3.select(chartRef.current).selectAll("*").remove();
  }, [data, keys, colors]);

  return <div ref={chartRef}></div>;
};

export default StackedBarChart;
