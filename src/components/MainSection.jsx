"use client";

import { useState } from "react";
import MapComponent from "@/components/MapComponent";
import DivergingBarChart from "@/components/DivergingBarChart";
import DataTable from "@/components/DataTable";

export default function MainSection() {

  return (
    <div className="main-wrapper">
      {/* <div className="chart-wrapper">
        <DataTable></DataTable>
      </div> */}
      <div className="chart-wrapper">
        <div className="title">Interactive US Map with State-Wise Population Data</div>
        <div className="description">This map provides a visual representation of the United States, allowing users to explore population estimates for each state interactively. Hovering over a state displays a tooltip with detailed population statistics, while clicking on a state highlights it and showcases its population data in a separate panel.</div>
        <MapComponent></MapComponent>
      </div>
      {/* <div className="chart-wrapper">
        <DivergingBarChart></DivergingBarChart>
      </div> */}
    </div>
  );
}
