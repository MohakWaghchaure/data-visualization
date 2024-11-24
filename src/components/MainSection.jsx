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
        <div className="description">This map lets you explore population estimates across US states interactively, Perfect for understanding and comparing state-wise population data at a glance. ( Zoom, Click, Hover, Pan )</div>
        <MapComponent></MapComponent>
      </div>
      {/* <div className="chart-wrapper">
        <DivergingBarChart></DivergingBarChart>
      </div> */}
    </div>
  );
}
