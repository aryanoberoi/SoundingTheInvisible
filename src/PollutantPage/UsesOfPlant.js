import React, { useState, useRef, useEffect } from "react";
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
  // Create refs for each section's header and text elements
  const headerRefs = useRef({});
  const textRefs = useRef({});
  const vectorRefs = useRef({});
  
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

  const handleReadMore = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };
  
  // Calculate and adjust vector height when a section expands or collapses
  useEffect(() => {
    // Loop through all sections to reset or set vector heights
    Object.keys(vectorRefs.current).forEach(sectionId => {
      const vectorEl = vectorRefs.current[sectionId];
      
      if (vectorEl) {
        if (expandedSection === sectionId) {
          // Section is expanded - calculate and set the exact height
          const headerEl = headerRefs.current[sectionId];
          const textEl = textRefs.current[sectionId];
          
          if (headerEl && textEl) {
            const headerHeight = headerEl.offsetHeight;
            const textHeight = textEl.offsetHeight;
            const combinedHeight = headerHeight + textHeight + 40; // Adding margin/padding
            
            // Set the height of the vector
            vectorEl.style.height = `${combinedHeight}px`;
          }
        } else {
          // Section is collapsed - reset to original height (remove inline style)
          vectorEl.style.removeProperty('height');
        }
      }
    });
  }, [expandedSection]);
  
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

            <img src={ellipse89} alt="ellipse" className="ellipse-89" />
            <div 
              className={`${section.id}-text-header`}
              ref={el => headerRefs.current[section.id] = el}
            >
              {section.header}
            </div>
            <div 
              className={`${section.id}-text-text`}
              ref={el => textRefs.current[section.id] = el}
            >
              {section.text}
            </div>
            <img
              alt="nsvg"
              src={expandedSection === section.id ? vector166E : vector166E}
              className={`vector-166 ${expandedSection === section.id ? 'expanded' : ''}`}
              ref={el => vectorRefs.current[section.id] = el}
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