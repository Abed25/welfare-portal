import React from "react";
import "./general_styles/layout.css";
import Landing from "./general_pages/landing";
import Head from "./general_components/head";
import Footer from "./general_components/footer";
import Counselling_Layout from "./counsellors/pages/layout";

export default function Layout() {
  return (
    <div className="layout">
      <Head />
      <div className="content">
        {/* <Landing /> */}
        <Counselling_Layout />
      </div>
      <Footer />
    </div>
  );
}
