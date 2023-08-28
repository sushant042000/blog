import React from "react";
import "./HomeImage.css";
import backgroundImage from "../assets/bg.jpg";


const HomeImage = () => {
  return (
    <div className="home-bg-image">
      <img className= "home-bg-image" src={backgroundImage} alt="" />
    </div>
  );
};

export default HomeImage;
