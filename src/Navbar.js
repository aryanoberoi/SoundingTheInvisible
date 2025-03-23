import React, { useState, useRef } from "react";
import "./App.css"; // All styles go here
import "./pollutantPage.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleItemClick = (text) => {
    // Only expand if not already expanded
    if (expandedItem !== text) {
      setExpandedItem(text);
      
      // Scroll to expanded item after state update
      setTimeout(() => {
        const element = menuRef.current?.querySelector('.expanded');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'auto', 
            block: 'start' 
          });
        }
      }, 0);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      {!isOpen && (
        <button className="nav-button" onClick={() => setIsOpen(true)}>
          <div className="hamburger">
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          </div>
        </button>
      )}

      {/* Fullscreen Menu */}
      <div 
        className={`nav-menu ${isOpen ? "open" : ""}`} 
        ref={menuRef}
      >
        <span className="close-btn" onClick={() => {
          setIsOpen(false);
        }} style={{ color: 'white' }}>✕</span>

        <ul className={`nav-links ${expandedItem ? 'has-expanded' : ''}`}>
          {["Agriculture waste", "Heavy metal waste", "Radioactive waste", "Sewage waste"].map((text, index) => (
            <li 
              key={index} 
              className={`nav-item ${expandedItem === text ? 'expanded' : ''}`}
              style={{ width: '100%' }}
            >
              <div 
                onClick={() => handleItemClick(text)}
                className="nav-item-header"
                style={{ width: '100%' }}
              >
                <div className="nav-item-content">
                  <object
                    type="image/svg+xml" 
                    data={`${text.toLowerCase().replace(/ /g, "-")}-icon.svg`}  
                    aria-label={text}
                    className="nav-icon" 
                  />
                  <div className="nav-item-text" style={{ fontSize: '40px' }}>{text}</div>
                  {expandedItem === text ? (
                    <span
                      className="nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedItem(null);
                      }}
                    >
                      ✕
                    </span>
                  ) : (
                    <img
                      src="down-arrow.svg"
                      alt="More info"
                      className="nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(text);
                      }}
                    />
                  )}
                </div>
                <div 
                  className="underline-container"
                >
                  <object
                    type="image/svg+xml" 
                    data={expandedItem === text ? 
                      `${text.toLowerCase().replace(/ /g, "-")}-expanded.svg` : 
                      "underline.svg"}
                    aria-label={expandedItem === text ? "Expanded section indicator" : "Section underline"}
                    className={`nav-underline ${expandedItem === text ? 'expanded-underline' : ''}`}
                    style={{ 
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '97%',
                      left: '50px'
                    }}
                  />
                </div>
              </div>
              {expandedItem === text && (
                <div className="expanded-content" style={{ width: '0%', height: 'auto' }}>
                  {/* Add your expanded content here */}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;