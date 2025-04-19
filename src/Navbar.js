import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  // List of navigation items for easy maintenance
  const navItems = [
    { id: "agriculture-waste", text: "Agriculture waste" },
    { id: "heavy-metal-waste", text: "Heavy metal waste" },
    { id: "radioactive-waste", text: "Radioactive waste" },
    { id: "sewage-waste", text: "Sewage waste" }
  ];

  const handleItemClick = (text) => {
    setExpandedItem(prevExpanded => prevExpanded === text ? null : text);
  };
  
  // Effect to scroll to expanded item
  useEffect(() => {
    if (!expandedItem) return;
    
    const element = menuRef.current?.querySelector('.expanded');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        className={`nav-menu ${isOpen ? "open" : ""}`} 
        ref={menuRef}
        aria-hidden={!isOpen}
        role="navigation"
      >
        <button 
          className="close-btn" 
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
        >
          ✕
        </button>

        <ul 
          className={`nav-links ${expandedItem ? 'has-expanded' : ''}`}
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
                  onClick={() => handleItemClick(item.text)}
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
                      onClick={(e) => {
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