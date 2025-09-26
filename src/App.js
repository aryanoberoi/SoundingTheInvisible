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
import { Analytics } from "@vercel/analytics/react"

// Analytics configuration mapping
const ANALYTICS_CONFIG = {
  // Homepage
  homepage: "G-8T2J98QBVF",
  
  // Pollutant-specific measurement IDs
  pollutants: {
    "potassium": "G-CS2Z7R1Z7T",
    "simazine": "G-3FXNHT8R7S",
    "imidacloprid": "G-RVC6EJZML5",
    "atrazine": "G-WXESRQ4JJR",
    "glyphosate": "G-C4XFTK6RJ2",
    "phosphorus": "G-G653J290S3",
    "nitrates": "G-KEFRVDVFP6",
    "dimethomorph": "G-FQVTMMWMHF",
    "mercury": "G-78R22FYCSZ",
    "copper": "G-HLGK68JPZQ",
    "lead": "G-6B1NDK82Q3",
    "chromium": "G-VM4ND8H0N8",
    "cadmium": "G-3BQJR55ZJL",
    "thallium": "G-QQQ0WKP4XQ",
    "selenium": "G-GE9MV451RP",
    "nickel": "G-NNXFECWPV1",
    "arsenic": "G-P8H8CLBP6N",
    "zinc": "G-ZTESVRJB69",
    "iron": "G-TTV9W4JVGT",
    "manganese": "G-PNE11XHVG9",
    "aluminium": "G-D4LQ93KC6B",
    "antimony": "G-SH9ZBY3SV1",
    "thorium": "G-E695PBKH7G",
    "strontium": "G-D3G0E8E3LZ",
    "uranium": "G-H6KXX6BC05",
    "cesium": "G-R130QFL12R",
    "polyaromatichydrocarbon": "G-ZMDR83D42F",
    "crudeoil": "G-2ZQ07HE3MC",
    "benzene": "G-BQFYEJ0DCT",
    "petrol": "G-LF10V9BZW7",
    "sulphide": "G-KZY08T7QEH",
    "diesel": "G-84L74GVHRX",
    "ammonium": "G-REEF8EJZHF",
    "phenol": "G-VPNNPJSC7F",
    "organicmatter": "G-M423YNEJCL",
    "estradiol": "G-JK75D40PCK",
    "phthalate": "G-8BY80D7YLR",
    "fragrance": "G-TQMM1Z1652",
    "diclofenac": "G-KVEXY8PQ0G",
    "bht": "G-NDBMD8SPM8",
    "syntheticdyes": "G-ZPXLM0QVTZ",
    "ibuprofen": "G-JC5T6W54X6",
    "ofloxacinantibiotic": "G-YF5KRMN9B7",
    "chlorides": "G-N73Y7NZDRZ",
    "tetracyclineAntibiotic": "G-GHQZGKTZLK",
    "wastewatersludge": "G-81WQH91J48"
  },
  
  // Default fallback
  default: "G-8T2J98QBVF"
};

// Function to determine the appropriate measurement ID
const getMeasurementId = (pathname, categorizedData) => {
  // Homepage
  if (pathname === "/") {
    return ANALYTICS_CONFIG.homepage;
  }
  
  // Playtest page (use homepage or create separate if needed)
  if (pathname === "/playtest") {
    return ANALYTICS_CONFIG.homepage; // Or create separate ID
  }
  
  // Extract pollutant name from path
  const pollutantName = pathname.substring(1); // Remove leading slash
  
  // Check if this pollutant exists in your data
  if (categorizedData[pollutantName] || Object.keys(categorizedData).includes(pollutantName)) {
    return ANALYTICS_CONFIG.pollutants[pollutantName] || ANALYTICS_CONFIG.default;
  }
  
  return ANALYTICS_CONFIG.default;
};

const AppContent = () => {
  const location = useLocation();
  const [dataByCategory, setDataByCategory] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [displayPollutantPage, setDisplayPollutantPage] = useState(false);
  const initialMountRef = useRef(true);
  const previousPathRef = useRef('');

  // 🔹 Enhanced tracking with multiple GA measurement IDs
  useEffect(() => {
    if (window.gtag && Object.keys(dataByCategory).length > 0) {
      const measurementId = getMeasurementId(location.pathname, dataByCategory);
      
      window.gtag("config", measurementId, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
      
      // Optional: Send a custom event for better tracking
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
        measurement_id: measurementId
      });
      
      console.log(`[GA] Pageview tracked for ${location.pathname} using ID: ${measurementId}`);
    }
  }, [location, dataByCategory]);

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
      }, 1000);
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
        
        // Log available pollutant names for easy GA configuration
        console.log('[GA] Available pollutant routes:', Object.keys(categorizedData));
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
    return <div>Loading full page...</div>;
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
                key={location.pathname}
              />
            ) : (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <p>Loading Data ..</p>
              </div>
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
      <Analytics />
    </Router>
  );
};

export default App;