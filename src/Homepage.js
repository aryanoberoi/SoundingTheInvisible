import React from "react";
import "./Homepage.css";
import frame2 from "./frame-2.png";
import frame3 from "./frame-3.png";
import frame4 from "./frame-4.png";
import vector187 from "./vector-187.png";
import rectangle90 from "./rectangle-90.png"; // Import the rectangle image

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="container">

        {/* ✅ Box Integration */}
        <div className="box">
          <img className="rectangle" alt="Background" src={rectangle90} />
        </div>

        {/* Section 1 - Title and Subtitle */}
        <div className="header-section">
          <p className="sounding-the">
            Sounding The Invisible: An Elegant Symbiosis
          </p>
          <p className="phytoremediation">
            Phytoremediation plants from the tropic of the temperate
          </p>
        </div>

        {/* Section 2 - Image and Concept */}
        <div className="concept-section">
          <img className="frame-2" alt="Concept Art" src={frame2} />
          <p className="concept-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
            imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper
            eu neque. Etiam rhoncus erat non quam vehicula.
          </p>
          <div className="section-title">Sound Concept</div>
        </div>

        {/* Section 3 - Second Image */}
        <div className="image-section">
          <img className="frame-3" alt="Concept Extension" src={frame3} />
        </div>

        {/* Section 4 - Additional Text */}
        <div className="text-section">
          <div className="text-content">
            <img className="frame-4" alt="Additional Concept" src={frame4} />
            <p className="additional-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse congue mollis mauris eget faucibus. Donec fermentum
              nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
              quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
            </p>
          </div>

          <div className="concept-title">Concept</div>
          <p className="concept-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
            imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper
            eu neque. Etiam rhoncus erat non quam vehicula.
          </p>
        </div>

        {/* Section 5 - Credits */}
        <div className="credits-section">
          <div className="credits-title">Credits</div>
          <img className="vector-2" alt="Vector Graphic" src={vector187} />
        </div>
      </div>
    </div>
  );
}
