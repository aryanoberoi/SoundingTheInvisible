import React, {useState, useRef, useEffect} from "react";
import "./Homepage.css";
import SoundConceptFrame from './frame.js';
import ConceptFrame from './frame1.js';
import MiddleFrame from './frame2.js';
import vector187 from "./vector-187.png";
import group283 from "./group-283.png";
import Cloud from './Cloud';
import Title from './title.js';
import SoundToggle from "./SoundToggle";

export default function Homepage() {
  const [showConceptText, setShowConceptText] = useState(false);
  const [showTrapeziumText, setShowTrapeziumText] = useState(false);
  const [showSoundText, setShowSoundText] = useState(false);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const audioRef = useRef(null);
  
  // Safe audio manipulation with better null checking
  const handleAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      // other audio operations
    }
  };

  // Make sure the audio is loaded
  useEffect(() => {
    // Optional: You could set up audio here if needed
    console.log("Audio ref initialized:", audioRef.current);
  }, []);

  // Handler for ConceptFrame hover
  const handleFrameHover = (hovering) => {
    setIsFrameHovered(hovering);
  };

  return (
    <div className="homepage">
            {/* <SoundToggle
        padNumber={leftpanelcontent[0].pollutantNumber}
        sliderPosition={sliderPosition}
        panelMode={sliderPosition < 50 ? "white" : "black"}
      /> */}
      {/* Add the actual audio element */}
      <audio 
        ref={audioRef} 
        src="/path/to/your/audio-file.mp3" // Make sure to add the correct path
        preload="auto"
      />

      {/* 🔸 Header Section */}
      {/* <section className="header-section">
        <h1>Sounding The Invisible: An Elegant Symbiosis</h1>
        <p>Phytoremediation plants from the tropic of the temperate</p>
      </section> */}
      <section className="header">
        <Title/>
      </section>

      {/* 🔸 Concept Section */}
      <section className="concept-section">
        <Cloud top={80} left={45} isHovered={isFrameHovered} distance="short" direction="left" scale={0.9} variant={1} />
        <Cloud top={180} left={60} isHovered={isFrameHovered} distance="medium" direction="left" variant={2} />
        <Cloud top={0} left={72} isHovered={isFrameHovered} distance="long" direction="left" scale={1.1} variant={3} />

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
        <div className="svg-container-concept">
          <ConceptFrame
            className="interactive-svg-concept"
            preserveAspectRatio="xMidYMid meet"
            audioRef={audioRef}
            handleAudio={handleAudio}
            onHover={handleFrameHover}
          />
        </div>

        <div className="arrow-box">
            <img className="group" alt="Group" src={group283} />
          </div>
      </section>

      {/* 🔸 Black Trapezium with Frame 3 and Text */}
      <section className="trapezium-section">
        <div className="svg-container-trapezium">
          <MiddleFrame 
            className="middle-svg-concept"
            preserveAspectRatio="xMidYMid meet"
            audioRef={audioRef}
            handleAudio={handleAudio}
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
            audioRef={audioRef}
            handleAudio={handleAudio}
          />
        </div>
      </section>
      
      {/* 🔸 Footer Section */}
      <footer className="footer-section mt-5">
        <p>Credits</p>
        <div className="box">
          <img className="vector" alt="Vector" src={vector187} />
        </div>
      </footer>
    </div>
  );
}