import React from "react";
import "./AboutPlant.css";
import PeepholeEffect from "./PeepHoleImage";

export const AboutPlant = ({ sections, wasteTypeIcon }) => {
  // Split the description into About Plant and Wetland Status sections
  console.log("Sections:", sections);
  const plantName = sections[0].plant_name;
  const aboutPlantText = sections[0].description?.split('_')[1];
  const wetlandStatusText = sections[0].status?.split('_')[1];
  const peepholeImage = sections[0].peephole;
  console.log("Peephole Url:", peepholeImage)
  
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
          <svg width="100%" height="18" viewBox="0 0 538 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="vector-image">
            <path d="M23.1216 9L22.8683 9.4311L22.9856 9.5H23.1216V9ZM514.333 9C514.333 10.4728 515.527 11.6667 517 11.6667C518.473 11.6667 519.667 10.4728 519.667 9C519.667 7.5272 518.473 6.3333 517 6.3333C515.527 6.3333 514.333 7.5272 514.333 9ZM0.746674 1.43108L22.8683 9.4311L23.375 8.5689L1.25333 0.568925L0.746674 1.43108ZM23.1216 9.5H517V8.5H23.1216V9.5Z" fill="black"/>
            <path d="M475.83 15L475.613 15.4502L475.716 15.5H475.83V15ZM532.333 15C532.333 16.4728 533.527 17.6667 535 17.6667C536.473 17.6667 537.667 16.4728 537.667 15C537.667 13.5272 536.473 12.3333 535 12.3333C533.527 12.3333 532.333 13.5272 532.333 15ZM450.782 9.4502L475.613 15.4502L476.048 14.5498L451.218 8.5498L450.782 9.4502ZM475.83 15.5H535V14.5H475.83V15.5Z" fill="black"/>
            <path d="M492.774 4V3.5H492.562L492.415 3.6523L492.774 4ZM525.333 4C525.333 5.4728 526.527 6.6667 528 6.6667C529.473 6.6667 530.667 5.4728 530.667 4C530.667 2.5272 529.473 1.3333 528 1.3333C526.527 1.3333 525.333 2.5272 525.333 4ZM486.359 9.3477L493.133 4.3477L492.415 3.6523L485.641 8.6523L486.359 9.3477ZM492.774 4.5H528V3.5H492.774V4.5Z" fill="black"/>
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
            imageUrl={peepholeImage} 
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