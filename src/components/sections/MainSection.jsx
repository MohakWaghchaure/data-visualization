"use client";

import { useEffect, useState } from "react";
import MapComponent from "../charts/MapComponent";
import StackedAreaChart from "../charts/StackedAreaChart";
import StackedBarChart from "../charts/StackedBarChart";
import WordCloud from "../charts/WordCloud";
import PolarClock from "../charts/PolarClock";

export default function MainSection({selectedNavOption}) {
  // console.log("selectedNavOption", selectedNavOption)
  return (
    <div className="main-wrapper">
      <div className="chart-wrapper" id="mapComponent">
        <div className="title">Interactive US Map with State-Wise Population Data</div>
        <div className="description">Discover an interactive map that visualizes U.S. state population estimates from 2020 to 2023! With intuitive features like zoom, click, hover, and pan, easily explore state-wise demographic trends. This tool offers a detailed and insightful perspective on population shifts across the nation over the past few years.</div>
        <MapComponent></MapComponent>
      </div>
      <div className="chart-wrapper" id="stackedBarChart">
        <div className="title">Interactive US Map with State-Wise Population Data</div>
        <div className="description">Explore an interactive map showcasing U.S. state population estimates from 2020 to 2023! With features like zoom, click, hover, and pan, you can effortlessly navigate and compare state-wise demographic trends. Powered by reliable and up-to-date datasets, this tool provides a clear and insightful view of population changes across the country over recent years.</div>
        <StackedBarChart></StackedBarChart>
      </div>
      <div className="chart-wrapper" id="stackedAreaChart">
        <div className="title">Interactive US Map with State-Wise Population Data</div>
        <div className="description">Explore an interactive map showcasing U.S. state population estimates from 2020 to 2023! With features like zoom, click, hover, and pan, you can effortlessly navigate and compare state-wise demographic trends. Powered by reliable and up-to-date datasets, this tool provides a clear and insightful view of population changes across the country over recent years.</div>
        <StackedAreaChart></StackedAreaChart>
      </div>
      <div className="chart-wrapper" id="wordCloud">
        <div className="title">Interactive Word Cloud Visualization</div>
        <div className="description">Explore an interactive Word Cloud that visually represents a collection of words with varying sizes and colors. The words' sizes reflect their importance or frequency, while the colors add visual distinction.</div>
        <WordCloud></WordCloud>
      </div>
      {/* {selectedNavOption=='dataTable' && <div className="chart-wrapper">
        <DataTable></DataTable>
      </div>}
      {selectedNavOption=='polarClock' && <div className="chart-wrapper">
        <PolarClock></PolarClock>
      </div>} */}
    </div>
  );
}
