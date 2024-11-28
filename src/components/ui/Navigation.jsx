"use client";

import mapIcon from '../../public/icons/map.png';
import linePlot from '../../public/icons/line-plot.png';
import barChart from '../../public/icons/bar-chart.png';
import clouds from '../../public/icons/clouds.png';
import Clock from '../../public/icons/clock.png';
import treemap from '../../public/icons/treemap-chart.png';
import stackedBarChart from '../../public/icons/stacked-bar-chart.png';
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Navigation({ selectedNav }) {
    // const [navOption, setNavOption] = useState('overview');
    const handleScroll = (sectionAnchor) => {
        if(sectionAnchor){
            // setNavOption(sectionAnchor);
            const section = document.getElementById(`${sectionAnchor}`);
            {section && section.scrollIntoView({ behavior: 'smooth' });}   
        }
      };

      useEffect(()=>{
        // console.log("selectedNav", selectedNav);
      },[selectedNav])
    return (
        <div className="nav-wrapper">
            <div className="btn-expand"></div>
            <div className="nav-container">
                <div className="logo-wrapper">
                    <div className="logo-text">LucidPlots</div>
                </div>
                <div className="nav-options-wrapper">
                    <div className={(selectedNav=='mapComponent')? "nav-menu active" : "nav-menu"} onClick={() => handleScroll('mapComponent')} >
                        <div className="icon-wrap"><Image src={mapIcon} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Interactive Map</div>
                    </div>
                    <div className={(selectedNav=='treemap')? "nav-menu active" : "nav-menu"} onClick={() => handleScroll('treemap')} >
                        <div className="icon-wrap"><Image src={treemap} height={20} width={20} alt={'treemap'}></Image></div>
                        <div className="nav-text">Tree Map</div>
                    </div>
                    <div className={(selectedNav=='barChart')? "nav-menu active" : "nav-menu"} onClick={() => handleScroll('barChart')} >
                        <div className="icon-wrap"><Image src={barChart} height={20} width={20} alt={'barChart'}></Image></div>
                        <div className="nav-text">Bar Chart</div>
                    </div>
                    <div className={(selectedNav=='stackedBarChart')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('stackedBarChart')}>
                        <div className="icon-wrap"><Image src={stackedBarChart} height={20} width={20} alt={'stackedBarChart'}></Image></div>
                        <div className="nav-text">Stacked Bar Chart</div>
                    </div>
                    <div className={(selectedNav=='lineChart')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('lineChart')}>
                        <div className="icon-wrap"><Image src={linePlot} height={20} width={20} alt={'linePlot'}></Image></div>
                        <div className="nav-text">Line Plot</div>
                    </div>
                    <div className='seperater'></div>
                    <div className={(selectedNav=='wordCloud')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('wordCloud')}>
                        <div className="icon-wrap"><Image src={clouds} height={20} width={20} alt={'wordCloud'}></Image></div>
                        <div className="nav-text">Word Cloud</div>
                    </div>
                    <div className={(selectedNav=='polarClock')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('polarClock')}>
                        <div className="icon-wrap"><Image src={Clock} height={20} width={20} alt={'polarClock'}></Image></div>
                        <div className="nav-text">Polar Clock</div>
                    </div>
                </div>
                <div className="about-button active" onMouseDown={() => handleScroll('overview')}>
                    <button className={(selectedNav=='overview')? "about-button active" : "about-button"}>About this project</button>
                </div>
            </div>
        </div>
    );
}
