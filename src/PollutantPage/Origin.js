import React from "react";
import "./Origin.css";

export const Origin = () => {
  return (
    <div className="origin-section-container">
        <div className="origin-section-header">
            <div className="origin-section-rectangle" />
            <div className="origin-section-underline" />
            <div className="origin-section-title">Origin and Geographical Distribution</div>
        </div>
        
        <div className="origin-section-columns">
            <div className="black-column">
            </div>
            <div className="white-column">
            </div>
            <div className="overlay-text">
                Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe, particularly in countries like Spain, Italy, and France. In Italy, it is widely distributed across various regions, particularly in northern areas, where it plays a significant role in grasslands, pastures, and as a forage crop. In the Venice lagoons, it is notably adapted to saline and brackish environments, thriving in areas with periodic flooding.<br /><br />
                Over time, it has spread beyond its native regions due to its adaptability and usefulness in agriculture and land management. Its introduction to North America likely occurred as a contaminant in imported meadow fescue seed before 1880, and while it was initially of minor importance in Europe, it gained prominence in the United States due to its superior growth characteristics and adaptability to diverse environmental conditions. By the late 19th century, this plant was recognized for its value as a forage grass, especially after the release of cultivars like Kentucky 31 in 1943, which became widely planted across the southern U.S. Today,
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