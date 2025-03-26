import React, {useState, useRef, useEffect} from "react";
// import frame4 from "./frame-4.js";
import "./Homepage.css";
import SoundConceptFrame from './frame.js';
import ConceptFrame from './frame1.js';
import MiddleFrame from './frame2.js';
import vector187 from "./vector-187.png";
import group283 from "./group-283.png";

export default function Homepage() {
  const [showConceptText, setShowConceptText] = useState(false);
  const [showTrapeziumText, setShowTrapeziumText] = useState(false);
  const [showSoundText, setShowSoundText] = useState(false);
  const audioRef = useRef(null);
  
  // Safe audio manipulation example
  const handleAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      // other audio operations
    }
  };

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
        <h2>Sound Concept</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus.
        </p>
        {showSoundText && (
          <p>
            Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
          </p>
        )}
        <div className="read-more-box" onClick={() => setShowSoundText(!showSoundText)}>
          {showSoundText ? "READ LESS" : "READ MORE"}
        </div>
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
          </p>
            {showSoundText && (
              <p>
                Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
              </p>
            )}
          <div className="read-more-box" onClick={() => setShowSoundText(!showSoundText)}>
            {showSoundText ? "READ LESS" : "READ MORE"}
          </div>
        </div>
      </section>

      {/* 🔸 Sound Concept Section */}
      <section className="sound-concept-section">
        <div className="sound-text">
          <h2>Sound Concept</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus.
          </p>
            {showSoundText && (
              <p>
                Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
              </p>
            )}
          <div className="read-more-box" onClick={() => setShowSoundText(!showSoundText)}>
            {showSoundText ? "READ LESS" : "READ MORE"}
          </div>
        </div>
        <div className="svg-container-scs">
          <SoundConceptFrame 
            className="strategy-image interactive-svg"
            preserveAspectRatio="xMidYMid meet"
          />
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
