import React from "react";
import Navbar2 from "../Navbar/Navbar2";
import Geolocation from "../Geolocation/Geolocation";
import "./HomePageNav.css";

function HomePageNav() {
  return (
    <div className="homepage-container">
      <Navbar2 />
      <Geolocation />
    </div>
  );
}

export default HomePageNav;
