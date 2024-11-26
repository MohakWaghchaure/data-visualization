import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import statePopulation from '../../../public/data/population-data-new.json'; // Adjust the path as needed

const Treemap = () => {
    const [data, setData] = useState(null);  // State to hold the transformed data
    const svgRef = useRef();

    useEffect(() => {
        // Transform the flat JSON data into a hierarchical format
        const transformData = (data) => {
            const children = Object.keys(data).map(state => ({
                name: state,
                value: data[state].POPESTIMATE2023  // Use the 2023 population estimate
            }));

            return {
                name: 'root',
                children: children
            };
        };

        // Transform the data and set it to state
        setData(transformData(statePopulation));

    }, []); // Empty dependency array ensures this runs once when the component mounts

    useEffect(() => {
        if (!data) return;  // Prevent running D3 code before the data is available

        // Set up the dimensions for the treemap
        const width = 1000;
        const height = 600;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('border', '1px solid #ccc');

        // Create a D3 hierarchy from the transformed data
        const root = d3.hierarchy(data)
            .sum(d => d.value)  // Sum the population estimates to calculate the area of each state
            .sort((a, b) => b.value - a.value);

        const treemap = d3.treemap()
            .size([width, height])
            .padding(2);

        treemap(root);

        // Create a custom color scale using your colors
        const colorScale = d3.scaleLinear()
            .domain([0, d3.max(root.leaves(), d => d.value)])  // Set domain from 0 to the max population value
            .range(['#79A3B1', '#EEEEEE']);  // Use your custom colors for the range

        // Render the treemap nodes
        const nodes = svg.selectAll('g')
            .data(root.leaves())
            .enter().append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        // Append rectangles to represent each state
        nodes.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => colorScale(d.value));  // Apply the custom color scale

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
            .attr('y', 25)  // Positioning the population label below the state name
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .attr('fill', '#000000')
            .text(d => d.data.value.toLocaleString());  // Formatting population as a number

    }, [data]);  // Only re-run the D3 code when `data` changes

    return (
        <div className='treemap-wrapper'>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default Treemap;
