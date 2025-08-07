// ... existing imports
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
import audioService from "./AudioService";

export default function Homepage({ audioControls }) {
  const [showTrapeziumText, setShowTrapeziumText] = useState(false);
  const [showPartneringText, setShowPartneringText] = useState(false);
  const [isFrameHovered, setIsFrameHovered] = useState(false);
  const [isInTrapezium, setIsInTrapezium] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioRef = useRef(null);
  const [cloudAnimationActive, setCloudAnimationActive] = useState(true);
  const containerRef = useRef(null);
  const interactive = useRef(null);
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1")
      .then((res) => res.json())
      .then((data) => setSheetData(data))
      .catch((err) => console.error("Failed to fetch sheet data:", err));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
    if (interactive.current) {
      interactive.current.scrollLeft = interactive.current.scrollWidth;
    }
  }, []);

  const DEFAULT_PAD_NUMBER = "999";

  useEffect(() => {
    const trapeziumObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInTrapezium(entries[0].isIntersecting);
        }
      },
      { threshold: 0.3 }
    );

    const trapezium = document.querySelector(".trapezium-section");
    if (trapezium) {
      trapeziumObserver.observe(trapezium);
    }

    return () => trapeziumObserver.disconnect();
  }, []);

  useEffect(() => {
    audioService.isMuted = !audioEnabled;
    audioService.toggleMute(!audioEnabled);

    if (audioControls && typeof audioControls.setEnabled === "function") {
      audioControls.setEnabled(audioEnabled);
    }
  }, [audioEnabled, audioControls]);

  const handleFrameHover = (hovering) => {
    setIsFrameHovered(hovering);
  };

  const handleAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  function renderWithLineBreaks(text) {
    if (!text) return "";
    // Replace literal \n escaped characters and actual newlines
    return text
      .replace(/\\n/g, "<br/>")  // Handles literal escaped \n
      .replace(/\n/g, "<br/>");  // Handles real newlines
  }



  return (
    <div className="homepage">
      <div className="homepage-content">
        <SoundToggle
          padNumber={DEFAULT_PAD_NUMBER}
          isInTrapezium={isInTrapezium}
          panelMode={isInTrapezium ? "black" : "white"}
          defaultActive={audioEnabled}
        />

        {/* Header */}
        <section className="header">
          <div
            className="header-container"
            style={{
              width: window.innerWidth <= 768 ? "85%" : "auto",
              height: window.innerWidth <= 768 ? "10%" : "auto",
            }}
          >
            <Title />
          </div>
        </section>

        {/* Concept Section */}
        <section className="concept-section" style={{ overflow: "visible" }}>
          <Cloud top={0} left={45} distance="short" direction="left" variant={1} />
          <Cloud top={90} left={60} distance="medium" direction="left" variant={2} />
          <Cloud top={-170} left={72} distance="long" direction="left" variant={3} />

          <div className="concept-text">
            <h2>{sheetData[0]?.Title_1}</h2>
            <p dangerouslySetInnerHTML={{ __html: renderWithLineBreaks(sheetData[0]?.Para_1) }} />
            {showPartneringText && (
              <p dangerouslySetInnerHTML={{ __html: renderWithLineBreaks(sheetData[0]?.Para_2) }} />
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

          <div className="svg-container-concept" ref={interactive}>
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

        {/* Trapezium Section */}
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
            <h2>{(sheetData[0]?.Title_2)}</h2>
            <p dangerouslySetInnerHTML={{ __html: renderWithLineBreaks(sheetData[0]?.Para_3) }} />
            {showTrapeziumText && (
              <p dangerouslySetInnerHTML={{ __html: renderWithLineBreaks(sheetData[0]?.Para_4) }} />
            )}

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

        {/* Sound Concept Section */}
        <section className="sound-concept-section" style={{ overflow: "visible" }}>
          <Cloud top={3150} left={65} distance="short" direction="left" variant={1} />
          <Cloud top={3290} left={45} distance="medium" direction="left" variant={2} />
          <div className="sound-text">
            <h2>{sheetData[0]?.Title_3}</h2>
            <p dangerouslySetInnerHTML={{ __html: renderWithLineBreaks(sheetData[0]?.Para_5) }} />
            {showPartneringText && (
              <p dangerouslySetInnerHTML={{ __html: renderWithLineBreaks(sheetData[0]?.Para_6) }} />
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
