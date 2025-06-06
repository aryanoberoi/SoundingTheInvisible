// Updated App.js with comprehensive scroll fixing

import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; 
import PollutantPage from "./PollutantPage"; 
import Navbar from "./Navbar"; 
import "./App.css";
import PlayPads from "./PlayPads";
import IsolatedCursor from './IsolatedCursor';
import audioService from './AudioService';
import { ScrollToTop, inspectScrollableElements } from './ScrollFix';
import Loader from "./Loader";
// Okay 
const AppContent = () => {
  const location = useLocation();
  const [categorizedData, setCategorizedData] = useState({});
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const isInitialMount = useRef(true);
  const prevPathRef = useRef('');

  // Debug scrollable elements on mount
  useEffect(() => {
    // Inspect DOM for problematic elements
    inspectScrollableElements();
    
    // Add global navigation event listener
    const handleBeforeNavigate = () => {
      console.log('[App] Navigation started - locking scroll');
      document.body.classList.add('lock-scroll');
    };
    
    window.addEventListener('beforeunload', handleBeforeNavigate);
    return () => window.removeEventListener('beforeunload', handleBeforeNavigate);
  }, []);

  // Handle route changes
  useEffect(() => {
    console.log('[App] Route changed from', prevPathRef.current, 'to', location.pathname);
    
    // Skip initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathRef.current = location.pathname;
      return;
    }
    
    // Lock scroll during transition
    document.body.classList.add('lock-scroll');
    
    // Force scroll top before rendering new route
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // Only after a slight delay, unlock scroll
    const timerId = setTimeout(() => {
      document.body.classList.remove('lock-scroll');
      console.log('[App] Unlocked scroll after route change');
      
      // Ensure scroll is at top after render
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      
      // Update homepage-specific classes
      if (location.pathname === "/") {
        document.body.classList.add("homepage-active");
      } else {
        document.body.classList.remove("homepage-active");
      }
      
      // Repeatedly try to scroll to top
      let attempts = 0;
      const attemptScroll = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        attempts++;
        
        if (window.pageYOffset > 0 && attempts < 5) {
          setTimeout(attemptScroll, 100);
        }
      };
      
      attemptScroll();
      
    }, 50); // Short delay to ensure DOM has updated
    
    prevPathRef.current = location.pathname;
    return () => clearTimeout(timerId);
  }, [location.pathname]);

  // Data fetching effect
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
        
        setCategorizedData(categorizedData);
        audioService.init(rows);
        setIsPageLoaded(true);
      })
      .catch(err => {
        console.error("Error fetching sheet:", err);
        setIsPageLoaded(true);
      });
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Clean up audio resources on unmount
  useEffect(() => {
    return () => {
      audioService.dispose();
    };
  }, []);

  if (!isPageLoaded) {
    return <div>Loading full page...</div>; // splash screen
  }

  return (
    <div className="app-container">
      <ScrollToTop />
      <IsolatedCursor />
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Homepage categorizedData={categorizedData} />} />
          <Route path="/:customName" element={
            <PollutantPage 
              categorizedData={categorizedData} 
              key={location.pathname} // Force remount on route change
            />
          } />
          <Route path="/playtest" element={<PlayPads />} />
        </Routes>
      </div>
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