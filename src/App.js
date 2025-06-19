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
const AppContent = () => {
  const location = useLocation();
  const [dataByCategory, setDataByCategory] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [displayPollutantPage, setDisplayPollutantPage] = useState(false);
  const initialMountRef = useRef(true);
  const previousPathRef = useRef('');

  useEffect(() => {
    inspectScrollableElements();
    const handleBeforeNavigate = () => {
      console.log('[App] Navigation started - locking scroll');
      document.body.classList.add('lock-scroll');
    };
    window.addEventListener('beforeunload', handleBeforeNavigate);
    return () => window.removeEventListener('beforeunload', handleBeforeNavigate);
  }, []);

  useEffect(() => {
    console.log('[App] Route changed from', previousPathRef.current, 'to', location.pathname);
    
    if (initialMountRef.current) {
      initialMountRef.current = false;
      previousPathRef.current = location.pathname;
      return;
    }
    
    document.body.classList.add('lock-scroll');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    const timerId = setTimeout(() => {
      document.body.classList.remove('lock-scroll');
      console.log('[App] Unlocked scroll after route change');
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      
      if (location.pathname === "/") {
        document.body.classList.add("homepage-active");
      } else {
        document.body.classList.remove("homepage-active");
      }
      
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
      
    }, 50);
    
    previousPathRef.current = location.pathname;
    return () => clearTimeout(timerId);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/playtest") {
      setDisplayPollutantPage(false);
      const delayTimer = setTimeout(() => {
        setDisplayPollutantPage(true);
      }, 5000); // 5-second delay
      return () => clearTimeout(delayTimer);
    } else {
      setDisplayPollutantPage(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = "1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs";
      const sheetName = "Sheet1";
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

      try {
        const res = await fetch(url);
        const text = await res.text();
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
        
        setDataByCategory(categorizedData);
        audioService.init(rows);
        setPageLoaded(true);
      } catch (err) {
        console.error("Error fetching sheet:", err);
        setPageLoaded(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    return () => {
      audioService.dispose();
    };
  }, []);

  if (!pageLoaded) {
    return <div>Loading full page...</div>; // splash screen
  }

  return (
    <div className="app-container">
      <ScrollToTop />
      <IsolatedCursor />
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Homepage categorizedData={dataByCategory} />} />
          <Route path="/:customName" element={
            displayPollutantPage ? (
              <PollutantPage 
                categorizedData={dataByCategory} 
                key={location.pathname} // Force remount on route change
              />
            ) : (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <p>Loading Data ..</p>
              </div> // Loader during delay
            )
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