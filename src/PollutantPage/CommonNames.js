import React from "react";
import "./CommonNames.css";

export const CommonNames = ({ sections }) => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  // Extract titles and content from sections
  const titles = sections.map(item => item.text.split(';')[0].trim());
  const contentArray = sections.map(item => item.text.split(';')[1].trim());

  return (
    <div className="common-names-container">
        <div className="common-names-header">
            <div className="common-names-rectangle" />
            <div className="common-names-underline" />
            <div className="common-names-title">Common names of plants</div>
        </div>
        <div className="common-names-items">
          {sections.map((item, index) => (
            <div 
              className={`common-names-item ${expandedItem === index ? 'expanded' : ''}`} 
              key={index}
              onClick={() => toggleItem(index)}
            >
              <div className="common-names-overlap">
                <div className="common-names-item-title">{titles[index]}</div>
                <div className="common-names-item-icon-wrapper">
                  <img
                    className="common-names-item-icon"
                    alt="Expand icon"
                    src={`https://c.animaapp.com/Vg2l9Q1d/img/vector-148-${index % 2 === 0 ? 6 : 4}.svg`}
                  />
                </div>
              </div>
              {expandedItem === index && (
                <div className="common-names-content">
                  <div className="content-line" />
                  <div className="content-text">{contentArray[index]}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};