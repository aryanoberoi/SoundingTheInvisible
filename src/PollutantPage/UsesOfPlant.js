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

export const UsesOfPlant = ({ sections }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const vectorRefs = useRef({});
  const contentRefs = useRef({});
  
  // Group sections by ID
  const groupSectionsByID = () => {
    const grouped = {};
    
    sections.forEach(section => {
      const { id } = section;
      
      if (!grouped[id]) {
        grouped[id] = {
          id: section.id,
          title: section.title,
          plant_name: section.plant_name || sections[0].plant_name,
          flavourtext: section.flavourtext,
          items: []
        };
      }
      
      grouped[id].items.push({
        header: section.header,
        text: section.text
      });
    });
    
    return Object.values(grouped);
  };
  
  const groupedSections = groupSectionsByID();
  
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
  
  // Update vector height when content changes
  useEffect(() => {
    Object.keys(vectorRefs.current).forEach(sectionId => {
      const vectorEl = vectorRefs.current[sectionId];
      const contentEl = contentRefs.current[sectionId];
      
      if (vectorEl && contentEl) {
        if (expandedSection === sectionId) {
          // Set height for expanded state
          vectorEl.style.height = `${contentEl.offsetHeight}px`;
          vectorEl.classList.add('expanded');
        } else {
          // Reset height for collapsed state
          vectorEl.style.removeProperty('height');
          vectorEl.classList.remove('expanded');
        }
      }
    });
  }, [expandedSection]);
  
  return (
    <div className="uses-of-plant-container">
      <div className="uses-of-plant-header">
        <div className="uses-of-plant-title">Uses of {sections[0].plant_name}</div>
      </div>

      {groupedSections.map(section => (
        <div key={section.id} className={`uses-container-${section.id}`}>
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
            <div ref={el => contentRefs.current[section.id] = el}>
              {/* When collapsed, show only the first item */}
              {(expandedSection !== section.id || section.items.length === 1) && (
                <>
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className={`${section.id}-text-header`}>
                    {section.items[0].header}
                  </div>
                  <div className={`${section.id}-text-text`}>
                    {section.items[0].text}
                  </div>
                </>
              )}
              
              {/* When expanded, show all items */}
              {expandedSection === section.id && (
                <>
                  {section.items.map((item, index) => (
                    <div key={index}>
                      <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                      <div className={`${section.id}-text-header`}>
                        {item.header}
                      </div>
                      <div className={`${section.id}-text-text`}>
                        {item.text}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            
            {/* Background vector - use different SVGs for expanded/collapsed states */}
            <img
              alt="nsvg"
              src={expandedSection === section.id ? vector166E : vector166}
              className={`vector-166 ${expandedSection === section.id ? 'expanded' : ''}`}
              ref={el => vectorRefs.current[section.id] = el}
            />
            
            {/* Only show the decorative vector when collapsed */}
            {expandedSection !== section.id && (
              <img alt="nsvg" src={vector167} className="vector-167" />
            )}
          </div>

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