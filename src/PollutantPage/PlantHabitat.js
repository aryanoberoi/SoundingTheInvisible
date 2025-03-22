import React from "react";
import "./PlantHabitat.css";
import plantSvg from "./plant.svg";

export const PlantHabitat = ({ sections }) => {
  return (
    <div className="plant-habitat-container">
      <div className="habitat-main-group">
        <div className="habitat-overlap">
          <div className="habitat-overlap-group">
            <div className="header-wrapper">
              <div className="header-overlap-wrapper">
                <div className="header-content">
                  <div className="header-background" />
                  <div className="header-underline" />
                  <div className="habitat-title">Plant habitat</div>
                </div>
              </div>
            </div>

            <img
              className="plant-svg"
              alt="Plant habitat diagram"
              src={plantSvg}
            />

            {sections.map((section, index) => (
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
