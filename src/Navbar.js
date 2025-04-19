import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [previousExpanded, setPreviousExpanded] = useState(null);
  const menuRef = useRef(null);
  const navLinksRef = useRef(null);
  const [menuScale, setMenuScale] = useState(1);
  const navigate = useNavigate();
  
  // List of navigation items for easy maintenance
  const navItems = [
    { id: "agriculture-waste", text: "Agriculture waste" },
    { id: "heavy-metal-waste", text: "Heavy metal waste" },
    { id: "radioactive-waste", text: "Radioactive waste" },
    { id: "sewage-waste", text: "Sewage waste" }
  ];

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
    // (This function won't be called for collapse anymore)
  };
  
  // New function specifically for collapsing
  const handleCollapseClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setExpandedItem(null);
  };
  
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
      >
        <button 
          className="close-btn" 
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
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
        >
          <ul 
            className={`nav-links ${expandedItem ? 'has-expanded' : ''}`}
            ref={navLinksRef}
            role="menu"
          >
            {navItems.map((item) => {
              const isExpanded = expandedItem === item.text;
              const iconPath = `${item.id}-icon.svg`;
              const expandedPath = `${item.id}-expanded.svg`;
              
              return (
                <li 
                  key={item.id} 
                  className={`nav-item ${isExpanded ? 'expanded' : ''}`}
                  role="menuitem"
                >
                  <div 
                    // Only attach click handler if not expanded
                    onClick={!isExpanded ? () => handleItemClick(item.text) : undefined}
                    className="nav-item-header"
                    tabIndex={isOpen ? 0 : -1}
                    aria-expanded={isExpanded}
                    aria-controls={`${item.id}-content`}
                  >
                    <div className="nav-item-content">
                      {/* Use img instead of object for better performance */}
                      <img
                        src={iconPath}
                        alt={`${item.text} icon`}
                        className="nav-icon"
                        loading="lazy"
                      />
                      <div className="nav-item-text">{item.text}</div>
                      
                      {/* Toggle button with appropriate semantics */}
                      <button
                        className="nav-arrow-button"
                        onClick={isExpanded ? handleCollapseClick : (e) => {
                          e.stopPropagation();
                          handleItemClick(item.text);
                        }}
                        aria-label={isExpanded ? `Collapse ${item.text}` : `Expand ${item.text}`}
                      >
                        {isExpanded ? (
                          <span className="nav-arrow">✕</span>
                        ) : (
                          <img
                            src="down-arrow.svg"
                            alt="Expand"
                            className="nav-arrow"
                          />
                        )}
                      </button>
                    </div>
                    
                    <div className="underline-container">
                      <img
                        src={isExpanded ? expandedPath : "underline.svg"}
                        alt=""
                        className={`nav-underline ${isExpanded ? 'expanded-underline' : ''}`}
                        aria-hidden="true"
                      />
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
        />
      )}
    </>
  );
};

export default Navbar;