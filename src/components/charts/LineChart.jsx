import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Sample data with regions and population estimates for 2020-2023
const data = {
  "Northeast Region": {
    "ESTIMATESBASE2020": 57614141,
    "POPESTIMATE2020": 57430477,
    "POPESTIMATE2021": 57243423,
    "POPESTIMATE2022": 57026847,
    "POPESTIMATE2023": 56983517
  },
  "New England": {
    "ESTIMATESBASE2020": 15119994,
    "POPESTIMATE2020": 15057898,
    "POPESTIMATE2021": 15106108,
    "POPESTIMATE2022": 15120739,
    "POPESTIMATE2023": 15159777
  },
  "Middle Atlantic": {
    "ESTIMATESBASE2020": 42494147,
    "POPESTIMATE2020": 42372579,
    "POPESTIMATE2021": 42137315,
    "POPESTIMATE2022": 41906108,
    "POPESTIMATE2023": 41823740
  },
  "Midwest Region": {
    "ESTIMATESBASE2020": 68987296,
    "POPESTIMATE2020": 68969794,
    "POPESTIMATE2021": 68850246,
    "POPESTIMATE2022": 68783028,
    "POPESTIMATE2023": 68909283
  },
  "East North Central": {
    "ESTIMATESBASE2020": 47369629,
    "POPESTIMATE2020": 47345074,
    "POPESTIMATE2021": 47187461,
    "POPESTIMATE2022": 47098310,
    "POPESTIMATE2023": 47146039
  },
  "West North Central": {
    "ESTIMATESBASE2020": 21617667,
    "POPESTIMATE2020": 21624720,
    "POPESTIMATE2021": 21662785,
    "POPESTIMATE2022": 21684718,
    "POPESTIMATE2023": 21763244
  },
  "South Region": {
    "ESTIMATESBASE2020": 126268529,
    "POPESTIMATE2020": 126465281,
    "POPESTIMATE2021": 127353282,
    "POPESTIMATE2022": 128702030,
    "POPESTIMATE2023": 130125290
  },
  "South Atlantic": {
    "ESTIMATESBASE2020": 66091701,
    "POPESTIMATE2020": 66174797,
    "POPESTIMATE2021": 66673601,
    "POPESTIMATE2022": 67445114,
    "POPESTIMATE2023": 68225883
  },
  "East South Central": {
    "ESTIMATESBASE2020": 19402683,
    "POPESTIMATE2020": 19424519,
    "POPESTIMATE2021": 19471271,
    "POPESTIMATE2022": 19573370,
    "POPESTIMATE2023": 19700801
  },
  "West South Central": {
    "ESTIMATESBASE2020": 40774145,
    "POPESTIMATE2020": 40865965,
    "POPESTIMATE2021": 41208410,
    "POPESTIMATE2022": 41683546,
    "POPESTIMATE2023": 42198606
  },
  "West Region": {
    "ESTIMATESBASE2020": 78594982,
    "POPESTIMATE2020": 78661381,
    "POPESTIMATE2021": 78602026,
    "POPESTIMATE2022": 78759506,
    "POPESTIMATE2023": 78896805
  },
  "Mountain": {
    "ESTIMATESBASE2020": 24925576,
    "POPESTIMATE2020": 25004426,
    "POPESTIMATE2021": 25277400,
    "POPESTIMATE2022": 25522359,
    "POPESTIMATE2023": 25716830
  },
  "Pacific": {
    "ESTIMATESBASE2020": 53669406,
    "POPESTIMATE2020": 53656955,
    "POPESTIMATE2021": 53324626,
    "POPESTIMATE2022": 53237147,
    "POPESTIMATE2023": 53179975
  }
}

const LineChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    let width = 0; 
    let height = 0;
    if(window.innerWidth < 1100){
      width = 500 - margin.left - margin.right;
      height = 500 - margin.top - margin.bottom;
    }
    else{
      width = 800 - margin.left - margin.right;
      height = 600 - margin.top - margin.bottom;
    }
    
    height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const years = ["2020", "2021", "2022", "2023"];

    // Format data to include years and populations for each region
    const formattedData = Object.keys(data).map((region) => {
      return {
        region,
        values: years.map((year) => ({
          year: parseInt(year),
          population: data[region]["POPESTIMATE" + year],
        })),
      };
    });

    // Custom colors for each region (you can modify this array)
    const regionColors = {
      "Northeast Region": "#FFD369",
      "New England": "#FFD369",
      "Middle Atlantic": "#FFD369",
      "Midwest Region": "#FFD369",
      "East North Central": "#FFD369",
      "West North Central": "#EEEEEE",
      "South Region": "#EEEEEE",
      "South Atlantic": "#EEEEEE",
      "East South Central": "#EEEEEE",
      "West South Central": "#79A3B1",
      "West Region": "#79A3B1",
      "Mountain": "#79A3B1",
      "Pacific": "#79A3B1",
    };

    // Set up the scales
    const x = d3
      .scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, (d) => d3.max(d.values, (v) => v.population))])
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.year.toString()) + x.bandwidth() / 2) // Centers the line on the x-axis
      .y((d) => y(d.population));

    // Create tooltip element
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "#222831")
      .style("border", "2px solid #79A3B1")
      .style("color", "#EEEEEE")
      .style("padding", "5px")
      .style("text-align", "left")
      .style("font-size", "0.8rem")
      .style("border-radius", "3px")
      .style("opacity", 0);

    // Draw lines for each region
    svg
      .selectAll(".line")
      .data(formattedData)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", (d) => line(d.values))
      .attr("fill", "none")
      .attr("stroke", (d) => regionColors[d.region]) // Use custom color
      .attr("stroke-width", 2);

    // Add points on the line for each year
    svg
      .selectAll(".point")
      .data(formattedData)
      .enter()
      .append("g")
      .attr("class", "point")
      .selectAll("circle")
      .data((d) => d.values.map((v) => ({ ...v, region: d.region })))
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.year.toString()) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.population))
      .attr("r", 5)
      .attr("fill", "#EEEEEE")
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            `${d.region}<br>Year: ${d.year}<br>Population: ${d.population.toLocaleString()}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add labels to the end of each line
    svg
      .selectAll(".line-label")
      .data(formattedData)
      .enter()
      .append("text")
      .attr("x", (d) => x(years[years.length - 1].toString()) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.values[d.values.length - 1].population))
      .attr("dy", -5)
      .attr("dx", 10)
      .attr("fill", (d) => regionColors[d.region]) // Use the same color as the line
      .style("font-size", "12px")
      .text((d) => d.region);

    // Add X axis (years)
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis (population)
    svg.append("g").call(d3.axisLeft(y));
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
