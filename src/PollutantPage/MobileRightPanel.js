import React from "react";
import "./RightPanel.css";

const MobileRightPanel = ({
  sections = [],
  pollutantName = "",
  onLoad,
  onNavigate,
  view,
}) => {
  const {
    plantimagemobile = "",
    plantName = "",
  } = sections[0] || {};

  return (
    <div className="right-panel" style={{ height: view ? "100vh" : "auto" }}>
      <div
        className="plantContainer"
        style={{
          marginTop: view ? "calc(100% - 70%)" : "calc(100% - 101%)",
        }}
      >
        <div className="contentWrapper">
          <div style={{ transform: "scale(1.107)", marginTop: "2vh", marginLeft: "0.15vw" }}>
            <div style={{ height: "7%", overflow: "hidden" }}>
              <img
                src={plantimagemobile}
                alt="Pollutant visual"
                style={{
                  width: "92.5vw",
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
              marginBottom: "5em",
              position: "relative",
              top: "-15vh", // Adjusted to ensure it stays within the screen
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
