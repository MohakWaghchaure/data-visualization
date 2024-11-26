import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import statePopulation from '../../../public/data/population-data-new.json'; // Adjust the path as needed

const Treemap = () => {
    const [selectedYear, setSelectedYear] = useState('POPESTIMATE2022');
    const [data, setData] = useState(null); // State to hold the transformed data
    const svgRef = useRef();

    useEffect(() => {
        // Transform the flat JSON data into a hierarchical format
        const transformData = (data, year) => {
            const children = Object.keys(data).map(state => ({
                name: state,
                value: data[state][selectedYear], // Use the provided year to access population data
            }));

            return {
                name: 'root',
                children: children,
            };
        };

        // Transform the data and set it to state
        setData(transformData(statePopulation, selectedYear));
    }, [selectedYear]); // Re-run this effect whenever `selectedYear` changes

    useEffect(() => {
        if (!data) return; // Prevent running D3 code before the data is available

        // Set up the dimensions for the treemap
        const width = 1000;
        const height = 600;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('border', '1px solid #ccc');

        // Clear previous SVG content before rendering new data
        svg.selectAll('*').remove();

        // Create a D3 hierarchy from the transformed data
        const root = d3.hierarchy(data)
            .sum(d => d.value) // Sum the population estimates to calculate the area of each state
            .sort((a, b) => b.value - a.value);

        const treemap = d3.treemap()
            .size([width, height])
            .padding(2);

        treemap(root);

        // Create a custom color scale
        const colorScale = d3.scaleLinear()
            .domain([0, d3.max(root.leaves(), d => d.value)]) // Set domain from 0 to the max population value
            .range(['#79A3B1', '#EEEEEE']); // Use custom colors for the range

        // Render the treemap nodes
        const nodes = svg.selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        // Append rectangles to represent each state
        nodes.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => colorScale(d.value)); // Apply the custom color scale

        // Append text labels to each rectangle
        nodes.append('text')
            .attr('x', 4)
            .attr('y', 10)
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .attr('fill', '#000000')
            .text(d => d.data.name);

        // Append text labels for the population value
        nodes.append('text')
            .attr('x', 4)
            .attr('y', 25) // Positioning the population label below the state name
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .attr('fill', '#000000')
            .text(d => d.data.value.toLocaleString()); // Formatting population as a number
    }, [data]); // Only re-run the D3 code when `data` changes

    return (
        <div className='treemap-wrapper'>
            <div className="treemap-controls">
                <label htmlFor="year-select">Select Year: </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                >
                    {/* Add options for available years */}
                    <option value="POPESTIMATE2023">2023</option>
                    <option value="POPESTIMATE2022">2022</option>
                    <option value="POPESTIMATE2021">2021</option>
                    <option value="POPESTIMATE2020">2020</option>
                </select>
            </div>
            <div className="treemap">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default Treemap;
