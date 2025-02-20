import React, { useState } from "react";
import "./App.css"; // All styles go here
import "./pollutantPage.css";
import Timeline from './Timeline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPollutant, setSelectedPollutant] = useState(null);

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
              <li key={index} className="nav-item">
                <div onClick={() => setSelectedPollutant(text)} className="nav-item-header">
                  <img 
                    src={`${text.toLowerCase().replace(/ /g, "-")}-vector.svg`} 
                    alt={text} 
                    className="nav-icon" 
                  />
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