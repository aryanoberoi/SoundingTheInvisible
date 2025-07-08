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

  //comment
  return (
    <div className="right-panel" style={{ height: view ? "100vh" : "auto" }}>
      {/* <div
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
           <img
              src={view ? plantimagemobile : maskedimagemobile}
              alt="Pollutant visual"
              style={{
                width: view ? "86vw" : "100vw",
                height: "auto",
              }}
            />
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
      </div> */}
      <div
        className={`plantContainer ${!view ? "" : "--plantContainerleft"}`}
        style={{ width: "100vw" }}
      >
        <div style={{ width: "86%" }}>
        
          {!view ? (
            <h2
              style={{
                fontSize: "38px",
                fontWeight: "400",
                margin: "0px",
                textAlign: "center",
                color: "#000",
                // transform: "translate(-7px, -90px)",
              }}
            ></h2>
          ) : (
            <></>
          )}
          {/* <div style={{ transform: "scale(1.15) translate(0px, calc(100% - 949px))" }}> */}
          <div
            className="tables_right"
            style={{
              paddingBottom:view?"40%":"",
              paddingTop:view?"10%":"",
              transform: view
                ? "translate(0px, calc(100.36% - 84.05%))"
                : "scale(1.15) translate(0px, calc(100.36% - 94.05%))",
              zIndex: 9999, // Very high z-index to display on other components
            }}
          >
            <img
              src={view ? plantimagemobile : maskedimagemobile}
              alt="Pollutant visual"
              style={{
                width: view ? "75vw" : "100vw",
                height: "auto",
              }}
            />
          </div>
          <h2
            style={{
              fontSize: "35px",
              fontWeight: "400",
              margin: "0px",
              textAlign: "center",
              color: "#000",
              transform: "translate(-7px, 48px)",
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
