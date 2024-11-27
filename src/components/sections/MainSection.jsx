"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import MapComponent from "../charts/MapComponent";
import LineChart from "../charts/LineChart";
import StackedBarChart from "../charts/StackedBarChart";
import WordCloud from "../charts/WordCloud";
import PolarClock from "../charts/PolarClock";
import Treemap from "../charts/Treemap";
import BarChart from "../charts/BarChart";
import mapView from '../../public/images/map-view.png';
import barChartView from '../../public/images/bar-chart-view.png';
import stackedChartView from '../../public/images/stacked-bar-chart-view.png';
import polarClockView from '../../public/images/polar-clocks-view.png';
import wordCloudView from '../../public/images/word-cloud-view.png';

export default function MainSection({ setSelectedNav }) {
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

  const [visibleSection, setVisibleSection] = useState(''); // Store the ID of the currently visible section

  useEffect(() => {
    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Set the ID of the section that is in view
          setVisibleSection(entry.target.id);
          // console.log("entry.target.id", entry.target.id)
          setSelectedNav(entry.target.id);
        }
      });
    }, {
      threshold: 0.4 // Trigger when at least 50% of the element is visible
    });

    // Select elements to observe
    const targets = document.querySelectorAll('.target');

    // Observe each element
    targets.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup the observer when the component unmounts
    return () => {
      targets.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="main-wrapper">
      <div className="chart-wrapper target" id="overview">
        <h1 className="title">Welcome to the Data Visualization Showcase</h1>
        <div className="project-description-wrapper">
          <div className="project-description">
            <div className="text">This project highlights the power of D3.js in crafting engaging and insightful visualizations. The core focus is on U.S. state population data (2020–2023), represented through various visualizations such as maps, treemaps, and bar charts.</div>
            <div className="text">Additionally, the project includes extra features like a Polar Clock and Word Clouds, illustrating the creative flexibility of D3.js for diverse datasets. The blend of interactivity and functionality makes this project a compelling tool for exploring data-driven insights.</div>
          </div>
          <div className="snaps-wrapper">
            <div className="snapshot one"><Image src={mapView} height={170} width={280} alt={'mapView'}></Image></div>
            <div className="snapshot two"><Image src={stackedChartView} height={170} width={280} alt={'stackedChartView'}></Image></div>
            <div className="snapshot three"><Image src={polarClockView} height={170} width={280} alt={'polarClockView'}></Image></div>
            <div className="snapshot four"><Image src={wordCloudView} height={170} width={280} alt={'wordCloudView'}></Image></div>

          </div>
        </div>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="mapComponent">
        <div className="title">Exploring U.S. State Populations (2020–2023)</div>
        <div className="description">This map dynamically visualizes state populations with interactive zoom, hover, and pan features. Users can explore population density and trends by interacting with each state for additional data insights.</div>
        <MapComponent></MapComponent>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="treemap">
        <div className="title">Population Distribution by States and Regions</div>
        <div className="description">A hierarchical treemap displays U.S. states sized by population. The proportional rectangles and color gradients reveal demographic trends, making it easy to identify population-heavy states at a glance.</div>
        <Treemap></Treemap>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="barChart">
        <div className="title">Comparative Analysis of State Populations</div>
        <div className="description">A bar chart comparing state populations across different years. It visualizes growth or decline trends in population data.</div>
        <div className="bar-charts">
          <BarChart data={populationData2020} title={'Poplulation 2020'}></BarChart>
          <BarChart data={populationData2022} title={'Poplulation 2022'}></BarChart>
        </div>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="stackedBarChart">
        <div className="title">Multi-Year Population Data in States</div>
        <div className="description">A stacked bar chart presenting a detailed breakdown of population changes across years for each state. The color-coded sections enhance clarity for year-by-year comparison within a state.</div>
        <StackedBarChart populationData2020={populationData2020} populationData2021={populationData2021} populationData2022={populationData2022} populationData2023={populationData2023}></StackedBarChart>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="lineChart">
        <div className="title">Temporal Population Trends</div>
        <div className="description">A line graph presenting population growth or decline trends over time for U.S. states. This helps users observe patterns clearly and intuitively.</div>
        <LineChart populationData2020={populationData2020} populationData2021={populationData2021} populationData2022={populationData2022} populationData2023={populationData2023}></LineChart>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="wordCloud">
        <div className="title">Frequency Insights Through Word Clouds</div>
        <div className="description">A word cloud showcasing the frequency of terms in a dataset. The font size and color variations highlight the prominence of specific terms.</div>
        <WordCloud></WordCloud>
      </div>
      <div className="line-seperater"></div>
      <div className="chart-wrapper target" id="polarClock">
        <div className="title">Global Time Zones in an Animated Clock</div>
        <div className="description">An animated circular clock representation of global time zones, aiding in visualizing time relationships between regions.</div>
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
      <div className="line-seperater"></div>
      <div className="footer">
        <div className="text">Designed &amp; Built by <a href="https://mohakwaghchaure.github.io/portfolio/" target="_blank">Mohak Sunil Waghchaure</a></div>
      </div>
    </div>
  );
}
