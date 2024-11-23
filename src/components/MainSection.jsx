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
        <MapComponent></MapComponent>
      </div>
      <div className="chart-wrapper">
        <DivergingBarChart></DivergingBarChart>
      </div>
    </div>
  );
}
