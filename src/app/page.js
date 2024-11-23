"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import MainSection from "@/components/MainSection";

export default function Home() {
  // const [expandNav, seExpandNav] = useState(true);

  return (
    <div className="page-wrapper">
      <div className="container-fluid page-container">
        <Navigation></Navigation>
        <MainSection></MainSection>
      </div>
    </div>
  );
}
