import React, { useState } from "react";
import "./App.css"; // All styles go here
import "./pollutantPage.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      {/* Hamburger Button (Hidden when menu is open) */}
      {!isOpen && (
        <button className="nav-button" onClick={() => setIsOpen(true)}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      )}

      {/* Fullscreen Menu */}
      <div className={`nav-menu ${isOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={() => setIsOpen(false)}>✕</span>

        <ul className="nav-links">
          {["Agriculture waste", "Heavy metal waste", "Radioactive waste", "Sewage waste"].map((text, index) => (
            <li key={index} className="nav-item">
              <div onClick={() => toggleExpand(index)} className="nav-item-header">
                <img src={`${text.toLowerCase().replace(/ /g, "-")}-icon.svg`} alt={text} className="nav-icon" />
                <span className="nav-text">{text}</span>
                <span className="dropdown-icon">▼</span>
              </div>
              {expandedItem === index && (
                <div className="dropdown-content fade-in">
                  <p>Information about {text.toLowerCase()} goes here.</p>
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