import React from "react";
import "./CommonNames.css";

export const CommonNames = ({ sections }) => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  // Extract titles and content from sections
  const plant_names = sections[0]?.plantName || "Unknown Plant";
  const titles = sections.map(item => item.text ? item.text.split(';')[0].trim() : "").filter(title => title !== "");
  const contentArray = sections.map(item => item.text ? item.text.split(';')[1]?.trim() : "").filter(content => content !== "");

  return (
    <div className="common-names-container">
        <div className="common-names-header">
            <div className="common-names-title">Common names of {plant_names}</div>
        </div>

        <div className="common-names-items">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div 
              className={`common-names-item ${expandedItem === item ? 'expanded' : ''}`} 
              key={item}
              onClick={() => toggleItem(item)}
            >
              <div className="common-names-item-overlap">
                <div className="common-names-item-title">{titles[item - 1]}</div>
                <div className="common-names-item-icon-wrapper">
                  <img
                    className="common-names-item-icon"
                    alt="Expand icon"
                    src="https://c.animaapp.com/Vg2l9Q1d/img/vector-148-4.svg"
                  />
                </div>
                {expandedItem === item && (
                  <div className="common-names-content">
                    <div className="content-line" />
                    <div className="content-text">{contentArray[item - 1]}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};