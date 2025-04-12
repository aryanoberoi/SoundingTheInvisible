import React from "react";
import "./PhytoCapacity.css";

export const PhytoCapacity = ({ sections }) => {
  // Find the first section object that has a plantName property
  const plantNameSection = sections.find(section => section.plantName);
  const plantName = plantNameSection?.plantName || "Unknown Plant";

  // Find the introductory section
  const introSection = sections.find(section => section.type === 'intro');

  // Filter out the intro and plantName sections for mapping the pollutant details
  const pollutantSections = sections.filter(section => !section.type && !section.plantName);

  return (
    <div className="phyto-capacity-container">
      <div className="phyto-capacity-header">
        <div className="phyto-capacity-title">Phytoremediation capacity of {plantName}</div>
      </div>

      {/* Render the introductory paragraph if it exists */}
      {introSection && (
        <p className="phyto-intro-text">{introSection.text}</p>
      )}

      {/* Render the pollutant sections */}
      {pollutantSections.map((section, index) => {
        // Ensure section.text is defined before splitting
        if (!section.text) return null;

        const [title, text] = section.text.split('_', 2);
        // Ensure title is not empty after split before rendering
        return (
          title?.trim() && (
            <div key={index} className={`phyto-content-wrapper${index % 2 !== 0 ? '-reversed' : ''}`}>
              <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
              </div>
              <div className="phyto-info-section">
                <div className="phyto-benefits-heading">{title.trim()}</div>
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