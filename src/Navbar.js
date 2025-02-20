import React, { useState } from "react";
import "./App.css"; // All styles go here
import "./pollutantPage.css";
import Timeline from './Timeline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPollutant, setSelectedPollutant] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

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
      <div className={`nav-menu ${isOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={() => {
          selectedPollutant ? setSelectedPollutant(null) : setIsOpen(false);
        }} style={{ color: 'white' }}>
          {selectedPollutant ? '←' : '✕'}
        </span>

        {selectedPollutant ? (
          <div className="timeline-view">
            <h2 className="timeline-title">{selectedPollutant} Timeline</h2>
            <Timeline pollutant={selectedPollutant} />
          </div>
        ) : (
          <ul className="nav-links">
            {["Agriculture waste", "Heavy metal waste", "Radioactive waste", "Sewage waste"].map((text, index) => (
              <li 
                key={index} 
                className={`nav-item ${expandedItem === text ? 'expanded' : ''}`}
              >
                <div 
                  onClick={() => {
                    setExpandedItem(expandedItem === text ? null : text);
                    setSelectedPollutant(null);
                  }} 
                  className="nav-item-header"
                >
                  <div className="nav-item-content">
                    <img 
                      src={`${text.toLowerCase().replace(/ /g, "-")}-icon.svg`} 
                      alt={text} 
                      className="nav-icon" 
                    />
                    <div className="nav-item-text">{text}</div>
                    <img
                      src="down-arrow.svg"
                      alt="More info"
                      className="nav-arrow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPollutant(text);
                      }}
                    />
                  </div>
                  <div className="underline-container">
                    <img
                      src={expandedItem === text ? 
                        `${text.toLowerCase().replace(/ /g, "-")}-expanded.svg` : 
                        "underline.svg"}
                      alt={expandedItem === text ? "Expanded underline" : "Default underline"}
                      className={`nav-underline ${expandedItem === text ? 'expanded-underline' : ''}`}
                    />
                  </div>
                </div> 
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;