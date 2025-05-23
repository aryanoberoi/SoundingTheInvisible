// src/components/SoundToggle.js
import React, { useState, useEffect, useRef } from "react";
import audioService from "./AudioService";

const SoundToggle = ({ 
  padNumber = "1", 
  isInTrapezium = false, 
  panelMode = "white", 
  defaultActive = false,
  onToggle = () => {}
}) => {
  const [isPlaying, setIsPlaying] = useState(defaultActive);
  const [isInCombinedSection, setIsInCombinedSection] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const hasStartedRef = useRef(defaultActive);
  const currentPadRef = useRef(padNumber);

  // Set up detection for scroll position and nav menu state
  useEffect(() => {
    const handleScroll = () => {
      const sliderContainer = document.querySelector('.slider-container');
      if (sliderContainer) {
        const sliderBottom = sliderContainer.getBoundingClientRect().bottom;
        setIsInCombinedSection(sliderBottom <= 0);
      }
    };

    // Function to check if nav menu is open
    const checkNavMenu = () => {
      const navMenu = document.querySelector('.nav-menu.open');
      setIsNavMenuOpen(!!navMenu);
    };

    // Initial checks
    handleScroll();
    checkNavMenu();
    
    // Set up observers and event listeners
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('nav-menu')) {
          checkNavMenu();
        }
      });
    });
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  // Determine button color based on section and menu state
  const buttonColor = isNavMenuOpen ? "white" : 
                     (isInCombinedSection ? 
                      (panelMode === "white" ? "black" : "white") :
                      (isInTrapezium ? "white" : "black"));

  // Play sound on component mount if defaultActive is true
  useEffect(() => {
    if (defaultActive && !hasStartedRef.current) {
      setIsPlaying(true);
      audioService.playPadSound(padNumber, { loop: true });
      hasStartedRef.current = true;
    }
    
    // Clean up on unmount
    return () => {
      // If this instance is playing sound, stop it
      if (isPlaying && currentPadRef.current) {
        audioService.stopPadSound(currentPadRef.current);
      }
    };
  }, [defaultActive, padNumber]);

  // Handle pad number changes while playing
  useEffect(() => {
    currentPadRef.current = padNumber;
    
    // If currently playing and pad number changes, update the sound
    if (isPlaying && hasStartedRef.current) {
      audioService.stopAllSounds(); // Stop any previous sounds
      audioService.playPadSound(padNumber, { loop: true });
    }
  }, [padNumber, isPlaying]);

  // Toggle sound on/off
  const handleToggle = () => {
    const newState = !isPlaying;
    console.log(`[SoundToggle] Toggle to ${newState ? 'ON' : 'OFF'}`);
    
    if (newState) {
      // Start sound and ensure mute is off
      audioService.isMuted = false;
      audioService.playPadSound(currentPadRef.current, { loop: true });
      setIsPlaying(true);
      hasStartedRef.current = true;
    } else {
      // Stop sound and ensure mute is on
      audioService.isMuted = true;
      audioService.stopPadSound(currentPadRef.current);
      setIsPlaying(false);
    }
    
    // Call the onToggle callback with the new state
    onToggle(newState);
  };

  return (
    <button
      className="sound-button"
      onClick={(e) => {
        e.stopPropagation();
        handleToggle();
      }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        zIndex: 100000
      }}
    >
      <div className={`sound-icon ${isPlaying ? "playing" : "muted"}`}>
        <span style={{ background: buttonColor }}></span>
        <span style={{ background: buttonColor }}></span>
        <span style={{ background: buttonColor }}></span>
        <span style={{ background: buttonColor }}></span>
      </div>
    </button>
  );
};

export default SoundToggle;