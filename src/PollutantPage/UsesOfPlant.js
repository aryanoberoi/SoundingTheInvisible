import React, { useState, useRef, useEffect } from "react";
import "./UsesOfPlant.css";
import vector167 from "./vector-167.svg";
import ellipse89 from "./ellipse-89.svg";
import longDownArrow from "./long-down-arrow.svg";
// Import specific images for each section
import nutritionalImage from "./nutritional.png";
import medicineImage from "./uses2.png";
import additionalImage from "./uses3.png";

// Helper function to find the scrollable parent container
const getScrollableParent = (element) => {
  if (!element) return document.body;

  // Start with the element's parent
  let parent = element.parentElement;
  
  while (parent) {
    // Check if this parent is scrollable
    const hasScrollableContent = parent.scrollHeight > parent.clientHeight;
    const overflowYStyle = window.getComputedStyle(parent).overflowY;
    const isScrollable = overflowYStyle !== 'hidden' && overflowYStyle !== 'visible';
    
    if (hasScrollableContent && isScrollable) {
      return parent;
    }
    
    // Move up the DOM tree
    parent = parent.parentElement;
  }
  
  // If no scrollable parent found, return document.body
  return document.body;
};

export const UsesOfPlant = ({ sectionsData }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [previouslyCollapsed, setPreviouslyCollapsed] = useState(null);
  const [scrollData, setScrollData] = useState(null);
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

  // Updated handler that captures scroll data before collapsing
  const handleReadMore = (sectionId) => {
    if (expandedSection === sectionId) {
      // We're about to collapse, store section id and capture positioning data
      const sectionElement = sectionRefs.current[sectionId];
      if (sectionElement) {
        // Record section ID to track which one was collapsed
        setPreviouslyCollapsed(sectionId);
        
        try {
          // Find the scrollable container (either combined-section or content-sections)
          const scrollContainer = getScrollableParent(sectionElement);
          
          // Store container and position information
          setScrollData({
            sectionId,
            // Store section position relative to its scrollable container
            sectionTop: sectionElement.getBoundingClientRect().top - 
                        scrollContainer.getBoundingClientRect().top,
            // Store container reference for later use
            containerId: scrollContainer.id || 
                         scrollContainer.className.split(' ')[0] || 
                         'unknown-container'
          });
        } catch (err) {
          console.error("Error capturing scroll position:", err);
        }
      }
    }
    
    // Toggle the expanded state
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  
  // Effect to handle scrolling after DOM updates
  useEffect(() => {
    // Only run when we have collapse data and section is no longer expanded
    if (previouslyCollapsed && expandedSection === null && scrollData) {
      const sectionElement = sectionRefs.current[previouslyCollapsed];
      
      if (sectionElement) {
        // Use animation frame to wait for rendering
        window.requestAnimationFrame(() => {
          // Add longer delay to ensure transitions complete
          setTimeout(() => {
            try {
              // Find the scrollable container again after DOM update
              const scrollContainer = getScrollableParent(sectionElement);
              
              if (scrollContainer) {
                // Get current positions after collapse
                const sectionRect = sectionElement.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();
                
                // Calculate the target scroll position
                // This uses the section's position relative to the scroll container
                const targetScrollTop = scrollContainer.scrollTop + 
                                       (sectionRect.top - containerRect.top) - 
                                       70; // Offset for better visibility
                
                // Perform the scroll on the container element
                scrollContainer.scrollTo({
                  top: targetScrollTop,
                  behavior: 'smooth'
                });
                
                console.log(`Scrolled ${scrollContainer.className} to ${targetScrollTop}px for section ${previouslyCollapsed}`);
              }
            } catch (err) {
              console.error("Error scrolling to collapsed section:", err);
              
              // Fallback: try simple scrollIntoView
              try {
                sectionElement.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center'
                });
              } catch (fallbackErr) {
                console.error("Fallback scroll also failed:", fallbackErr);
              }
            }
            
            // Clear tracking state
            setPreviouslyCollapsed(null);
            setScrollData(null);
          }, 50); // Increased delay to ensure transitions complete
        });
      }
    }
  }, [expandedSection, previouslyCollapsed, scrollData]);
  
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