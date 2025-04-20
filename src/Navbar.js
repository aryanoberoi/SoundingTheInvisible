import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Import the expanded content components directly
// Assuming these files export React components
// If these imports cause errors, check the exact path to your files
import AgricultureWasteExpanded from './agriculture-waste-expanded';
import HeavyMetalWasteExpanded from './heavy-metal-waste-expanded';
import RadioactiveWasteExpanded from './radioactive-waste-expanded';
import SewageWasteExpanded from './sewage-waste-expanded';

// Enhanced InteractiveSVG component with cursor support
const InteractiveSVG = ({ src, className }) => {
  const [svgContent, setSvgContent] = useState(null);
  const svgContainerRef = useRef(null);
  
  useEffect(() => {
    // Fetch the SVG content
    fetch(src)
      .then(response => response.text())
      .then(text => {
        // Add data-cursor-invert attributes to SVG elements before rendering
        const enhancedSvg = text.replace('<svg', '<svg data-cursor-invert="true"');
        setSvgContent(enhancedSvg);
      })
      .catch(error => {
        console.error("Error loading SVG:", error);
      });
  }, [src]);

  // Make SVG container mouse-transparent for cursor tracking
  useEffect(() => {
    if (svgContainerRef.current) {
      // Ensure mouse events pass through for cursor tracking
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        // Make sure SVG responds to mouse events for interactivity
        // but still allows events to bubble up for cursor tracking
        svgElement.style.pointerEvents = 'auto';
      }
      
      // Add data attribute to container for cursor inversion
      svgContainerRef.current.setAttribute('data-cursor-invert', 'true');
    }
  }, [svgContent]);

  if (!svgContent) {
    return <div className={className}>Loading...</div>;
  }

  // Create a container that will render the SVG content as HTML
  return (
    <div 
      ref={svgContainerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [previousExpanded, setPreviousExpanded] = useState(null);
  const menuRef = useRef(null);
  const navLinksRef = useRef(null);
  const [menuScale, setMenuScale] = useState(1);
  const navigate = useNavigate();
  
  // List of navigation items for easy maintenance with their corresponding components
  const navItems = [
    { id: "agriculture-waste", text: "Agriculture waste", component: AgricultureWasteExpanded },
    { id: "heavy-metal-waste", text: "Heavy metal waste", component: HeavyMetalWasteExpanded },
    { id: "radioactive-waste", text: "Radioactive waste", component: RadioactiveWasteExpanded },
    { id: "sewage-waste", text: "Sewage waste", component: SewageWasteExpanded }
  ];

  // Add cursor interaction to the navbar
  useEffect(() => {
    // Set data attributes for cursor inversion on navbar elements
    const navElements = document.querySelectorAll('.nav-menu, .nav-item, .nav-arrow-button');
    navElements.forEach(el => {
      el.setAttribute('data-cursor-invert', 'true');
    });
    
    // Ensure menu is properly marked for cursor inversion
    if (menuRef.current) {
      menuRef.current.setAttribute('data-cursor-invert', 'true');
    }
  }, [isOpen, expandedItem]);

  // Calculate and apply scaling to fit menu in viewport including the 5% gap
  useEffect(() => {
    if (isOpen && !expandedItem && navLinksRef.current) {
      const updateMenuScale = () => {
        const viewportHeight = window.innerHeight;
        const menuHeight = navLinksRef.current.scrollHeight;
        const headerHeight = 60; // Approximate height of close button
        const topGap = viewportHeight * 0.05; // 5% of viewport height
        const footerBuffer = 20; // Space at bottom
        
        // Available height now accounts for the 5% top gap
        const availableHeight = viewportHeight - headerHeight - footerBuffer - topGap;
        
        if (menuHeight > availableHeight) {
          // Calculate scale needed to fit
          const newScale = availableHeight / menuHeight;
          // Don't scale below 0.65 to maintain readability
          setMenuScale(Math.max(0.65, newScale));
        } else {
          setMenuScale(1);
        }
      };
      
      updateMenuScale();
      window.addEventListener('resize', updateMenuScale);
      return () => window.removeEventListener('resize', updateMenuScale);
    } else if (expandedItem) {
      // Reset scale when an item is expanded to allow normal scrolling
      setMenuScale(1);
    }
  }, [isOpen, expandedItem]);

  // Track previous expanded state when it changes
  useEffect(() => {
    if (expandedItem) {
      setPreviousExpanded(expandedItem);
    }
  }, [expandedItem]);

  // Handle scrolling when expanded state changes
  useEffect(() => {
    if (!menuRef.current) return;

    // If we have a previously expanded item but now nothing is expanded (item was unexpanded)
    if (previousExpanded && !expandedItem) {
      // Scroll back to top with a slight delay to allow for transition
      setTimeout(() => {
        if (menuRef.current) {
          menuRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 50); // Delay to allow CSS transitions to start
    }
    // If something is expanded, handle scroll to the expanded item
    else if (expandedItem) {
      const scrollTimer = setTimeout(() => {
        const element = menuRef.current?.querySelector('.expanded');
        if (element) {
          // Calculate if this is the last item
          const isLastItem = element === element.parentNode.lastElementChild;

          // Adjust scroll behavior based on position
          element.scrollIntoView({
            behavior: 'smooth',
            // Use 'start' for most items, but 'center' for last item
            block: isLastItem ? 'center' : 'start'
          });

          // For the last item, add extra scroll to ensure visibility
          if (isLastItem && menuRef.current) {
            // Add a bit more scroll for the last item
            setTimeout(() => {
              // Check if menuRef still exists before scrolling
              if (menuRef.current) {
                 menuRef.current.scrollTop += 600; // Adjusted extra scroll value
              }
            }, 100); // Delay after scrollIntoView
          }
        }
      }, 50); // Small delay to ensure DOM has updated

      return () => clearTimeout(scrollTimer);
    }
    // Reset previousExpanded when nothing is expanded (e.g., initial state or after closing)
    else if (!expandedItem) {
        setPreviousExpanded(null);
    }
  }, [expandedItem, previousExpanded]); // Depend on both states

  // Modified to separate expand and collapse logic
  const handleItemClick = (text) => {
    // If no item is currently expanded, expand the clicked item
    if (!expandedItem) {
      setExpandedItem(text);
    }
    // If the clicked item is already expanded, we'll leave it to the X button to collapse
  };
  
  // Function specifically for collapsing
  const handleCollapseClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setExpandedItem(null);
  };
  
  // New function to handle SVG element clicks
  const handleSvgElementClick = (e, action) => {
    e.stopPropagation();
    
    // Check if the click was on or within an SVG element with data-action attribute
    const clickedElement = e.target.closest('[data-action]');
    if (clickedElement) {
      const action = clickedElement.getAttribute('data-action');
      
      // Handle different actions
      switch (action) {
        case 'navigate':
          const route = clickedElement.getAttribute('data-route');
          if (route) {
            navigate(route);
          }
          break;
        case 'link':
          const url = clickedElement.getAttribute('data-url');
          if (url) {
            window.open(url, '_blank');
          }
          break;
        case 'toggle':
          const targetId = clickedElement.getAttribute('data-target');
          // Handle toggle logic here
          break;
        default:
          console.log(`Unknown action: ${action}`);
      }
    }
  };
  
  // Event delegation for SVG interactions
  useEffect(() => {
    // Add global click handler for SVG interactions
    const handleDocumentClick = (e) => {
      // Check if click is within an expanded item's SVG
      const expandedSvg = document.querySelector('.nav-item.expanded .nav-underline');
      if (expandedSvg && expandedSvg.contains(e.target)) {
        handleSvgElementClick(e);
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expandedItem]);
  
  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - only visible when menu is closed */}
      {!isOpen && (
        <button 
          className="nav-button" 
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          data-cursor-invert="true"
        >
          <div className="hamburger">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      )}

      {/* Fullscreen Menu */}
      <nav 
        className={`nav-menu ${isOpen ? "open" : ""} ${expandedItem ? "has-expanded-item" : ""}`}
        ref={menuRef}
        aria-hidden={!isOpen}
        role="navigation"
        style={{ scrollBehavior: 'smooth' }}
        data-cursor-invert="true"
      >
        <button 
          className="close-btn" 
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
          data-cursor-invert="true"
        >
          ✕
        </button>

        {/* Apply dynamic scaling to menu items container with 5% top padding */}
        <div 
          className="menu-container" 
          style={{
            transform: expandedItem ? 'none' : `scale(${menuScale})`,
            transformOrigin: 'center top',
            height: expandedItem ? 'auto' : '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: expandedItem ? 'flex-start' : 'center',
            transition: 'transform 0.3s ease',
            paddingTop: expandedItem ? '0' : '7%',
          }}
          data-cursor-invert="true"
        >
          <ul 
            className={`nav-links ${expandedItem ? 'has-expanded' : ''}`}
            ref={navLinksRef}
            role="menu"
            data-cursor-invert="true"
          >
            {navItems.map((item) => {
              const isExpanded = expandedItem === item.text;
              const iconPath = `${item.id}-icon.svg`;
              const { component: ExpandedComponent } = item;
              
              return (
                <li 
                  key={item.id} 
                  className={`nav-item ${isExpanded ? 'expanded' : ''}`}
                  role="menuitem"
                  data-cursor-invert="true"
                >
                  <div 
                    // Only attach click handler if not expanded
                    onClick={!isExpanded ? () => handleItemClick(item.text) : undefined}
                    className="nav-item-header"
                    tabIndex={isOpen ? 0 : -1}
                    aria-expanded={isExpanded}
                    aria-controls={`${item.id}-content`}
                    data-cursor-invert="true"
                  >
                    <div className="nav-item-content" data-cursor-invert="true">
                      {/* Use img instead of object for better performance */}
                      <img
                        src={iconPath}
                        alt={`${item.text} icon`}
                        className="nav-icon"
                        loading="lazy"
                        data-cursor-invert="true"
                      />
                      <div className="nav-item-text" data-cursor-invert="true">{item.text}</div>
                      
                      {/* Toggle button with appropriate semantics */}
                      <button
                        className="nav-arrow-button"
                        onClick={isExpanded ? handleCollapseClick : (e) => {
                          e.stopPropagation();
                          handleItemClick(item.text);
                        }}
                        aria-label={isExpanded ? `Collapse ${item.text}` : `Expand ${item.text}`}
                        data-cursor-invert="true"
                      >
                        {isExpanded ? (
                          <span className="nav-arrow" data-cursor-invert="true">✕</span>
                        ) : (
                          <img
                            src="down-arrow.svg"
                            alt="Expand"
                            className="nav-arrow"
                            data-cursor-invert="true"
                          />
                        )}
                      </button>
                    </div>
                    
                    <div className="underline-container" data-cursor-invert="true">
                      {isExpanded ? (
                        <ExpandedComponent className="nav-underline expanded-underline" />
                      ) : (
                        // Use regular img for non-expanded items
                        <img
                          src="underline.svg"
                          alt=""
                          className="nav-underline"
                          aria-hidden="true"
                          data-cursor-invert="true"
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      
      {/* Optional backdrop for better UX */}
      {isOpen && (
        <div 
          className="nav-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          data-cursor-invert="true"
        />
      )}
    </>
  );
};

export default Navbar;