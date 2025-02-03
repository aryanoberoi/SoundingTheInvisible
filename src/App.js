import React from "react";
import PollutantPage from "./InfiniteScrollPage";
import SoundToggle from "./SoundToggle";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      
      <PollutantPage />
      <Navbar />
      <SoundToggle />
    </div>
  );
};

export default App;
