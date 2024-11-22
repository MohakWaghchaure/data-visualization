import Image from "next/image";
import styles from "./page.module.css";
import MapComponent from "@/components/MapComponent";
import DivergingBarChart from "@/components/DivergingBarChart";

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="header-wrapper">
        <div className="header-container">
          <div className="logo-container">
              Sketch
          </div>
          <div className="button">button</div>
        </div>
      </div>
      <div className="container-fluid page-container">
        <div className="nav-wrapper">
          <div className="nav-container">
            <div className="nav-options-wrapper">
              <div className="nav-menu active">Map view</div>  
              <div className="nav-menu">Diverging Bar Chart</div>
            </div>
          </div>
        </div>
        <div className="main-wrapper">
          <div className="chart-wrapper">
            <MapComponent></MapComponent>
          </div>
          <div className="chart-wrapper">
            <DivergingBarChart></DivergingBarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
