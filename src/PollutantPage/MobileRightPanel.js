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
  view,
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
    <div className="right-panel" style={{height:view?"100vh":"auto"}}>
      <div
        className="plantContainer"
        style={{
          marginTop: view ? "calc(100% - 70%)" : "calc(100% - 101%)",
        }}
      >
        <div
          className="contentWrapper "
          // style={{transform:" "}}
          //  style={{transform:"translate(54px, 326px)"}}
        >
          <div style={{ transform: "scale(1.1)" }}>
            <div style={{ height: "7%", overflow: "hidden" }}>
              <img
                src={plantimagemobile}
                alt="Pollutant visual"
                style={{
                  width: "90vw",
                  height: "auto",
                }}
              />
            </div>
          </div>
          <h2
            style={{
              fontSize: "38px",
              fontWeight: "400",
              margin: "0px",
              textAlign: "center",
              // transform: "translate(0px, 9px)",
              // position: "absolute",
              // bottom: "calc(100% - 106%)",
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
