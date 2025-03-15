import React from "react";
import frame2 from "./frame-2.png";
import frame3 from "./frame-3.png";
import frame4 from "./frame-4.png";
import "./Homepage.css";

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
        <div className="frame">
          <img src={frame2} alt="Frame 2" className="frame-2" />
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
        </div>
      </section>

      {/* 🔸 Frame 4 Section */}
      <section className="frame">
        <img src={frame4} alt="Frame 4" className="frame-4" />
      </section>

      {/* 🔸 Sound Strategy Section */}
      <section className="strategy-section">
        <div className="strategy-text">
          <h2>Sound Strategy</h2>
          <p>
            Exploring the relationship between phytoremediation plants and their soundscapes within temperate climates.
          </p>
        </div>
      </section>

      {/* 🔸 Footer Section */}
      <footer className="footer-section">
        <p>Credits</p>
      </footer>

    </div>
  );
}
