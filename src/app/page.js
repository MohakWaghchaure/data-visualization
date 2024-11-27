"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "../components/ui/Navigation";
import MainSection from "../components/sections/MainSection";

export default function Home() {
  // const [expandNav, seExpandNav] = useState(true);

  // useEffect(() => {
  //   const fetchLambda = async () => {
  //     try {
  //       const response = await fetch(`api/test`, {
  //         method: "GET",
  //       });
  //       const data = await response.json();
  //       console.log("response from lambda", data);

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchLambda();
  // }, [])
  
  const [selectedNav, setSelectedNav] = useState('');
  
  return (
    <Fragment>
      <div className="small-screen-wrapper">
        <div className="text">Please use large resolution screen for better experience</div>
      </div>
      <div className="page-wrapper">
        <div className="container-fluid page-container">
          <Navigation selectedNav={selectedNav}></Navigation>
          <MainSection setSelectedNav={setSelectedNav}></MainSection>
        </div>
      </div>
    </Fragment>

  );
}
