import React, { useState, useRef, useEffect } from "react";
import "./Homepage.css";
import SoundConceptFrame from "./frame.js";
import ConceptFrame from "./frame1.js";
import MiddleFrame from "./frame2.js";
import vector187 from "./vector-187.png";
import group283 from "./group-283.png";
import Cloud from "./Cloud";
import Title from "./title.js";
import SoundToggle from "./SoundToggle";
import { Footer } from "./Footer";
import AudioEnablePopup from "./AudioPopup.js"; // Import the new component
import audioService from "./AudioService";

// In Homepage.js - Create data-driven audio manager
const usePollutantAudio = () => {
  const [audioData, setAudioData] = useState({});
  const [enabled, setEnabled] = useState(false); // Add enabled state
  const audioInstancesRef = useRef({});
  const audioContext = useRef(null);

  // Initialize Audio Context and load data
  useEffect(() => {
    // Initialize WebAudio API
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Load pollutant audio mapping from dataset
    fetch("/api/pollutant-audio-data")
      .then((res) => res.json())
      .then((data) => {
        setAudioData(data);
      });

    return () => {
      // Clean up audio on unmount
      Object.values(audioInstancesRef.current).forEach((instance) => {
        if (instance.oscillator) instance.oscillator.stop();
        if (instance.gainNode) instance.gainNode.disconnect();
      });
      audioContext.current?.close();
    };
  }, []);

  // Generate sound based on pollutant properties
  const playPollutantSound = (elementId) => {
    if (!audioContext.current || !audioData[elementId] || !enabled) return; // Check if enabled

    // Stop any currently playing element sound
    stopActiveSounds();

    const pollutant = audioData[elementId];

    // Extract audio parameters from dataset
    const frequency = parseFloat(pollutant.Sound_Frequency) || 440;
    const audibleFreq =
      parseFloat(pollutant.SineWaveVisualizer_frequency_audiblefrequency) ||
      frequency;
    const enthalpy = parseFloat(pollutant.Enthalpy_) || 0;

    // Create oscillator based on pollutant properties
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    // Set frequency characteristics based on chemistry
    oscillator.type = enthalpy > 0 ? "sine" : "triangle";
    oscillator.frequency.value = audibleFreq;

    // Set envelope based on pollutant type
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.3,
      audioContext.current.currentTime + 0.1
    );

    // Different decay patterns based on pollutant type
    if (pollutant.type_of_waste === 1) {
      // Chemical
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.current.currentTime + 1.5
      );
    } else if (pollutant.type_of_waste === 2) {
      // Heavy metal
      gainNode.gain.linearRampToValueAtTime(
        0.01,
        audioContext.current.currentTime + 2.0
      );
    } else {
      // Other pollutants
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.current.currentTime + 1.0
      );
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

  return {
    playPollutantSound,
    stopElementSound,
    stopActiveSounds,
    enabled,
    setEnabled, // Export the setEnabled function
  };
};

