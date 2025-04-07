import React, { useState } from "react";
import "./UsesOfPlant.css";
import vector166 from "./vector-166.svg";
import vector167 from "./vector-167.svg";
import ellipse89 from "./ellipse-89.svg";
import vector166E from "./vector-166-e.svg";
import longDownArrow from "./long-down-arrow.svg";
// Import specific images for each section
import nutritionalImage from "./nutritional.png";
import medicineImage from "./uses2.png";
import additionalImage from "./uses3.png";

export const UsesOfPlant = ({sections}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Function to get the appropriate image based on section id
  const getSectionImage = (sectionId) => {
    switch(sectionId) {
      case "nutritional":
        return nutritionalImage;
      case "medicine":
        return medicineImage;
      case "additional":
        return additionalImage;
      default:
        return nutritionalImage; // Default fallback
    }
  };

  const handleReadMore = (section={sections}) => {
    setExpandedSection(prev => prev === section ? null : section);
  };
  
  return (
    <div className="uses-of-plant-container">
      <div className="uses-of-plant-header">
        <div className="uses-of-plant-title">Uses of {sections[0].plant_name}</div>
      </div>

      {sections.map(section => (
        <div key={section.id} className={`uses-container-${section.id}`}>
          <div className="circle-inverted" />
          <img 
            src={getSectionImage(section.id)} 
            alt={`${section.id} icon`} 
            className="circle-image" 
          />
          <div className={`text-vector-group ${expandedSection === section.id ? 'expanded' : ''}`}>
            <div className={section.id}>{section.title}</div>
            <div className={`${section.id}-text-text`}>{section.flavourtext}</div>
            <img
              alt="nsvg"
              src={expandedSection === section.id ? vector166E : vector166}
              className={`vector-166 ${expandedSection === section.id ? 'expanded' : ''}`}
            />
            {expandedSection !== section.id && <img alt="nsvg" src={vector167} className="vector-167" />}
          </div>

          {expandedSection === section.id && (
            <>
              <div className="text-vector-group">
                <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                <div className={`${section.id}-text-header`}>{section.header}</div>
                <div className={`${section.id}-text-text`}>{section.text}</div>
              </div>
              <div className="text-vector-group">
                <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                <div className={`${section.id}-text-header`}>{section.header}</div>
                <div className={`${section.id}-text-text`}>{section.text}</div>
              </div>
            </>
          )}

          <div className="button-container">
            <button className="read-more-button" onClick={() => handleReadMore(section.id)}>
              {expandedSection === section.id ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      ))}

      <div className="uses-of-plant-container" style={{ marginLeft: '100px' }}>
        <img
          alt="down arrow"
          src={longDownArrow}
          className="down-arrow-icon"
          style={{ marginTop: '120px', marginBottom: '160px', marginLeft: '40px' }}
        />
        <div className="button-container-bibliography">
          <a href="" className="bibliography-button">
            BIBLIOGRAPHY
          </a>
        </div>
      </div>
    </div>
  );
};