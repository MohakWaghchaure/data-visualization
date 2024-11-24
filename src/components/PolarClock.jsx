import * as d3 from "d3";
import { useEffect, useRef } from "react";

const PolarClock = () => {
  const clockRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 500;
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

    function render() {
      const now = new Date();
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

      const paths = svg.selectAll("path").data(data);

      paths
        .join("path")
        .attr("fill", (d, i) => ["#79A3B1", "#EEEEEE", "#FFD369"][i])
        .attr("d", arc);
    }

    const interval = d3.interval(() => {
      render();
    }, 1000);

    render();

    return () => {
      interval.stop();
    };
  }, []);

  return <svg ref={clockRef}></svg>;
};

export default PolarClock;
