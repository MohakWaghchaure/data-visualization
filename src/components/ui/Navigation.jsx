"use client";

import mapIcon from '../../public/icons/map.png';
import stackedBarIcon from '../../public/icons/stacked-bar.png';
import barChart from '../../public/icons/bar-chart.png';
import clouds from '../../public/icons/clouds.png';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Navigation({getSelectedNav}) {
    const [navOption, setNavOption] = useState('');
    const handleScroll = (sectionAnchor) => {
        if(sectionAnchor){
            setNavOption(sectionAnchor);
            const section = document.getElementById(`${sectionAnchor}`);
            {section && section.scrollIntoView({ behavior: 'smooth' });}   
        }
      };

    return (
        <div className="nav-wrapper">
            <div className="nav-container">
                <div className="btn-expand"></div>
                <div className="logo-wrapper">
                    <div className="logo-text">ClearCharts</div>
                </div>
                <div className="nav-options-wrapper">
                    <div className={(navOption=='mapComponent')? "nav-menu active" : "nav-menu"} onClick={() => handleScroll('mapComponent')} >
                        <div className="icon-wrap"><Image src={mapIcon} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Map view</div>
                    </div>
                    <div className={(navOption=='stackedBarChart')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('stackedBarChart')}>
                        <div className="icon-wrap"><Image src={stackedBarIcon} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Stacked bar chart</div>
                    </div>
                    <div className={(navOption=='stackedAreaChart')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('stackedAreaChart')}>
                        <div className="icon-wrap"><Image src={barChart} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Diverging Bar Chart</div>
                    </div>
                    <div className={(navOption=='wordCloud')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('wordCloud')}>
                        <div className="icon-wrap"><Image src={clouds} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Word Cloud</div>
                    </div>
                    <div className={(navOption=='polarClock')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('polarClock')}>
                        <div className="icon-wrap"><Image src={clouds} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Polar Clock</div>
                    </div>
                    <div className={(navOption=='dataTable')? "nav-menu active" : "nav-menu"} onMouseDown={() => handleScroll('dataTable')}>
                        <div className="icon-wrap"><Image src={clouds} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Datasets</div>
                    </div>
                </div>
                <div className="about-button active" onMouseDown={() => handleScroll('aboutProject')}>
                    <button className={(navOption=='aboutProject')? "about-button active" : "about-button"}>About this project</button>
                </div>
            </div>
        </div>
    );
}