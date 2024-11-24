"use client";

import MapComponent from "@/components/MapComponent";
import DivergingBarChart from "@/components/DivergingBarChart";
import mapIcon from '@/public/icons/map.png';
import stackedBarIcon from '@/public/icons/stacked-bar.png';
import barChart from '@/public/icons/bar-chart.png';
import clouds from '@/public/icons/clouds.png';
import Image from 'next/image';
import { useState } from "react";

export default function Navigation() {

    return (
        <div className="nav-wrapper">
            <div className="nav-container">
                <div className="btn-expand"></div>
                <div className="logo-wrapper">
                    <div className="logo-text">ClearCharts</div>
                </div>
                <div className="nav-options-wrapper">
                    <div className="nav-menu active">
                        <div className="icon-wrap"><Image src={mapIcon} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Map view</div>
                    </div>
                    <div className="nav-menu">
                        <div className="icon-wrap"><Image src={stackedBarIcon} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Stacked bar chart</div>
                    </div>
                    <div className="nav-menu">
                        <div className="icon-wrap"><Image src={barChart} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Diverging Bar Chart</div>
                    </div>
                    <div className="nav-menu">
                        <div className="icon-wrap"><Image src={clouds} height={20} width={20} alt={'map'}></Image></div>
                        <div className="nav-text">Word Cloud</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
