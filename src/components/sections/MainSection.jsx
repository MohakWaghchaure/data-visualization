"use client";

import { useEffect, useState } from "react";
import MapComponent from "../charts/MapComponent";
import StackedAreaChart from "../charts/StackedAreaChart";
import StackedBarChart from "../charts/StackedBarChart";
import WordCloud from "../charts/WordCloud";
import PolarClock from "../charts/PolarClock";

export default function MainSection({selectedNavOption}) {
  // console.log("selectedNavOption", selectedNavOption)
  const pacificTime = new Date(Date.now() + -8 * 60 * 60 * 1000); // UTC-8
  const easternTime = new Date(Date.now() + -5 * 60 * 60 * 1000); // UTC-5
  const greenwichMeanTime = new Date(Date.now() + 0 * 60 * 60 * 1000); // UTC+0
  const centralEuropeanTime = new Date(Date.now() + 1 * 60 * 60 * 1000); // UTC+1
  const indiaStandardTime = new Date(Date.now() + 5.5 * 60 * 60 * 1000); // UTC+5:30
  const chinaStandardTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const japanStandardTime = new Date(Date.now() + 9 * 60 * 60 * 1000); // UTC+9
  const australianEasternTime = new Date(Date.now() + 10 * 60 * 60 * 1000); // UTC+10
  return (
    <div className="main-wrapper">
      {/* <div className="chart-wrapper" id="mapComponent">
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
        <div className="title">Word Cloud Visualization</div>
        <div className="description">Explore an interactive Word Cloud that visually represents a collection of words with varying sizes and colors. The words' sizes reflect their importance or frequency, while the colors add visual distinction.</div>
        <WordCloud></WordCloud>
      </div> */}
      <div className="chart-wrapper">
      <div className="title">Clocks</div>
      <div className="description">Discover an interactive map that visualizes U.S. state population estimates from 2020 to 2023! With intuitive features like zoom, click, hover, and pan, easily explore state-wise demographic trends. This tool offers a detailed and insightful perspective on population shifts across the nation over the past few years.</div>
        <div className="clock-wrapper">
          <PolarClock title={'Pacific Time'} time={pacificTime}></PolarClock>
          <PolarClock title={'Eastern Time'} time={easternTime}></PolarClock>
          <PolarClock title={'Greenwich Mean Time'} time={greenwichMeanTime}></PolarClock>
          <PolarClock title={'Central European Time'} time={centralEuropeanTime}></PolarClock>
        </div>
        <div className="clock-wrapper">
          <PolarClock title={'India Standard Time'} time={indiaStandardTime}></PolarClock>
          <PolarClock title={'China Standard Time'} time={chinaStandardTime}></PolarClock>
          <PolarClock title={'Japan Standard Time'} time={japanStandardTime}></PolarClock>
          <PolarClock title={'Australian Eastern Time'} time={australianEasternTime}></PolarClock>
        </div>
        
      </div>
    </div>
  );
}
