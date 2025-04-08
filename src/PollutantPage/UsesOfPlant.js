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
  
  // Function to update vector positioning and height
  const updateVectorPositioning = () => {
    requestAnimationFrame(() => {
      Object.keys(vectorRefs.current).forEach(sectionId => {
        const vectorEl = vectorRefs.current[sectionId];
        const containerEl = document.querySelector(`.uses-container-${sectionId}`);
        const textVectorGroupEl = containerEl?.querySelector(`.text-vector-group`);
        const firstTextEl = containerEl?.querySelector(`.${sectionId}-text-text`);
        
        if (vectorEl && containerEl && textVectorGroupEl && firstTextEl) {
          // Get the position of the first text element to set top position
          const textBottom = firstTextEl.offsetTop + firstTextEl.offsetHeight;
          vectorEl.style.top = `${textBottom}px`;
          
          if (expandedSection === sectionId) {
            // For expanded state: height = container height - 180px
            const containerHeight = containerEl.offsetHeight;
            vectorEl.style.height = `${containerHeight - 180}px`;
            vectorEl.classList.add('expanded');
          } else {
            // For unexpanded state: height = text-vector-group height - 80px
            const textVectorGroupHeight = textVectorGroupEl.offsetHeight;
            vectorEl.style.height = `${textVectorGroupHeight - 80}px`;
            vectorEl.classList.remove('expanded');
          }
        }
      });
    });
  };

  // Run when expandedSection changes
  useEffect(() => {
    updateVectorPositioning();
  }, [expandedSection]);
  
  // Run multiple times to ensure correct positioning on initial render
  useEffect(() => {
    // Initial render with slight delay to ensure DOM is ready
    const initialRenderTimer = setTimeout(() => {
      updateVectorPositioning();
    }, 0);
    
    // Additional check after a longer delay to catch any late layout changes
    const secondaryRenderTimer = setTimeout(() => {
      updateVectorPositioning();
    }, 500);
    
    // For handling resize events
    const handleResize = () => {
      updateVectorPositioning();
    };
    
    window.addEventListener('resize', handleResize);
    
    // For ensuring all images and assets are loaded
    window.addEventListener('load', updateVectorPositioning);
    
    // Create a MutationObserver to watch for DOM changes that might affect layout
    const observer = new MutationObserver(() => {
      updateVectorPositioning();
    });
    
    // Start observing the container element
    const containers = document.querySelectorAll('[class^="uses-container-"]');
    if (containers.length > 0) {
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    // Cleanup
    return () => {
      clearTimeout(initialRenderTimer);
      clearTimeout(secondaryRenderTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', updateVectorPositioning);
      observer.disconnect();
    };
  }, []);
  
  // Force positioning update after component has fully rendered
  useEffect(() => {
    // Use requestIdleCallback or setTimeout as fallback
    const idleCallback = window.requestIdleCallback || setTimeout;
    const id = idleCallback(() => {
      updateVectorPositioning();
    });
    
    return () => {
      if (window.requestIdleCallback) {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);
  
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
              {expandedSection !== section.id && (
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
                </>
              )}
              
              {/* When expanded, show all items with each having its own ellipse */}
              {expandedSection === section.id && 
                section.items.map((item, index) => (
                  <div key={index} className="overlay-container" style={{ position: 'relative', marginBottom: '25px' }}>
                    <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                    <div className={`${section.id}-text-header`}>
                      {item.header}
                    </div>
                    <div className={`${section.id}-text-text`}>
                      {item.text}
                    </div>
                  </div>
                ))
              }
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