import React from "react";
import frame4 from "./frame-4.png";
import "./Homepage.css";
import SoundConceptFrame from './frame.js';
import ConceptFrame from './frame1.js';
import MiddleFrame from './frame2.js';
// import frame from "./frame.svg";
// import frame1 from "./frame.png";
// import image from "./image.svg";
// import group283 from "./group-283.png";
// import vector187 from "./vector-187.svg";
import vector187 from "./vector-187.png";
import group283 from "./group-283.png";

export default function Homepage() {
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
            Exploring unseen connections in nature, balancing art and science.
          </p>
        </div>

        <div className="svg-container">
          <ConceptFrame 
            className="interactive-svg-concept"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        <div className="arrow-box">
            <img className="group" alt="Group" src={group283} />
          </div>
      </section>



      {/* 🔸 Black Trapezium with Frame 3 and Text */}
      <section className="trapezium-section">
        <div className="svg-container">
          <MiddleFrame 
            className="middle-svg-concept"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
        <div className="trapezium-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. 
            Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. 
            Etiam rhoncus erat non quam vehicula.
          </p>
        </div>
      </section>

      {/* 🔸 Sound Strategy Section */}
      <section className="strategy-section">
        <div className="strategy-text">
          <h2>Sound concept</h2>
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
      {/* 🔸 Sound Concept Section */}
      <section className="sound-concept-section">
        <div className="sound-text">
          <h2>Sound Concept</h2>
          <p>
            Exploring the relationship between phytoremediation plants and their soundscapes within temperate climates.
          </p>
        </div>

        <div className="frame">
          <img src={frame4} alt="Frame 4" className="frame-4" />
        </div>
      </section>

      {/* 🔸 Footer Section */}
      <footer className="footer-section">
        <p>Credits</p>
        <div className="box">
      <img className="vector" alt="Vector" src={vector187} />
    </div>
      </footer>

    </div>
  );
}
