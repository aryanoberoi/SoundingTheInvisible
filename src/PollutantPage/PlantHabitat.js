import React from "react";
import "./PlantHabitat.css";
import plantSvg from "./plant.svg";

export const PlantHabitat = ({ sections }) => {
  const plantName = sections[0]?.plantName || "Unknown Plant";
  
  return (
    <div className="plant-habitat-container">
      <div className="habitat-main-group">
        <div className="habitat-overlap">
          <div className="habitat-overlap-group">
            {/* Header section with plant name */}
            <div className="header-wrapper">
              <div className="header-content">
                <div className="habitat-title">{plantName}'s Habitat</div>
              </div>
            </div>

            {/* Flex container for plant SVG and sections */}
            <div className="content-wrapper">
              {/* Plant SVG on the left */}
              <div className="plant-svg-container">
                <img
                  className="plant-svg"
                  alt="Plant habitat diagram"
                  src={plantSvg}
                />
              </div>

              {/* Sections container on the right */}
              <div className="sections-container">
                {sections.slice(1).map((section, index) => (
                  <div 
                    key={index} 
                    className={`habitat-section-${index + 1}`}
                  >
                    <div className="section-title">{section.title}</div>
                    <p className="section-content">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};