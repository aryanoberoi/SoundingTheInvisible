import React from "react";
import "./PhytoCapacity.css";

export const PhytoCapacity = ({ sections }) => {
  return (
    <div className="phyto-capacity-container">
      <div className="phyto-capacity-header">
        <div className="phyto-capacity-rectangle" />
        <div className="phyto-capacity-underline" />
        <div className="phyto-capacity-title">Phytoremediation capacity of the Plant</div>
      </div>

      {sections.map((section, index) => (
        section.title.trim() && (
          <div key={index} className={`phyto-content-wrapper${index % 2 !== 0 ? '-reversed' : ''}`}>
            <div className="phyto-svg-container">
              <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
            </div>
            <div className="phyto-info-section">
              <div className="phyto-benefits-heading">{section.title}</div>
              <div className="section-divider"></div>
              <p className="phyto-benefits-text">{section.text}</p>
              {index % 2 === 0 && <div className="vertical-divider-right"></div>}
            </div>
          </div>
        )
      ))}
    </div>
  );
};