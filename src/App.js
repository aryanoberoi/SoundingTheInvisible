import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; // Import the home page
import PollutantPage from "./InfiniteScrollPage"; // Pollutant page
import SoundToggle from "./SoundToggle"; // Sound button
import Navbar from "./Navbar"; // Navbar

const AppContent = () => {
  const location = useLocation();
  const [categorizedData, setCategorizedData] = React.useState({});

  useEffect(() => {
    // Custom cursor implementation (Updated Logic)
    // Create cursor element if it doesn't exist
    let cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.classList.add('custom-cursor');
      document.body.appendChild(cursor);
    }

    // Track mouse position with throttling for performance
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isUpdating = false;
    let animationFrameId = null; // Keep track of animation frame

    // Throttled mousemove handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

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

    // Helper function to determine if element has dark background (Updated Logic)
    function isElementDark(element) {
      if (!element) return false; // Base case

      // First check for data attribute for explicit marking
      if (element.dataset.cursorInvert === 'true') return true;
      if (element.dataset.cursorInvert === 'false') return false;

      // Check for dark class names (common convention) including closest ancestor
      if (element.classList.contains('dark') ||
          element.classList.contains('bg-dark') ||
          element.classList.contains('dark-mode') ||
          element.closest('.dark, .bg-dark, .dark-mode')) { // Check ancestors too
        return true;
      }

      // Check computed background color if reasonable performance
      // Only checking direct element, not traversing up further here for performance reasons
      try { // Added try-catch block
        const bgColor = window.getComputedStyle(element).backgroundColor;
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // Parse RGB values
          const rgb = bgColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            // Simple brightness formula (max value 255*3 = 765)
            const brightness = parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2]);
            if (brightness < 380) { // Threshold for "dark" (adjust as needed)
               return true;
            }
            // No need for explicit light check here if parent check follows
          }
        }
      } catch(e) {
          // Ignore errors from pseudo-elements or elements not in the DOM
          console.warn("Could not compute style for element:", element, e);
      }

      // Check parent element recursively if direct element doesn't provide conclusive result
      const parent = element.parentElement;
      if (parent && parent !== document.body) { // Stop at body
         return isElementDark(parent);
      }

      return false; // Default to not dark
    }

    // Keep default cursor visible (as per new logic)
    // const originalCursorStyle = document.body.style.cursor; // No longer needed
    // document.body.style.cursor = 'none'; // No longer hiding default cursor

    // Handle cursor showing/hiding when leaving/entering window
    const handleMouseEnter = () => {
      if (cursor) cursor.style.display = 'block';
    };
    const handleMouseLeave = () => {
      if (cursor) cursor.style.display = 'none';
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (cursor && cursor.parentNode) {
        cursor.remove(); // Clean up the cursor element
      }
      // No need to restore original cursor style as it wasn't changed
      // document.body.style.cursor = originalCursorStyle;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

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

        console.log(categorizedData);
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
      <Navbar />
      <SoundToggle />
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
