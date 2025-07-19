import React from "react";
import ellipse88 from "./ellipse-88.svg";
import "./Phyto.css";
import vector164 from "./vector-164.svg";
import Mobilevector164 from "./Mobilevector-164.svg";
import vector165 from "./vector-165.svg";
import Mobilevector165 from "./Mobilevector-165.svg";

export const Phyto = ({ sections, pollutantName }) => {
  const getSpeciesName = (text) => text?.split("_")[0];
  const getMedium = (text) => text?.split("_")[1];
  const getTimePeriod = (text) => text?.split("_")[1];
  const getRemediation = (text) => text?.split("_")[1];
  // const vector165 = "";
  return (
    <div className="box" id="phytoremediation">
      {/* Header Section */}
      <div className="overlap-group-wrapper">
        <div className="overlap-group-2">
          <div className="text-wrapper-3">
            Plants remediating &nbsp;
            <span className="mobile-br">
              <br />
            </span>{" "}
            {pollutantName} contamination
          </div>{" "}
        </div>
      </div>

      {/* Map through the sections to create species boxes */}
      {sections.map((section, index) => (
        <div
          key={index}
          className={`box ${index % 3 === 1 ? "right-aligned" : ""}`}
        >
          <div className="group">
            <div className="text-wrapper">{getSpeciesName(section.medium)}</div>

            <div className="overlap-group">
              <div className="medium-label">Medium</div>
              <img
                className={`img ${index % 3 !== 1 ? "--blockview" : ""}`}
                alt="Vector"
                src={vector165}
                style={{
                  top: "60px",
                  transform: index % 3 === 1 ? "none" : "scaleX(-1)",
                  left:
                    index % 3 === 1
                      ? window.innerWidth <= 768
                        ? "calc(60%)"
                        : "calc(64%)"
                      : "calc(100% - 31%)",
                }}
              />
              <div className="soil-label" style={{ fontSize: "18px" }}>
                {getMedium(section.medium)}
              </div>

              <div
                className={`time-period-container ${
                  index % 3 === 1 ? "time-period-container-group2" : ""
                }`}
              >
                <p className="div">{getTimePeriod(section.timePeriod)}</p>
                <div className="div-wrapper">
                  <div className="text-wrapper-2 text-wrapper-99 ">
                    Time period (days)
                  </div>
                </div>
              </div>

              <img
                className="vector"
                alt="Vector"
                src={window.innerWidth <= 768 ? Mobilevector164 : vector164}
                style={
                  index % 3 === 1
                    ? {
                        transform: "scaleX(-1)",
                        left: "calc(52%)",
                      }
                    : {}
                }
              />

              <img
                className="img"
                alt="Vector"
                src={vector165}
                style={
                  index % 3 === 1
                    ? window.innerWidth <= 768
                      ? {
                          transform: "scaleX(-1)",
                          left: "calc(72%)",
                        }
                      : {
                          transform: "scaleX(-1)",
                          left: "calc(76%)",
                        }
                    : {}
                }
              />

              <img
                className="ellipse"
                alt="Ellipse"
                src={ellipse88}
                style={
                  index % 3 === 1
                    ? {
                        transform: "scaleX(-1)",
                        left: "calc(65%)",
                      }
                    : {}
                }
              />
            </div>

            <div
              className={`overlap ${
                index % 3 === 1 ? "overlap-group-right" : ""
              }`}
            >
              <div
                className={`group-2 ${
                  index % 3 === 1 ? "right-aligned-group" : ""
                }`}
              >
                <div className="element">
                  {getRemediation(section.remediation)}
                </div>
                <div className="rectangle" />
                <div className="text-wrapper-2">
                  {pollutantName} removal (%)
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
