import React, { useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; // Import the home page
import PollutantPage from "./InfiniteScrollPage"; // Pollutant page
import SoundToggle from "./SoundToggle"; // Sound button
import Navbar from "./Navbar"; // Navbar

const AppContent = () => {
  const location = useLocation();
  useEffect(() => {
    const sheetId = "1LrBrWCyrftGHDPv3YF51muiYBskQKudyvlKWR-4Aaiw";
    const sheetName = "Pollutantinfo"; // Change to your sheet name if needed
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    fetch(url)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows.map(row => {
          const obj = {};
          json.table.cols.forEach((col, i) => {
            obj[col.label] = row.c[i]?.v || '';
          });
          return obj;
        });
        console.log(rows);
      })
      .catch(err => console.error('Error fetching sheet:', err));
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add('homepage-active');
    } else {
      document.body.classList.remove('homepage-active');
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <SoundToggle />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Default Home Page */}
        <Route path="/pollutants" element={<PollutantPage />} /> {/* Pollutants Page */}
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
