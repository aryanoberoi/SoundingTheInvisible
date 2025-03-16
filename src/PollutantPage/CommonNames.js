import React from "react";
import "./CommonNames.css";

export const CommonNames = () => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  // Array of content strings for each item
  const contentArray = [
    "erva-corneira",
    "erva-corneira",
    "erva-corneira",
    "erva-corneira",
    "erva-corneira",
    "erva-corneira",
    "erva-corneira",
    "erva-corneira"
  ];

  const titles = ["Portugese", "Malayalam", "Finnish", "Portugese", "Portugese", "Malayalam", "Finnish", "Portugese"];

  return (
    <div className="common-names-container">
        <div className="common-names-header">
            <div className="common-names-rectangle" />
            <div className="common-names-underline" />
            <div className="common-names-title">Common names of plant</div>
        </div>
        <div className="common-names-items">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div 
              className={`common-names-item ${expandedItem === item ? 'expanded' : ''}`} 
              key={item}
              onClick={() => toggleItem(item)}
            >
              <div className="common-names-overlap">
                <div className="common-names-item-title">{titles[item - 1]}</div>
                <div className="common-names-item-icon-wrapper">
                  <img
                    className="common-names-item-icon"
                    alt="Expand icon"
                    src={`https://c.animaapp.com/Vg2l9Q1d/img/vector-148-${item % 2 === 0 ? 6 : 4}.svg`}
                  />
                </div>
              </div>
              {expandedItem === item && (
                <div className="common-names-content">
                  <div className="content-line" />
                  <div className="content-text">{contentArray[item - 1]}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};