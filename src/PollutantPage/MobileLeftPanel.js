import React from "react";
import "./pollutantcard.css";
import "./LeftPanel.css";
import { KnowMoreButtonInvertedRA } from "./Knowmorebutton";
import { KnowMoreButtonInverted } from "./Knowmorebutton";
import SineWaveVisualizer from "./sinwave";
import pollutantname from "./pollutantname.png";
const MobileLeftPanel = ({ sections = [], onLoad, onNavigate }) => {
  if (sections.length === 0) return null;

  const {
    pollutantName = "Pollutant Name",
    pollutantDescription = "",
    effect = "",
    sources = "",
    atomImage = "",
    typeOfWaste = "",
  } = sections[0];

  // Process health effects into titles
  const healthEffectsTitles = effect.split("_");
console.log("sections",sections)
  return (
    <div className="left-panel">
      <div className="plantContainerleft">
        <div>
          <h2
            style={{
              fontSize: "38px",
              fontWeight: "400",
              margin: "0px",
              // textAlign: "center",
              color: "#fff",
              transform: "translate(15%, 60px)"
            }}
          >{pollutantName}
          </h2>
          <div style={{ transform: "scale(1.4)" }}>
            <img
              src="https://res.cloudinary.com/dky8dsysk/image/upload/v1746707493/01_Potasium_dhitgx.png"
              alt="Pollutant visual"
              style={{ transform: "translate(0%, calc(100% - 220px))" }}
            />
          </div>
        </div>
      </div>

      <div className="animated-down-arrow">
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
      </div>
    </div>
  );
};

export default MobileLeftPanel;