export default function Homepage({ audioControls }) {
  const [showConceptText, setShowConceptText] = useState(false);
  const [showTrapeziumText, setShowTrapeziumText] = useState(false);
  const [showPartneringText, setShowPartneringText] = useState(false);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const [isInTrapezium, setIsInTrapezium] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(() => {
    // Get stored preference, default to true (show popup) if not found
    return localStorage.getItem("audioPopupSeen") !== "true";
  });
  const [audioEnabled, setAudioEnabled] = useState(() => {
    // Check for stored sound preference, default to TRUE if not found
    return localStorage.getItem("audioEnabled") !== "false";
  });
  const audioRef = useRef(null);
  const [cloudAnimationActive, setCloudAnimationActive] = useState(true);

  // Add this useEffect for automatic cloud animation
  useEffect(() => {
    let animationTimer;
    let restartTimer;

    const animateClouds = () => {
      setCloudAnimationActive(true);

      // Reset animation after reaching extreme position
      animationTimer = setTimeout(() => {
        setCloudAnimationActive(false);

        // Short delay before restarting animation cycle
        restartTimer = setTimeout(() => {
          animateClouds();
        }, 500);
      }, 3000); // Animation duration
    };

    // Start the animation cycle
    animateClouds();

    // Clean up timers on unmount
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(restartTimer);
    };
  }, []);

  // Default pad number for the homepage
  const DEFAULT_PAD_NUMBER = "999"; // Choose an appropriate default pad number

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

    const trapezium = document.querySelector(".trapezium-section");
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

  // Update the useEffect that handles audio state synchronization
  useEffect(() => {
    // First, directly update AudioService's mute state
    console.log(`[Homepage] Setting global audio mute state: ${!audioEnabled}`);
    audioService.isMuted = !audioEnabled;
    audioService.toggleMute(!audioEnabled);

    // Then update usePollutantAudio if it exists
    if (audioControls && typeof audioControls.setEnabled === "function") {
      audioControls.setEnabled(audioEnabled);
    }
  }, [audioEnabled, audioControls]);

  // Add the new useEffect for handling audio blocking
  useEffect(() => {
    const handleBlocked = () => setShowAudioPopup(true);
    window.addEventListener("audio-blocked", handleBlocked);
    return () => window.removeEventListener("audio-blocked", handleBlocked);
  }, []);

  // Handler for ConceptFrame hover
  const handleFrameHover = (hovering) => {
    setIsFrameHovered(hovering);
  };

  // Add handler for enabling audio
  const handleEnableAudio = () => {
    setAudioEnabled(true);
    setShowAudioPopup(false);
    // Store both preferences
    localStorage.setItem("audioEnabled", "true");
  };
  const containerRef = useRef(null);

  useEffect(() => {
    // After the component mounts, scroll to the end
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);
  return (
    <div className="homepage">
      {/* Add the Audio Enable Popup */}
      <AudioEnablePopup visible={showAudioPopup} onClick={handleEnableAudio} />

      {/* Apply blurred class to main content when popup is shown */}
      <div
        className={
          showAudioPopup
            ? "homepage-content homepage-blurred"
            : "homepage-content"
        }
      >
        <SoundToggle
          padNumber={DEFAULT_PAD_NUMBER}
          isInTrapezium={isInTrapezium}
          panelMode={isInTrapezium ? "black" : "white"}
          defaultActive={audioEnabled}
          onToggle={(isActive) => {
            // First update our state
            setAudioEnabled(isActive);
            // Then directly update AudioService for immediate effect
            audioService.isMuted = !isActive;
            // Store preference
            localStorage.setItem("audioEnabled", isActive.toString());
          }}
        />
        {/* <audio 
          ref={audioRef} 
          src="/path/to/your/audio-file.mp3"
          preload="auto"
        /> */}

        {/* 🔸 Header Section */}
        <section className="header">
          <div style={{ width: "85%", height: "10%" }}>
            <Title />
          </div>
        </section>

        {/* 🔸 Concept Section */}
        <section className="concept-section" style={{ overflow: "visible" }}>
          <Cloud
            top={80}
            left={45}
            distance="short"
            direction="left"
            variant={1}
          />
          <Cloud
            top={180}
            left={60}
            distance="medium"
            direction="left"
            variant={2}
          />
          <Cloud
            top={0}
            left={72}
            distance="long"
            direction="left"
            variant={3}
          />

          <div className="concept-text">
            <h2>A Remedy for the Venetian Lagoon</h2>
            <p>
              The project upholds phytoremediation—the use of plants and their
              microbiomes for cleaning up an environment—as a cost-effective
              technology for combating pollution in the Venetian Lagoon.
              Integrating artistic expression, scientific inquiry, and data
              sonification, this transdisciplinary project aims to foster
              community engagement via playful exploration of environmental
              data, culminating in an aleatory sound composition.
            </p>
            {showPartneringText && (
              <p>
                Comprising sculptural components, an interactive sound
                installation and a web-based archive, the artwork is anchored on
                three prototypical terrariums, containing PCB-like copper
                cut-outs of phytoremediation plants that can grow in the
                Venetian Lagoon and its myriad streams. Nearby, a table bears an
                array of 36 bottles corresponding to 36 pollutants detected in
                the Venetian Lagoon, each labelled with a QR code. Upon
                scanning, it triggers a change in the ambient soundscape, while
                pulling up detailed information about a particular pollutant,
                its varied sources, and impacts on human health. For each
                pollutant scanned, the web app proposes a plant that can
                potentially mitigate it. Besides listing common names in
                different languages, the interface yields the focus plant's
                growing requirements, origin and geographical distribution,
                nutritional value, medicinal and industrial uses, and capacity
                for phytoremediation—information that can help us better cognise
                and adopt it in our lifestyles and civic infrastructure.
              </p>
            )}
            <div style={{ justifyContent: "center", display: "flex" }}>
              <div
                className="read-more-box"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onClick={() => setShowPartneringText(!showPartneringText)}
              >
                {showPartneringText ? "READ LESS" : "READ MORE"}
              </div>
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
        {/* <div style={{marginTop: '400px'}}> */}
        <section className="trapezium-section" style={{ overflow: "visible" }}>
          <div className="svg-container-trapezium" ref={containerRef}>
            <MiddleFrame
              className="middle-svg-concept"
              preserveAspectRatio="xMidYMid meet"
              audioRef={audioRef}
              handleAudio={handleAudio}
              audioControls={audioControls}
            />
          </div>
          <div className="trapezium-text">
            <h2>Sounding the Invisible</h2>
            <div>

            <p>
              The enveloping soundscape symbolising the Venetian waters is
              composed of frequencies denoting the energetic aspects of water in
              different states. These frequencies have been overlaid with field
              recordings from various locations in Venice such as Porto Marghera
              and San Servolo, as well as its girdling wetlands.
            </p>
            {showTrapeziumText && (
              <p>
                The rippling soundscore interwoven with urban sounds represents
                water not as a chemical compound but as a living and enlivening
                matrix. Similarly, the contaminants that invisibly affect these
                waters and the life they support are 'sounded' through unique
                pollutant frequencies triggered during user interaction. These
                sonic signatures have been compiled using the enthalpy of
                formation (a measure of energy lost or gained during chemical
                bonding) of the contaminant under question, rendered into a
                frequency that falls within the audible range. Moreover, the
                molecular and chemical properties of the pollutant have been
                used to modulate this frequency. As users interact with the
                installation, these sonic signatures get layered on top of the
                ambient track, signalling the insidious seepage of contaminants
                into our waterways. In this manner, the chance score generated
                through audience interaction renders tangible and resonant
                forces that dodge the eye, sneak into our bodies, and hack our
                biological systems.
              </p>
            )}
            </div>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <div
                className="read-more-box"
                onClick={() => setShowTrapeziumText(!showTrapeziumText)}
              >
                {showTrapeziumText ? "READ LESS" : "READ MORE"}
              </div>
            </div>
          </div>
        </section>
        {/* </div> */}

        {/* 🔸 Sound Concept Section */}
        <section
          className="sound-concept-section"
          style={{ overflow: "visible" }}
        >
          <Cloud
            top={3350}
            left={65}
            distance="short"
            direction="left"
            variant={1}
          />
          <Cloud
            top={3490}
            left={45}
            distance="medium"
            direction="left"
            variant={2}
          />
          <div className="sound-text">
            <h2>Partnering with Plants</h2>
            <p>
              In his penultimate book, The Power of Movement in Plants (1880),
              Charles Darwin made a ground-breaking observation, localising the
              plant brain in its roots. His research likened the roots to
              sensitive probes, constantly monitoring and processing a plethora
              of information that helps the plant negotiate its surroundings.
            </p>
            {showPartneringText && (
              <p>
                Though ideas about plant intelligence have been with us for
                quite some time, their scientific applications through processes
                like phytoremediation have taken root rather slowly, reflecting
                our poor estimation of intelligences beyond the human. Current
                research suggests that plants are not just intelligent beings
                but also effective ecological regulators. The zone around their
                roots called the rhizosphere can host colonies of beneficial
                bacteria that prepare pollutants like pesticides, oils, and
                heavy metals for feasting by plants. Thus, working in tandem,
                plants and their resident microorganisms can help stabilise
                their surroundings by filtering, arresting, degrading,
                transforming or even vaporising pollutants. 'Sounding the
                Invisible: An Elegant Symbiosis' seeks to correct epistemic
                biases and speciesist attitudes by embracing the remarkable
                perceptivity and mending proclivity of plants, bringing them to
                bear on our environmental technologies. By enumerating the
                nutritional, medicinal and other benefits of familiar flora
                besides their bioreclamation attributes, the project sketches
                the outlines of a mutualistic relationship through which some of
                these pollutants can be reabsorbed by us, revealing
                bioremediation and food fortification as two sides of the same
                coin. Taking the Venetian Lagoon as its point of departure, the
                project eventually hopes to empower users to develop their own
                plant-based environmental solutions.
              </p>
            )}
            <div style={{ justifyContent: "center", display: "flex" }}>
              <div
                className="read-more-box"
                onClick={() => setShowPartneringText(!showPartneringText)}
              >
                {showPartneringText ? "READ LESS" : "READ MORE"}
              </div>
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

        <div className="downarrow">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ border: "1px solid #000", width: 0, height: 83 }} />
          </div>
        </div>

        <footer className="footer-section mt-0">
          <div className="box">
            <img className="vector" alt="Vector" src={vector187} />
          </div>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
