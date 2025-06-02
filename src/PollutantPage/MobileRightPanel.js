import React from "react";
import { KnowMoreButton } from "./Knowmorebutton";
import "./RightPanel.css";
import { PlantInfoSection } from "./PlantInfoSection";
import tempIcon from "./temp.png";
import humidityIcon from "./humidity.png";
import soilIcon from "./soil.png";
import areaIcon from "./area.png";
import plantimg from "./plantname.png";
const MobileRightPanel = ({
  sections = [],
  pollutantName = "",
  onLoad,
  onNavigate,
}) => {
  const {
    plantimagemobile = "",
    wetlandDescription = "",
    phytoCapacity = "",
    temperature = "",
    humidity = "",
    soil = "",
    ph = "",
    imgUrl = "",
    plantName = "",
    plantDetails = "",
  } = sections[0] || {};
  console.log("KKKKKDs", sections?.plantName, pollutantName);
  const habitatIcons = [tempIcon, humidityIcon, soilIcon, areaIcon];

  const plantData = [
    {
      title: "Wetland status:",
      description: wetlandDescription,
    },
    {
      title: `Phytoremediation capacity of ${plantName}:`,
      description: phytoCapacity.split("_").join("\n"),
    },
    {
      title: `${plantName}'s Habitat:`,
      description: [
        `Temperature: ${temperature}`,
        `Humidity: ${humidity}`,
        `Soil: ${soil}`,
        `PH Value: ${ph}`,
      ].join("\n"),
    },
  ];

  return (
    <div className="right-panel">
      <div className="plantContainer">
        <div
          className="contentWrapper "
          // style={{transform:" "}}
          //  style={{transform:"translate(54px, 326px)"}}
        >
          <img
            src={plantimagemobile}
            alt="Pollutant visual"
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(1.35) translateX(17px)",
            }}
            // className="pollutantVisualImage"
          />
          <h2
            style={{
              fontSize: "38px",
              fontWeight: "400",
              margin: "0px",
              textAlign: "center",
              transform: "translate(0px, 9px)",
            }}
          >
            {plantName}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MobileRightPanel;
