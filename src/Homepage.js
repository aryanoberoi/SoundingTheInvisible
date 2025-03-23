import React from "react";
import frame2 from "./frame-2.png";
import frame3 from "./frame-3.png";
import frame4 from "./frame-4.png";
import "./Homepage.css";
import SoundConceptFrame from './frame.js';
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
    <div className="read-more-box">READ MORE</div>
  </div>
  
  <div className="frame">
    <img src={frame2} alt="Frame 2" className="frame-2" />
  </div>
  
  <div className="arrow-box">
      <img className="group" alt="Group" src={group283} />
    </div>
    
</section>



      {/* 🔸 Black Trapezium with Frame 3 and Text */}
      <section className="trapezium-section">
        <img src={frame3} alt="Frame 3" className="frame-3" />
        <div className="trapezium-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. 
            Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. 
            Etiam rhoncus erat non quam vehicula.
          </p>
          <div className="read-more-box">READ MORE</div>
        </div>
        
      </section>

      {/* 🔸 Frame 4 Section */}
      <section className="frame">
        <img src={frame4} alt="Frame 4" className="frame-4" />
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
    <div className="read-more-box">READ MORE</div>
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
