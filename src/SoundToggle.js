import React, { useState, useEffect, useRef } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

const SoundToggle = ({ sliderPosition = 50, padNumber }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInCombinedSection, setIsInCombinedSection] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);

  // Set up detection for both scroll position and nav menu state
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
    
    // Set up mutation observer to detect nav menu changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('nav-menu')) {
          checkNavMenu();
        }
      });
    });
    
    // Start observing nav menu for class changes
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);
  
  // Determine button color based on nav menu state first, then other conditions
  // If nav menu is open: always white (since menu bg is black)
  // If in combined section: always white 
  // In slider container: depends on slider position
  const buttonColor = isNavMenuOpen ? "white" : 
                     (isInCombinedSection ? "white" : 
                     (sliderPosition <= 50 ? "black" : "white"));

  // Fetch and play mp3 when toggled ON or padNumber changes
  useEffect(() => {
    let cancelled = false;

    async function fetchAndPlay() {
      if (!isPlaying || !padNumber) return;

      // Clean up previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      try {
        const response = await fetch(`${API_URL}/play_pad?pad=${padNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mp3");
        }
        const blob = await response.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;
        audioRef.current = new Audio(url);
        audioRef.current.loop = true;
        await audioRef.current.play();
      } catch (err) {
        console.error("Audio fetch/play error:", err);
      }
    }

    fetchAndPlay();

    return () => {
      cancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
  }, [isPlaying, padNumber]);

  // Pause/resume audio when toggled
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Audio play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <button
      className="sound-button"
      onClick={() => setIsPlaying((prev) => !prev)}
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