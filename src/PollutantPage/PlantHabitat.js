import React from "react";
import "./PlantHabitat.css";
import plantSvg from "./plant.svg";

export const PlantHabitat = ({ sections }) => {
  const plantName = sections[0]?.plantName || "Unknown Plant"; // Extract plant name from sections

  return (
    <div className="plant-habitat-container">
      <div className="habitat-main-group">
        <div className="habitat-overlap">
          <div className="habitat-overlap-group">
            <div className="header-wrapper">
              <div className="header-overlap-wrapper">
                <div className="header-content">
                  <div className="habitat-title">{plantName}'s Habitat</div> {/* Use plant name */}
                </div>
              </div>
            </div>

            <img
              className="plant-svg"
              alt="Plant habitat diagram"
              src={plantSvg}
              style={{marginTop: '38px'}}
            />

            {sections.slice(1).map((section, index) => ( // Start mapping from the second element
              <div key={index} className={`habitat-section-${index + 1}`}>
                <p className="section-content">{section.content}</p>
                <div className="section-title">{section.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
