"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "@/components/ui/Navigation";
import MainSection from "@/components/sections/MainSection";

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

  return (
    <div className="page-wrapper">
      <div className="container-fluid page-container">
        <Navigation></Navigation>
        <MainSection></MainSection>
      </div>
    </div>
  );
}
