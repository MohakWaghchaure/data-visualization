import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloud = () => {
  const chartRef = useRef(null);

  const words = [
    { text: "Full Stack", size: 50, color: "#EEEEEE" },
    { text: "Backend", size: 40, color: "#393E46" },
    { text: "Frontend", size: 35, color: "#FFD369" },
    { text: "API", size: 30, color: "#EEEEEE" },
    { text: "Database", size: 25, color: "#79A3B1" },
    { text: "Node.js", size: 20, color: "#79A3B1" },
    { text: "Express.js", size: 18, color: "#79A3B1" },
    { text: "React.js", size: 15, color: "#EEEEEE" },
    { text: "Authentication", size: 50, color: "#EEEEEE" },
    { text: "Authorization", size: 40, color: "#393E46" },
    { text: "REST", size: 35, color: "#FFD369" },
    { text: "GraphQL", size: 30, color: "#EEEEEE" },
    { text: "Redux", size: 25, color: "#79A3B1" },
    { text: "TypeScript", size: 20, color: "#79A3B1" },
    { text: "HTML", size: 18, color: "#79A3B1" },
    { text: "CSS", size: 15, color: "#EEEEEE" },
    { text: "JavaScript", size: 50, color: "#EEEEEE" },
    { text: "MongoDB", size: 40, color: "#393E46" },
    { text: "PostgreSQL", size: 35, color: "#FFD369" },
    { text: "Docker", size: 30, color: "#EEEEEE" },
    { text: "Kubernetes", size: 25, color: "#79A3B1" },
    { text: "AWS", size: 20, color: "#79A3B1" },
    { text: "Azure", size: 18, color: "#79A3B1" },
    { text: "Continuous Integration", size: 15, color: "#EEEEEE" },
    { text: "Version Control", size: 50, color: "#EEEEEE" },
    { text: "GitHub", size: 40, color: "#393E46" },
    { text: "Git", size: 35, color: "#FFD369" },
    { text: "Unit Testing", size: 30, color: "#EEEEEE" },
    { text: "Jest", size: 25, color: "#79A3B1" },
    { text: "Mocha", size: 20, color: "#79A3B1" },
    { text: "Chai", size: 18, color: "#79A3B1" },
    { text: "End-to-End Testing", size: 15, color: "#EEEEEE" },
    { text: "Agile", size: 50, color: "#EEEEEE" },
    { text: "Scrum", size: 40, color: "#393E46" },
    { text: "Sprint Planning", size: 35, color: "#FFD369" },
    { text: "Webpack", size: 30, color: "#EEEEEE" },
    { text: "Babel", size: 25, color: "#79A3B1" },
    { text: "Microservices", size: 20, color: "#79A3B1" },
    { text: "Serverless", size: 18, color: "#79A3B1" },
    { text: "Software Architecture", size: 15, color: "#EEEEEE" },
    { text: "Testing", size: 25, color: "#79A3B1" },
    { text: "Debugging", size: 20, color: "#79A3B1" },
    { text: "Error Handling", size: 18, color: "#79A3B1" },
    { text: "Performance Optimization", size: 15, color: "#EEEEEE" },
    { text: "Continuous Deployment", size: 50, color: "#EEEEEE" },
    { text: "DevOps", size: 40, color: "#393E46" },
    { text: "Virtualization", size: 35, color: "#FFD369" },
    { text: "Load Balancing", size: 30, color: "#EEEEEE" },
    { text: "Scaling", size: 25, color: "#79A3B1" },
    { text: "State Management", size: 20, color: "#79A3B1" },
    { text: "Client-Server Model", size: 18, color: "#79A3B1" },
    { text: "Caching", size: 15, color: "#EEEEEE" },
    { text: "Web Security", size: 25, color: "#79A3B1" },
    { text: "SEO", size: 20, color: "#79A3B1" },
    { text: "Accessibility", size: 18, color: "#79A3B1" },
    { text: "Responsive Design", size: 15, color: "#EEEEEE" },
    { text: "Agile Development", size: 45, color: "#222831" },
  { text: "Continuous Integration", size: 40, color: "#393E46" },
  { text: "SQL", size: 38, color: "#FFD369" },
  { text: "NoSQL", size: 35, color: "#EEEEEE" },
  { text: "Middleware", size: 33, color: "#79A3B1" },
  { text: "JSON", size: 30, color: "#79A3B1" },
  { text: "XML", size: 28, color: "#79A3B1" },
  { text: "AJAX", size: 26, color: "#222831" },
  { text: "HTTP", size: 24, color: "#393E46" },
  { text: "WebSockets", size: 22, color: "#FFD369" },
  { text: "OAuth", size: 20, color: "#EEEEEE" },
  { text: "Session Management", size: 18, color: "#79A3B1" },
  { text: "Stateful Services", size: 16, color: "#79A3B1" },
  { text: "Asynchronous Programming", size: 14, color: "#79A3B1" },
  { text: "Event-Driven Architecture", size: 12, color: "#222831" },
  { text: "Cross-Origin Resource Sharing", size: 10, color: "#393E46" },
  { text: "Content Delivery Network", size: 8, color: "#FFD369" },
  { text: "Single Page Application", size: 6, color: "#EEEEEE" },
  { text: "Progressive Web App", size: 4, color: "#79A3B1" },
  { text: "Server-Side Rendering", size: 2, color: "#222831" },
  ];
  

  useEffect(() => {
    // Clear previous word cloud
    d3.select(chartRef.current).selectAll("*").remove();

    const width = 800;
    const height = 400;

    const layout = cloud()
      .size([width, height])
      .words(words.map((d) => ({ text: d.text, size: d.size, color: d.color})))
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 90 : 0)) // Rotate 50% of words
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", (d) => d.color || console.log("d.color", d)) // Fallback to black if no color
        .style("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }, [words]);

  return <div ref={chartRef}></div>;
};

export default WordCloud;
