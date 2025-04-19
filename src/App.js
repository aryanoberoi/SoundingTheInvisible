// App.js - Custom Cursor Implementation Fix

import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; 
import PollutantPage from "./PollutantPage"; 
import Navbar from "./Navbar"; 
import "./App.css"; // New separate file for cursor styles

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Track mouse position with throttling for performance
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isUpdating = false;
    let animationFrameId = null;

    // Throttled mousemove handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Force cursor to be visible when mouse moves
      if (cursor.style.display === 'none') {
        cursor.style.display = 'block';
      }

      // Start update loop if not already running
      if (!isUpdating) {
        isUpdating = true;
        animationFrameId = requestAnimationFrame(updateCursor);
      }

      // Check if cursor should be inverted
      updateCursorStyle(e);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Smoothly update cursor position using requestAnimationFrame
    function updateCursor() {
      // Calculate distance to target
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      // Smooth movement (adjust 0.2 for more/less smoothing)
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;

      // Apply position
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Continue updating if there's significant movement
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animationFrameId = requestAnimationFrame(updateCursor);
      } else {
        isUpdating = false;
      }
    }

    // Efficiently detect if cursor should be inverted
    function updateCursorStyle(e) {
      // Get element under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (!element) return;

      // Check if element or its parents have a dark background
      const shouldInvert = isElementDark(element);

      // Apply inverted class based on background
      if (shouldInvert) {
        cursor.classList.add('custom-cursor-inverted');
      } else {
        cursor.classList.remove('custom-cursor-inverted');
      }
    }

    // Helper function to determine if element has dark background
    function isElementDark(element) {
      if (!element) return false; // Base case

      // First check for data attribute for explicit marking
      if (element.dataset.cursorInvert === 'true') return true;
      if (element.dataset.cursorInvert === 'false') return false;

      // Check for dark class names (common convention) including closest ancestor
      if (element.classList.contains('dark') ||
          element.classList.contains('bg-dark') ||
          element.classList.contains('dark-mode') ||
          element.closest('.dark, .bg-dark, .dark-mode')) {
        return true;
      }

      // Check computed background color
      try {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // Parse RGB values
          const rgb = bgColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            // Simple brightness formula
            const brightness = parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2]);
            if (brightness < 380) { // Threshold for "dark"
               return true;
            }
          }
        }
      } catch(e) {
        console.warn("Could not compute style for element:", element, e);
      }

      // Check parent element recursively
      const parent = element.parentElement;
      if (parent && parent !== document.body) {
        return isElementDark(parent);
      }

      return false; // Default to not dark
    }

    // Handle cursor showing/hiding when leaving/entering window
    const handleMouseEnter = () => {
      cursor.style.display = 'block';
    };
    
    const handleMouseLeave = () => {
      cursor.style.display = 'none';
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial cursor position at center of screen
    cursorX = window.innerWidth / 2;
    cursorY = window.innerHeight / 2;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    // Force cursor to be visible initially
    cursor.style.display = 'block';

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor"
      style={{ display: 'block' }} // Ensure it's visible by default
    >
      <div className="cursor-dot"></div>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [categorizedData, setCategorizedData] = React.useState({});

  useEffect(() => {
    const sheetId = "1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs";
    const sheetName = "Sheet1";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
  
    fetch(url)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows.map(row => {
          const obj = {};
          json.table.cols.forEach((col, i) => {
            obj[col.label] = row.c[i]?.v || "";
          });
          return obj;
        });
  
        // Categorize data by 'Pollutantname_split'
        const categorizedData = rows.reduce((acc, row) => {
          const key = row['unique_id'];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(row);
          return acc;
        }, {});
        setCategorizedData(categorizedData); // Set the state with categorized data
    })
    .catch(err => console.error("Error fetching sheet:", err));
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("homepage-active");
    } else {
      document.body.classList.remove("homepage-active");
    }
  }, [location.pathname]);

  return (
    <div>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:customName" element={<PollutantPage categorizedData={categorizedData} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;