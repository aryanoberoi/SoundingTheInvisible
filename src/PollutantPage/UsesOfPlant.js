import React, { useState, useRef, useEffect } from "react";
import "./UsesOfPlant.css";
import vector167 from "./vector-167.svg";
import ellipse89 from "./ellipse-89.svg";
import longDownArrow from "./long-down-arrow.svg";
// Import specific images for each section
import nutritionalImage from "./nutritional.png";
import medicineImage from "./uses2.png";
import additionalImage from "./uses3.png";

export const UsesOfPlant = ({ sectionsData }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const contentRefs = useRef({});
  const sectionRefs = useRef({});
  
  // Destructure props
  const { plantName, sections: groupedSections } = sectionsData;
  
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

  const handleReadMore = (sectionId) => {
    // If we're currently expanded and about to collapse
    if (expandedSection === sectionId) {
      // Store reference to section element before state update
      const sectionElement = sectionRefs.current[sectionId];
      
      if (sectionElement) {
        // Get the current position of the section
        const rect = sectionElement.getBoundingClientRect();
        const offsetPosition = window.pageYOffset + rect.top - 50; // 50px above the section
        
        // First update state
        setExpandedSection(null);
        
        // Then scroll in the next tick after React has updated the DOM
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        });
      } else {
        setExpandedSection(null);
      }
    } else {
      // If we're expanding, just set the state
      setExpandedSection(sectionId);
    }
  };
  
  return (
    <div className="uses-of-plant-container">
      <div className="uses-of-plant-header">
        <div className="uses-of-plant-title">Uses of {plantName}</div>
      </div>

      {groupedSections.map(section => (
        <div 
          key={section.id} 
          className={`uses-container-${section.id}`}
          ref={el => sectionRefs.current[section.id] = el}
        >
          <div className="circle-inverted" />
          <img 
            src={getSectionImage(section.id)} 
            alt={`${section.id} icon`} 
            className="circle-image" 
          />
          
          <div className={`text-vector-group ${expandedSection === section.id ? 'expanded' : ''}`}>
            {/* Section title and flavor text */}
            <div className={section.id}>{section.title}</div>
            <div className={`${section.id}-text-text`}>{section.flavourtext}</div>
            
            {/* Content container */}
            <div ref={el => contentRefs.current[section.id] = el} className="items-content-container">
              {/* When collapsed, show only the first item */}
              {expandedSection !== section.id && section.items.length > 0 && (
                <>
                  <div className="collapsed-header-container" style={{ position: 'relative' }}>
                    <img 
                      src={ellipse89} 
                      alt="ellipse" 
                      style={{
                        width: '33px',
                        height: '33px',
                        position: 'absolute',
                        left: '-22px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2
                      }} 
                    />
                    <div className={`${section.id}-text-header`}>
                      {section.items[0].header}
                    </div>
                  </div>
                  <div className={`${section.id}-text-text`}>
                    {section.items[0].text}
                  </div>
                  {/* Add bottom border element */}
                  <span className="bottom-border"></span>
                  {/* Add dotted border extension for unexpanded state */}
                  <span className="bottom-border-dotted"></span>
                  {/* Add small circle at the end of top border */}
                  <span className="top-border-circle"></span>
                </>
              )}
              
              {/* When expanded, show all items with each having its own ellipse */}
              {expandedSection === section.id && 
                <>
                  {section.items.map((item, index) => (
                    <div key={index} className="overlay-container" style={{ position: 'relative', marginBottom: '25px' }}>
                      <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                      <div className={`${section.id}-text-header`}>
                        {item.header}
                      </div>
                      <div className={`${section.id}-text-text`}>
                        {item.text}
                      </div>
                    </div>
                  ))}
                  {/* Add bottom border for expanded state */}
                  <span className="bottom-border"></span>
                  {/* Add small circle at the end of bottom border for expanded state */}
                  <span className="bottom-border-circle"></span>
                  {/* Add small circle at the end of top border */}
                  <span className="top-border-circle"></span>
                </>
              }
            </div>
          </div>

          {/* Show Read More/Less button if there's at least one item */}
          {section.items.length >= 1 && (
            <div className="button-container">
              <button className="read-more-button" onClick={() => handleReadMore(section.id)}>
                {expandedSection === section.id ? 'Show Less' : 'Read More'}
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="uses-of-plant-container" style={{ marginLeft: '100px' }}>
        <img
          alt="down arrow"
          src={longDownArrow}
          className="down-arrow-icon"
          style={{ marginTop: '120px', marginBottom: '160px', marginLeft: '40px' }}
        />
        <div id="references" className="button-container-bibliography">
          <a href="" className="bibliography-button">
            BIBLIOGRAPHY
          </a>
        </div>
      </div>
    </div>
  );
};