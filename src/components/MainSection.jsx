"use client";

import { useState } from "react";
import MapComponent from "@/components/MapComponent";
import StackedAreaChart from "@/components/StackedAreaChart";
import StackedBarChart from "@/components/StackedBarChart";
import WordCloud from "@/components/WordCloud";
import PolarClock from "./PolarClock";

export default function MainSection() {

  return (
    <div className="main-wrapper">
      {/* <div className="chart-wrapper">
        <DataTable></DataTable>
      </div> */}
      <div className="chart-wrapper">
        <div className="title">Interactive US Map with State-Wise Population Data</div>
        <div className="description">Explore an interactive map showcasing U.S. state population estimates from 2020 to 2023! With features like zoom, click, hover, and pan, you can effortlessly navigate and compare state-wise demographic trends. Powered by reliable and up-to-date datasets, this tool provides a clear and insightful view of population changes across the country over recent years.</div>
        <MapComponent></MapComponent>
      </div>
      <div className="chart-wrapper">
        <StackedBarChart></StackedBarChart>
      </div>
      <div className="chart-wrapper">
        <StackedAreaChart></StackedAreaChart>
      </div>
      <div className="chart-wrapper">
        <WordCloud></WordCloud>
      </div>
      <div className="chart-wrapper">
        <PolarClock></PolarClock>
      </div>
    </div>
  );
}
