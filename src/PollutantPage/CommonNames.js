import React from "react";
import "./CommonNames.css";

export const CommonNames = ({ sections }) => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Extract plant name from the first element
  const plant_names = sections[0]?.plantName || "Unknown Plant";
  // Get the actual name entries (skip the first element which is just the plant name)
  const nameEntries = sections.slice(1);

  return (
    <div className="common-names-container">
        <div className="common-names-header">
            <div className="common-names-title">Common names of {plant_names}</div>
        </div>

        <div className="common-names-items">
          {/* Map directly over the nameEntries array */}
          {nameEntries.map((entry, index) => {
            // Split the text into title (language) and content (names)
            const parts = entry.text ? entry.text.split(';') : ["Unknown", ""];
            const title = parts[0].trim();
            const content = parts[1] ? parts[1].trim() : "No details available";

            return (
              <div
                // Use index for key and expanded check
                className={`common-names-item ${expandedItem === index ? 'expanded' : ''}`}
                key={index}
                onClick={() => toggleItem(index)}
              >
                <div className="common-names-item-overlap">
                  <div className="common-names-item-title">{title}</div>
                  <div className="common-names-item-icon-wrapper">
                    <img
                      className="common-names-item-icon"
                      alt="Expand icon"
                      src="https://c.animaapp.com/Vg2l9Q1d/img/vector-148-4.svg"
                    />
                  </div>
                  {/* Check expandedItem against index */}
                  {expandedItem === index && (
                    <div className="common-names-content">
                      <div className="content-line" />
                      <div className="content-text">{content}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};