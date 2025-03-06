import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; // Import the home page
import PollutantPage from "./InfiniteScrollPage"; // Pollutant page
import SoundToggle from "./SoundToggle"; // Sound button
import Navbar from "./Navbar"; // Navbar

const AppContent = () => {
  const location = useLocation();

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
