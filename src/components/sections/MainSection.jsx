"use client";

import { useEffect, useState } from "react";
import MapComponent from "../charts/MapComponent";
import StackedAreaChart from "../charts/StackedAreaChart";
import StackedBarChart from "../charts/StackedBarChart";
import WordCloud from "../charts/WordCloud";
import PolarClock from "../charts/PolarClock";
import Treemap from "../charts/Treemap";
import BarChart from "../charts/BarChart";

export default function MainSection({ }) {
  // console.log("selectedNavOption", selectedNavOption)

  const populationData2020 = [
    { state: "Alabama", population: 5031864 },
    { state: "California", population: 39503200 },
    { state: "Florida", population: 21591299 },
    { state: "Illinois", population: 12790357 },
    { state: "Michigan", population: 10077674 },
    { state: "New York", population: 20201249 },
    { state: "Texas", population: 29145505 },
    { state: "Virginia", population: 8535519 },
    { state: "Georgia", population: 10732390 },
    { state: "Ohio", population: 11799448 }
  ];

  const populationData2021 = [
    { state: "Alabama", population: 5050380 },
    { state: "California", population: 39145060 },
    { state: "Florida", population: 21830708 },
    { state: "Illinois", population: 12690341 },
    { state: "Michigan", population: 10037357 },
    { state: "New York", population: 20222663 },
    { state: "Texas", population: 29535089 },
    { state: "Virginia", population: 8553313 },
    { state: "Georgia", population: 10790385 },
    { state: "Ohio", population: 11744202 }
  ];

  const populationData2022 = [
    { state: "Alabama", population: 5073903 },
    { state: "California", population: 39040616 },
    { state: "Florida", population: 22245521 },
    { state: "Illinois", population: 12582515 },
    { state: "Michigan", population: 9998797 },
    { state: "New York", population: 20275763 },
    { state: "Texas", population: 30012312 },
    { state: "Virginia", population: 8563600 },
    { state: "Georgia", population: 10913150 },
    { state: "Ohio", population: 11712631 }
  ];

  const populationData2023 = [
    { state: "Alabama", population: 5108468 },
    { state: "California", population: 38965193 },
    { state: "Florida", population: 22610726 },
    { state: "Illinois", population: 12549689 },
    { state: "Michigan", population: 9985311 },
    { state: "New York", population: 20305957 },
    { state: "Texas", population: 30521575 },
    { state: "Virginia", population: 8570493 },
    { state: "Georgia", population: 11029227 },
    { state: "Ohio", population: 11683591 }
  ];

  const getTimeInZone = (utcOffset) => {
    const localOffset = new Date().getTimezoneOffset() / 60; // in hours, with opposite sign
    const offsetDifference = utcOffset - localOffset; // difference between the current local offset and the target UTC offset
    return new Date(Date.now() + offsetDifference * 60 * 60 * 1000); // adjust the time based on the difference
  };

  return (
    <div className="main-wrapper">
      <div className="chart-wrapper" id="mapComponent">
        <div className="title">Interactive US Map with State-Wise Population Data</div>
        <div className="description">Discover an interactive map that visualizes U.S. state population estimates from 2020 to 2023! With intuitive features like zoom, click, hover, and pan, easily explore state-wise demographic trends. This tool offers a detailed and insightful perspective on population shifts across the nation over the past few years.</div>
        <MapComponent></MapComponent>
      </div>
      <div className="chart-wrapper" id="treemap">
        <div className="title">Treemap with State-Wise Population Data</div>
        <div className="description">Discover an interactive Treemap of U.S. State Population Estimates (2020–2023) that showcases state-wise populations with proportional rectangles. color-coded growth insights.</div>
        <Treemap></Treemap>
      </div>
      <div className="chart-wrapper" id="barChart">
        <div className="title">Bar Chart</div>
        <div className="description">Explore an interactive map showcasing U.S. state population estimates from 2020 to 2023! With features like zoom, click, hover, and pan, you can effortlessly navigate and compare state-wise demographic trends. Powered by reliable and up-to-date datasets, this tool provides a clear and insightful view of population changes across the country over recent years.</div>
        <div className="bar-charts">
          <BarChart data={populationData2020} title={'Poplulation 2020'}></BarChart>
          <BarChart data={populationData2022} title={'Poplulation 2022'}></BarChart>
        </div>

      </div>
      <div className="chart-wrapper" id="stackedBarChart">
        <div className="title">Stacked Bar Chart</div>
        <div className="description">Explore an interactive map showcasing U.S. state population estimates from 2020 to 2023! With features like zoom, click, hover, and pan, you can effortlessly navigate and compare state-wise demographic trends. Powered by reliable and up-to-date datasets, this tool provides a clear and insightful view of population changes across the country over recent years.</div>
        <StackedBarChart populationData2020={populationData2020} populationData2021={populationData2021} populationData2022={populationData2022} populationData2023={populationData2023}></StackedBarChart>
      </div>
      <div className="chart-wrapper" id="stackedAreaChart">
        <div className="title">Stacked Area Chart</div>
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
        <div className="description">Explore a vibrant polar clock showcasing the current time through animated arcs. View times across major global timezones.</div>
        <div className="clock-wrapper">
          <PolarClock title={'Eastern Time (ET)'} timeZone={'America/New_York'}></PolarClock>
          <PolarClock title={'Greenwich Mean Time (GMT)'} timeZone={'Europe/London'}></PolarClock>
          <PolarClock title={'Japan Standard Time (JST)'} timeZone={'Asia/Tokyo'}></PolarClock>
          <PolarClock title={'Indian Standard Time (IST)'} timeZone={'Asia/Kolkata'}></PolarClock>
        </div>
        <div className="clock-wrapper">
          <PolarClock title={'Australian Eastern Standard Time (AEST)'} timeZone={'Australia/Sydney'}></PolarClock>
          <PolarClock title={'South Africa Standard Time (SAST)'} timeZone={'Africa/Johannesburg'}></PolarClock>
          <PolarClock title={'Brasília Time (BRT)'} timeZone={'America/Sao_Paulo'}></PolarClock>
          <PolarClock title={'New Zealand Standard Time (NZST)'} timeZone={'Pacific/Auckland'}></PolarClock>
        </div>
      </div>
    </div>
  );
}
