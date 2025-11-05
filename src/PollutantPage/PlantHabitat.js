import React, { useState, useEffect } from "react";
import "./PlantHabitat.css";
import plantSvg from "./plant.svg";
import g291 from "./g291.svg";

// Custom hook for media queries
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const PlantHabitat = ({ sections }) => {
  const plantName = sections[0]?.plantName || "Plant";
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  return (
    <div className="plant-habitat-container">
      <div className="habitat-main-group">
        <div className="habitat-overlap">
          <div className="habitat-overlap-group">
            {/* Header section with plant name */}
            <div className="header-wrapper">
              <div className="header-content">
                <div className="habitat-title">{plantName} Habitat</div>
              </div>
            </div>

            {/* Flex container for plant SVG and sections */}
            <div style={{marginBottom:'150px'}} className="content-wrapper">
              {/* Plant SVG on the left */}
              <div className="plant-svg-container">
                <img
                  className="plant-svg"
                  alt="Plant habitat diagram"
                  src={isMobile ? g291 : plantSvg}
                />
              </div>

              {/* Sections container on the right */}
              <div className="sections-container">
                {sections.slice(1).map((section, index) => (
                  <div 
                    key={index} 
                    className={`habitat-section-${index + 1}`}
                  >
                    <div style={{marginTop:'25px'}} className="section-title">{section.title}</div>
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