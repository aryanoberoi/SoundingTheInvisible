import React from "react";
import "./AboutPlant.css";
import PeepholeEffect from "./PeepHoleImage";

export const AboutPlant = ({ sections }) => {
  // Split the description into About Plant and Wetland Status sections
  const plantName = sections[0].plant_name;
  const aboutPlantText = sections[0].description.split('_')[1];
  const wetlandStatusText = sections[0].status.split('_')[1];

  return (
    <div className="inverted-section">
      <div className="main-container inverted">
        <div className="flex-row-f">
          <img 
            src="/ap.png" 
            alt="Pollutant" 
            className="image inverted-text"
          />
          <div id="about-plant-section" className="about-pollutant">
            <span className="about" style={{color: 'black'}}>About </span>
            <span style={{color: 'black'}}>{plantName} </span>
          </div>
        </div>
        <div className="flex-row-a">
          <img 
            src="l1.png" 
            alt="Vector graphic" 
            className="vector-image inverted-image"
          />
        </div>
        <span
          className="lorem-ipsum-dolor inverted-text"
          style={{ whiteSpace: 'pre-line', width: '100%' }}
        >
          {aboutPlantText}
        </span>
        <div className="inverted-graphic-container" style={{ height: "auto" }}>
          <PeepholeEffect 
            imageUrl="n19.svg" 
            width="100%" 
            height="auto" 
          />
        </div>
        <div className="wetland-status-container">
          <div className="rectangle-inv" />
          <div className="wetland-black-bar" />
          <div className="wetland-status-text">Wetland Status</div>
        </div>
        <span className="lorem-ipsum-dolor inverted-text">
          {wetlandStatusText}
        </span>
      </div>
    </div>
  );
};