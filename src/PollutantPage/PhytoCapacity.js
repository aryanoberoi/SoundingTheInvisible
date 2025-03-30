import React from "react";
import "./PhytoCapacity.css";

export const PhytoCapacity = ({ sections }) => {
  const plantName = sections[0]?.plantName || "Unknown Plant"; // Extract plant name from sections

  return (
    <div className="phyto-capacity-container">
      <div className="phyto-capacity-header">
        <div className="phyto-capacity-rectangle" />
        <div className="phyto-capacity-underline" />
        <div className="phyto-capacity-title">Phytoremediation capacity of {plantName}</div>
      </div>

      {sections.slice(1).map((section, index) => {
        const [title, text] = section.text.split('_', 2);
        return (
          title.trim() && (
            <div key={index} className={`phyto-content-wrapper${index % 2 !== 0 ? '-reversed' : ''}`}>
              <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
              </div>
              <div className="phyto-info-section">
                <div className="phyto-benefits-heading">{title}</div>
                <div className="section-divider"></div>
                <p className="phyto-benefits-text">{text}</p>
                {index % 2 === 0 && <div className="vertical-divider-right"></div>}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};