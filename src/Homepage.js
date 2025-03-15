import React from "react";
import "./Homepage.css";
import SoundConceptFrame from './frame.js';
// import frame from "./frame.svg";
// import frame1 from "./frame.png";
// import image from "./image.svg";
// import group283 from "./group-283.png";
// import vector187 from "./vector-187.svg";

export default function Homepage () {
  return (
    <div className="homepage">

      {/* 🔸 Header Section */}
      <section className="header-section">
        <h1>Sounding The Invisible: An Elegant Symbiosis</h1>
        <p>Phytoremediation plants from the tropic of the temperate</p>
      </section>

      {/* 🔸 Concept Section */}
      <section className="concept-section">
        <div className="concept-text">
          <h2>Concept</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus.
          </p>
        </div>
        {/* <img src={frame} alt="Concept Illustration" className="concept-image" /> */}
      </section>

      {/* 🔸 Black Trapezium Section */}
      <section className="trapezium-section">
        {/* <img src={image} alt="Main Illustration" className="trapezium-image" /> */}
        <div className="trapezium-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus.
          </p>
        </div>
      </section>

      {/* 🔸 Sound Strategy Section */}
      <section className="strategy-section">
        <div className="strategy-text">
          <h2>Sound Strategy</h2>
          <p>
            Exploring the relationship between phytoremediation plants and their soundscapes within temperate climates.
          </p>
        </div>
        <div className="svg-container">
          <SoundConceptFrame 
            className="strategy-image interactive-svg"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      </section>

      {/* 🔸 Group Section */}
      <section className="group-section">
        {/* <img src={group283} alt="Group Illustration" className="group-image" /> */}
      </section>

      {/* 🔸 Footer Section */}
      <footer className="footer-section">
        <p>Credits</p>
        {/* <img src={vector187} alt="Vector Design" className="footer-vector" /> */}
      </footer>

    </div>
  );
};
