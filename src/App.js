// App.js - Custom Cursor Implementation Fix

import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; 
import PollutantPage from "./PollutantPage"; 
import Navbar from "./Navbar"; 
import "./App.css"; // New separate file for cursor styles
import PlayPads from "./PlayPads";
import IsolatedCursor from './IsolatedCursor';

const AppContent = () => {
  const location = useLocation();
  const [categorizedData, setCategorizedData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true); // Loading state

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
          const key = row['unique_id'];
          if (!acc[key]) acc[key] = [];
          acc[key].push(row);
          return acc;
        }, {});
        setCategorizedData(categorizedData);
        setIsLoading(false);  // Data fetching complete
      })
      .catch(err => {
        console.error("Error fetching sheet:", err);
        setIsLoading(false);  // Even on error, end loading to avoid infinite loading state
      });
  }, []);

  useEffect(() => {
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
      <IsolatedCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:customName" element={<PollutantPage categorizedData={categorizedData} />} />
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