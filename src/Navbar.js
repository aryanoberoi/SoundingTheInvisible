import React, { useState } from "react";
import "./App.css"; // All styles go here
import "./pollutantPage.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
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
            <li className="nav-item">
              <img src="agriculture-icon.svg" alt="Agriculture" className="nav-icon" />
              <span className="nav-text">Agriculture waste</span>
              <span className="dropdown-icon">▼</span>
            </li>
            <li className="nav-item">
              <img src="heavy-metal-icon.svg" alt="Heavy Metal" className="nav-icon" />
              <span className="nav-text">Heavy metal waste</span>
              <span className="dropdown-icon">▼</span>
            </li>
            <li className="nav-item">
              <img src="radioactive-icon.svg" alt="Radioactive" className="nav-icon" />
              <span className="nav-text">Radioactive waste</span>
              <span className="dropdown-icon">▼</span>
            </li>
            <li className="nav-item">
              <img src="sewage-icon.svg" alt="Sewage" className="nav-icon" />
              <span className="nav-text">Sewage waste</span>
              <span className="dropdown-icon">▼</span>
            </li>
          </ul>
        </div>
      </>
    );
  };
  
  export default Navbar;
