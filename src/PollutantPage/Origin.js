import React from "react";
import "./Origin.css";

export const Origin = ({ sections }) => {
  return (
    <div className="origin-section-container">
        <div className="origin-section-header">
            <div className="origin-section-title">Origin and Geographical Distribution</div>
        </div>
        
        <div className="origin-section-columns">
            <div className="black-column">
            </div>
            <div className="white-column">
            </div>
            <div className="overlay-text" 
                dangerouslySetInnerHTML={{ __html: sections[0].text }}>
            </div>
            <div className="transparent-border-rectangle" />
        </div>
        <img 
            src='map.png'
            alt="Geographical distribution map" 
            className="origin-map-image"
        />
        

    </div>
  );
};