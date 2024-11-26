import * as d3 from "d3";
import { useEffect, useRef } from "react";

const PolarClock = ({title, time}) => {
  const clockRef = useRef(null);

  useEffect(() => {
    const width = 1000;
    const height = 1000;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(clockRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("font", "10px sans-serif");

    const arc = d3
      .arc()
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .innerRadius((d) => d.innerRadius)
      .outerRadius((d) => d.outerRadius);

    // Function to render clock
    function render() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      const timeString = `${hours}:${minutes}:${seconds}`;

      const data = [
        {
          startAngle: 0,
          endAngle: (2 * Math.PI * now.getSeconds()) / 60,
          innerRadius: 0.8 * radius,
          outerRadius: 0.9 * radius,
        },
        {
          startAngle: 0,
          endAngle: (2 * Math.PI * now.getMinutes()) / 60,
          innerRadius: 0.6 * radius,
          outerRadius: 0.7 * radius,
        },
        {
          startAngle: 0,
          endAngle: (2 * Math.PI * (now.getHours() % 12)) / 12,
          innerRadius: 0.4 * radius,
          outerRadius: 0.5 * radius,
        },
      ];

      // Update the arcs
      const paths = svg.selectAll("path").data(data);

      paths
        .join("path")
        .attr("fill", (d, i) => ["#79A3B1", "#EEEEEE", "#FFD369"][i])
        .attr("d", arc);

      // Update the central time display
      const timeText = svg.selectAll("text.center-time").data([timeString]);

      timeText
        .join("text")
        .attr("class", "center-time")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-size", "70px")
        .style("color", "#EEEEEE")
        .style("fill", "#FFD369")
        .text((d) => d);
    }

    // Update every second
    const interval = d3.interval(() => {
      render();
    }, 1000);

    render();

    // Cleanup on unmount
    return () => {
      interval.stop();
    };
  }, []);

  return (
    <div className="clock-container">
      <div className="timezone">{title}</div>
      <div className="clock">
        <svg ref={clockRef}></svg>
      </div>
      
    </div>
  );
};

export default PolarClock;
