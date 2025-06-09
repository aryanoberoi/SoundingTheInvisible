import React from "react";
import "./pollutantcard.css";
import "./LeftPanel.css";
import { KnowMoreButtonInvertedRA } from "./Knowmorebutton";
import { KnowMoreButtonInverted } from "./Knowmorebutton";
import SineWaveVisualizer from "./sinwave";
import pollutantname from "./pollutantname.png";
const MobileLeftPanel = ({
  sections = [],
  onLoad,
  onNavigate,
  sliderPosition = 50,
  view,
}) => {
  if (sections.length === 0) return null;

  const {
    pollutantimagedesktop = "",
    pollutantimagemobile = "",
    pollutantName = "Pollutant Name",
    pollutantDescription = "",
    effect = "",
    sources = "",
    atomImage = "",
    typeOfWaste = "",
  } = sections[0];

  // Process health effects into titles
  const healthEffectsTitles = effect.split("_");
  console.log("sections", sliderPosition);
  return (
    <div className="left-panel">
      <div className="plantContainerleft" style={{ width: "100vw" }}>
        <div style={{ width: "86%" }}>
          {view ? (
            <p
              style={{
                fontSize: "18px",
                fontWeight: "400",
                margin: "0px",
                textAlign: "center",
                color: "#fff",
                transform: "translate(-15px, -10px)",
                // transform: "translate(0px, -10px)",
              }}
            >
              {pollutantName}
            </p>
          ) : (
            <></>
          )}
          {!view ? (
            <h2
              style={{
                fontSize: "38px",
                fontWeight: "400",
                margin: "0px",
                textAlign: "center",
                color: "#fff",
                transform: "translate(-15px, 0px)",
              }}
            >
              {pollutantName}
            </h2>
          ) : (
            <></>
          )}
          {/* <div style={{ transform: "scale(1.15) translate(0px, calc(100% - 949px))" }}> */}
          <div
            style={{
              transform: "scale(1.15) translate(0px, calc(100% - 107.99%))",
              zIndex: 9999, // Very high z-index to display on other components
            }}
          >
            <img
              src={pollutantimagemobile}
              alt="Pollutant visual"
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>

      {/* <div className="animated-down-arrow">
        <svg
          width="42"
          height="52"
          viewBox="0 0 42 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 3V37"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M18 31L21 41L24 31"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div> */}
    </div>
  );
};

export default MobileLeftPanel;
