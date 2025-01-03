import React, { useState } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hamburger-menu-container">
      {/* Hamburger Menu Icon */}
      <button
        className="hamburger-icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close Menu"
        >
          ✕
        </button>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`content ${isOpen ? "shifted" : ""}`}>{children}</div>
    </div>
  );
};

export default HamburgerMenu;
