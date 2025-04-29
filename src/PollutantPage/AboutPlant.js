import React from "react";
import "./AboutPlant.css";
import PeepholeEffect from "./PeepHoleImage";

export const AboutPlant = ({ sections, wasteTypeIcon }) => {
  // Split the description into About Plant and Wetland Status sections
  const plantName = sections[0].plant_name;
  const aboutPlantText = sections[0].description.split('_')[1];
  const wetlandStatusText = sections[0].status.split('_')[1];
  
  // Use the provided wasteTypeIcon or fallback to default
  const iconSrc = wasteTypeIcon || 'agriculture-waste-icon.svg';

  return (
    <div className="inverted-section">
      <div className="main-container inverted">
        <div className="flex-row-f">
          <img 
            src={iconSrc}
            alt="Plant classification icon" 
            className="image inverted-text"
            onError={(e) => {
              console.warn(`Failed to load plant icon: ${e.target.src}`);
              e.target.src = 'agriculture-waste-icon.svg'; // Fallback if image fails to load
            }}
          />
          <div id="about-plant-section" className="about-pollutant">
            <span className="about" style={{color: 'black'}}>About </span>
            <span style={{color: 'black'}}>{plantName} </span>
          </div>
        </div>
        {/* Rest of component remains unchanged */}
        <div className="flex-row-a">
          {/* Replaced image with inline SVG */}
          <svg width="100%" height="29" viewBox="0 0 538 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="vector-image">
            <path d="M23.1216 14L22.8683 14.4311L22.9856 14.5H23.1216V14ZM514.333 14C514.333 15.4728 515.527 16.6667 517 16.6667C518.473 16.6667 519.667 15.4728 519.667 14C519.667 12.5272 518.473 11.3333 517 11.3333C515.527 11.3333 514.333 12.5272 514.333 14ZM0.746674 1.43108L22.8683 14.4311L23.375 13.5689L1.25333 0.568925L0.746674 1.43108ZM23.1216 14.5H517V13.5H23.1216V14.5Z" fill="black"/>
            <path d="M475.83 26L475.613 26.4502L475.716 26.5H475.83V26ZM532.333 26C532.333 27.4728 533.527 28.6667 535 28.6667C536.473 28.6667 537.667 27.4728 537.667 26C537.667 24.5272 536.473 23.3333 535 23.3333C533.527 23.3333 532.333 24.5272 532.333 26ZM450.782 14.4502L475.613 26.4502L476.048 25.5498L451.218 13.5498L450.782 14.4502ZM475.83 26.5H535V25.5H475.83V26.5Z" fill="black"/>
            <path d="M492.774 7V6.5H492.562L492.415 6.65229L492.774 7ZM525.333 7C525.333 8.47276 526.527 9.66667 528 9.66667C529.473 9.66667 530.667 8.47276 530.667 7C530.667 5.52724 529.473 4.33333 528 4.33333C526.527 4.33333 525.333 5.52724 525.333 7ZM486.359 14.3477L493.133 7.34771L492.415 6.65229L485.641 13.6523L486.359 14.3477ZM492.774 7.5H528V6.5H492.774V7.5Z" fill="black"/>
          </svg>
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