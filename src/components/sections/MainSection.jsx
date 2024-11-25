"use client";

import { useEffect, useState } from "react";
import MapComponent from "../charts/MapComponent";
import StackedAreaChart from "../charts/StackedAreaChart";
import StackedBarChart from "../charts/StackedBarChart";
import WordCloud from "../charts/WordCloud";
import PolarClock from "../charts/PolarClock";

export default function MainSection({selectedNavOption}) {
  // console.log("selectedNavOption", selectedNavOption)
  
  const getTimeInZone = (utcOffset) => {
    const localOffset = new Date().getTimezoneOffset() / 60; // in hours, with opposite sign
    const offsetDifference = utcOffset - localOffset; // difference between the current local offset and the target UTC offset
    return new Date(Date.now() + offsetDifference * 60 * 60 * 1000); // adjust the time based on the difference
  };
  
  // Timezone offsets from UTC
  const pacificTime = getTimeInZone(-8);  // UTC-8
  const easternTime = getTimeInZone(-5);  // UTC-5
  const greenwichMeanTime = getTimeInZone(0);  // UTC+0
  const centralEuropeanTime = getTimeInZone(1);  // UTC+1
  const indiaStandardTime = getTimeInZone(5.5);  // UTC+5:30
  const chinaStandardTime = getTimeInZone(8);  // UTC+8
  const japanStandardTime = getTimeInZone(9);  // UTC+9
  const australianEasternTime = getTimeInZone(10);  // UTC+10


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
        <div className="title">Word Cloud Visualization</div>
        <div className="description">Explore an interactive Word Cloud that visually represents a collection of words with varying sizes and colors. The words' sizes reflect their importance or frequency, while the colors add visual distinction.</div>
        <WordCloud></WordCloud>
      </div>
      <div className="chart-wrapper" id="polarClock">
      <div className="title">Polar Clock with Global Timezones</div>
      <div className="description">Explore a vibrant polar clock showcasing the current time through animated arcs. View times across major global timezones, including Pacific, Eastern, and GMT.</div>
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
