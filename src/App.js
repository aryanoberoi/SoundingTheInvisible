import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"; // Import the home page
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
          <Route path="/" element={<Homepage />} /> {/* Default Home Page */}
          <Route path="/pollutants" element={<PollutantPage />} /> {/* Pollutants Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
