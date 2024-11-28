import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, title }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        
        let width = 0; 
        let height = 0;
        if(window.innerWidth < 1100){
          width = 600;
          height = 400;
        }
        else{
          width = 800;
          height = 400;
        }
        const margin = { top: 20, right: 30, bottom: 40, left: 100 };

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleBand()
            .domain(data.map(d => d.state))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        // Ensure d3.max is returning the correct max value for population
        const maxPopulation = d3.max(data, d => d.population);
        // console.log("Max population:", maxPopulation);  // Log the max value

        const y = d3.scaleLinear()
            .domain([0, maxPopulation])  // Ensure the y-scale domain is correct
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Draw the bars
        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.state))
            .attr('y', d => y(d.population))
            .attr('width', x.bandwidth())
            .attr('height', d => y(0) - y(d.population))
            .attr('fill', '#79A3B1');

        // Add the x-axis
        svg.append('g')
            .selectAll('.x-axis')
            .data([0])
            .enter().append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Add the y-axis with ticks
        const yAxis = svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5));  // You can adjust the number of ticks here

        // Style the y-axis labels (numbers)
        yAxis.selectAll('text')
            .style('font-size', '12px')
            .style('fill', '#EEEEEE');

            svg.selectAll('.label')
            .data(data)
            .enter().append('text')
            .attr('class', 'label')
            .attr('x', d => x(d.state) + x.bandwidth() / 2)  // Position label horizontally in the middle of the bar
            .attr('y', d => y(d.population) - 5)  // Position label just above the top of the bar
            .attr('text-anchor', 'middle')  // Center the text horizontally
            .style('font-size', '12px')
            .style('fill', '#EEEEEE')
            .text(d => d.population.toLocaleString());  

    }, [data]);

    return (
        <div className='bar-chart-wrapper'>
            <div className='title'>{title}</div>
            <div>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default BarChart;
