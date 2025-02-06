import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Section 1 - White */}
      <section className="section white">
        <img src="image1.png" alt="Artwork 1" className="overlapping-image" />
        <p className="overlapping-text">
          Welcome to the exploration of environmental pollutants and their impact.
        </p>
      </section>

      {/* Section 2 - White */}
      <section className="section white">
        <p className="overlapping-text">A delicate balance between nature and industrialization...</p>
        <img src="image2.png" alt="Artwork 2" className="overlapping-image" />
      </section>

      {/* Section 3 - Black */}
      <section className="section black">
        <img src="image3.png" alt="Artwork 3" className="overlapping-image" />
        <p className="overlapping-text">But at what cost?</p>
      </section>

      {/* Section 4 - White */}
      <section className="section white">
        <p className="overlapping-text">
          Nature finds a way, but human intervention leaves a mark.
        </p>
        <img src="image4.png" alt="Artwork 4" className="overlapping-image" />
      </section>

      {/* Section 5 - White */}
      <section className="section white">
        <img src="image5.png" alt="Artwork 5" className="overlapping-image" />
        <button className="navigate-button" onClick={() => navigate("/pollutants")}>
          Explore Pollutants →
        </button>
      </section>
    </div>
  );
};

export default HomePage;
