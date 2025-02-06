import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage"; // Import the home page
import PollutantPage from "./InfiniteScrollPage"; // Pollutant page
import SoundToggle from "./SoundToggle"; // Sound button
import Navbar from "./Navbar"; // Navbar

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <SoundToggle />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default Home Page */}
          <Route path="/pollutants" element={<PollutantPage />} /> {/* Pollutants Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
