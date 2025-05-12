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
import { Footer } from "./Footer";

// In Homepage.js - Create data-driven audio manager
const usePollutantAudio = () => {
  const [audioData, setAudioData] = useState({});
  const audioInstancesRef = useRef({});
  const audioContext = useRef(null);
  
  // Initialize Audio Context and load data
  useEffect(() => {
    // Initialize WebAudio API
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    
    // Load pollutant audio mapping from dataset
    fetch('/api/pollutant-audio-data')
      .then(res => res.json())
      .then(data => {
        setAudioData(data);
      });
      
    return () => {
      // Clean up audio on unmount
      Object.values(audioInstancesRef.current).forEach(instance => {
        if (instance.oscillator) instance.oscillator.stop();
        if (instance.gainNode) instance.gainNode.disconnect();
      });
      audioContext.current?.close();
    };
  }, []);
  
  // Generate sound based on pollutant properties
  const playPollutantSound = (elementId) => {
    if (!audioContext.current || !audioData[elementId]) return;
    
    // Stop any currently playing element sound
    stopActiveSounds();
    
    const pollutant = audioData[elementId];
    
    // Extract audio parameters from dataset
    const frequency = parseFloat(pollutant.Sound_Frequency) || 440;
    const audibleFreq = parseFloat(pollutant.SineWaveVisualizer_frequency_audiblefrequency) || frequency;
    const enthalpy = parseFloat(pollutant.Enthalpy_) || 0;
    
    // Create oscillator based on pollutant properties
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    // Set frequency characteristics based on chemistry
    oscillator.type = enthalpy > 0 ? 'sine' : 'triangle';
    oscillator.frequency.value = audibleFreq;
    
    // Set envelope based on pollutant type
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.current.currentTime + 0.1);
    
    // Different decay patterns based on pollutant type
    if (pollutant.type_of_waste === 1) { // Chemical
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 1.5);
    } else if (pollutant.type_of_waste === 2) { // Heavy metal
      gainNode.gain.linearRampToValueAtTime(0.01, audioContext.current.currentTime + 2.0);
    } else { // Other pollutants
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 1.0);
    }
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.start();
    
    // Store for cleanup
    audioInstancesRef.current[elementId] = { oscillator, gainNode };
    
    // Auto-stop after 2 seconds
    setTimeout(() => {
      if (audioInstancesRef.current[elementId]) {
        stopElementSound(elementId);
      }
    }, 2000);
  };
  
  // Stop specific element sound
  const stopElementSound = (elementId) => {
    if (audioInstancesRef.current[elementId]) {
      const { oscillator, gainNode } = audioInstancesRef.current[elementId];
      oscillator.stop();
      gainNode.disconnect();
      delete audioInstancesRef.current[elementId];
    }
  };
  
  // Stop all active sounds
  const stopActiveSounds = () => {
    Object.keys(audioInstancesRef.current).forEach(stopElementSound);
  };
  
  return { playPollutantSound, stopElementSound, stopActiveSounds };
};

export default function Homepage({ audioControls }) {
  const [showConceptText, setShowConceptText] = useState(false);
  const [showTrapeziumText, setShowTrapeziumText] = useState(false);
  const [showSoundText, setShowSoundText] = useState(false);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const [isInTrapezium, setIsInTrapezium] = useState(false);
  const audioRef = useRef(null);
  
  // Default pad number for the homepage
  const DEFAULT_PAD_NUMBER = "1"; // Choose an appropriate default pad number
  
  // Detect if we're in the trapezium section
  useEffect(() => {
    const trapeziumObserver = new IntersectionObserver(
      (entries) => {
        // Update state when trapezium visibility changes
        if (entries[0]) {
          setIsInTrapezium(entries[0].isIntersecting);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );
    
    const trapezium = document.querySelector('.trapezium-section');
    if (trapezium) {
      trapeziumObserver.observe(trapezium);
    }
    
    return () => trapeziumObserver.disconnect();
  }, []);
  
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
            <SoundToggle
        padNumber={DEFAULT_PAD_NUMBER}
        isInTrapezium={isInTrapezium}
        panelMode={isInTrapezium ? "black" : "white"}
        defaultActive={true}
      />
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
            audioControls={audioControls} 
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
            audioControls={audioControls} 
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
            audioControls={audioControls} 
          />
        </div>
      </section>
      
      {/* 🔸 Footer Section */}
      <footer className="footer-section mt-5">
        <div className="box">
          <img className="vector" alt="Vector" src={vector187} />
        </div>
        <Footer />
      </footer>
    </div>
  );
}