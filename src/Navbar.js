import React, { useState, useRef } from "react";
import "./App.css"; // All styles go here
import "./pollutantPage.css";
import Timeline from './Timeline';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleItemClick = (text) => {
    const wasExpanded = expandedItem === text;
    setExpandedItem(wasExpanded ? null : text);
    
    if (!wasExpanded) {
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
          navigate('/pollutants');
        }} style={{ color: 'white' }}>✕</span>

        <ul className="nav-links">
          {["Agriculture waste", "Heavy metal waste", "Radioactive waste", "Sewage waste"].map((text, index) => (
            <li 
              key={index} 
              className={`nav-item ${expandedItem === text ? 'expanded' : ''}`}
              ref={expandedItem === text ? (el) => el && el.scrollIntoView({ block: "start" }) : null}
            >
              <div 
                onClick={() => handleItemClick(text)}
                className="nav-item-header"
              >
                <div className="nav-item-content">
                  <object
                    type="image/svg+xml" 
                    data={`${text.toLowerCase().replace(/ /g, "-")}-icon.svg`}  
                    alt={text} 
                    className="nav-icon" 
                  />
                  <div className="nav-item-text">{text}</div>
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
                <div className="underline-container">
                  <img
                    src={expandedItem === text ? 
                      `${text.toLowerCase().replace(/ /g, "-")}-expanded.svg` : 
                      "underline.svg"}
                    alt="underline"
                    className={`nav-underline ${expandedItem === text ? 'expanded-underline' : ''}`}
                    style={{ 
                      position: 'relative',
                      bottom: expandedItem === text ? '-20px' : '0',
                      width: expandedItem === text ? '100%' : '80%',
                      marginLeft: expandedItem === text ? '0' : '10%'
                    }}
                  />
                </div>
              </div>
              {expandedItem === text && (
                <div className="expanded-content">
                  {/* Add your expanded content here */}
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* <object 
          type="image/svg+xml" 
          data="heavy-metal-waste-expanded.svg"
          id="mySVG"
          alt="sd"
          onClick={(e) => {
            // Check if click target is the cadmium element
            if (e.target.id === 'cadmium') {
              window.location.href = 'https://google.com';
              e.stopPropagation(); // Prevent parent click handlers
            }
          }}
        /> */}
      </div>
    </>
  );
};

export default Navbar;