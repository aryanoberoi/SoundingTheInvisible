// App.js - Updated with more robust scroll handling

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; 
import PollutantPage from "./PollutantPage"; 
import Navbar from "./Navbar"; 
import "./App.css"; // New separate file for cursor styles
import PlayPads from "./PlayPads";
import IsolatedCursor from './IsolatedCursor';
import { useAudioHover } from './useAudioHover';

// Enhanced ScrollToTop component with useLayoutEffect
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  // useLayoutEffect runs synchronously after DOM mutations but before browser painting
  useLayoutEffect(() => {
    // Force scroll to top with a slight delay to ensure it happens after route change
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate scroll
      });
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const [categorizedData, setCategorizedData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true); // Loading state
  const audioControls = useAudioHover(categorizedData);

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

        const categorizedData = rows.reduce((acc, row) => {
          const key = row.id || row.unique_id || row.Number;
          if (!acc[key]) acc[key] = [];
          acc[key].push(row);
          return acc;
        }, {});
        
        console.log("Available element IDs:", Object.keys(categorizedData));
        setCategorizedData(categorizedData);
        setIsLoading(false);  // Data fetching complete
      })
      .catch(err => {
        console.error("Error fetching sheet:", err);
        setIsLoading(false);  // Even on error, end loading to avoid infinite loading state
      });
  }, []);

  // Also manually handle scrolling when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (location.pathname === "/") {
      document.body.classList.add("homepage-active");
    } else {
      document.body.classList.remove("homepage-active");
    }
  }, [location.pathname]);

  if (isLoading) {
    return <div>Loading data, please wait...</div>; // Loading indicator
  }

  return (
    <div>
      <ScrollToTop /> {/* Keep the ScrollToTop component */}
      <IsolatedCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage audioControls={audioControls} />} />
        <Route path="/:customName" element={<PollutantPage categorizedData={categorizedData} audioControls={audioControls} />} />
        <Route path="/playtest" element={<PlayPads />} />
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