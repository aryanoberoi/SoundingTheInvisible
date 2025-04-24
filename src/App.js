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