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
    maskedimagemobile = "",
  } = sections[0] || {};

  return (
    <div className="right-panel" style={{ height: view ? "100vh" : "auto" }}>
      <div
        className={view ? "plantContainer-mobile" : "plantContainer"}
        style={
          {
            // marginTop: "calc(100% - 101%)",
          }
        }
      >
        <div className="contentWrapper">
          <div
            className="tables_right"
            style={{
              transform: view ? "translate(1px, 114px)" : "scale(1.127)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // marginTop: view ? "4vh" : "2vh",
              marginLeft: "0.15vw",
              marginTop: view ? "1vh" : "calc(100% - 73%)",
              padding: "0px 5px",
            }}
          >
            {/* <div style={{ height: "7%", overflow: "hidden" }}> */}
            <img
              src={view ? plantimagemobile : maskedimagemobile}
              alt="Pollutant visual"
              style={{
                width: view ? "86vw" : "92.5vw",
                height: "auto",
              }}
            />
            {/* </div> */}
          </div>
          {view ? (
            <></>
          ) : (
            <h2
              style={{
                fontSize: "38px",
                fontWeight: "400",
                margin: "0px",
                textAlign: "center",
                // marginBottom: "5em",
                marginTop: "52px",
                // position: "relative",
                // top: "-14vh", // Adjusted to ensure it stays within the screen
              }}
            >
              {plantName}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileRightPanel;
