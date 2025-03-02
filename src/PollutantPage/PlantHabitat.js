import React from "react";
import "./PlantHabitat.css";
import plantSvg from "./plant.svg";

export const PlantHabitat = () => {
  return (
    <div className="plant-habitat-container">
      <div className="habitat-main-group">
        <div className="habitat-overlap">
          <div className="habitat-overlap-group">
            <div className="header-wrapper">
              <div className="header-overlap-wrapper">
                <div className="header-content">
                  <div className="header-background" />
                  <div className="header-underline" />
                  <div className="habitat-title">Plant habitat</div>
                </div>
              </div>
            </div>

            <img
              className="plant-svg"
              alt="Plant habitat diagram"
              src={plantSvg}
            />

            <div className="habitat-section-1">
              <p className="section-content">
                Festuca arundinacea originates from Europe where it primarily
                occurs in grasslands, woodland margins, and coastal marshes, with
                its native range extending from the Mediterranean to northern
                Europe
              </p>
              <div className="section-title">Diverse Habitats</div>
            </div>

            <div className="habitat-section-2">
              <p className="section-content">
                Festuca arundinacea originates from Europe where it primarily
                occurs in grasslands, woodland margins, and coastal marshes, with
                its native range extending from the Mediterranean to northern
                Europe
              </p>
              <div className="section-title">Flood and Drought adaptability</div>
            </div>

            <div className="habitat-section-3">
              <p className="section-content">
                Festuca arundinacea originates from Europe where it primarily
                occurs in grasslands, woodland margins, and coastal marshes, with
                its native range extending from the Mediterranean to northern
                Europe
              </p>
              <div className="section-title">Climate Resilience</div>
            </div>

            <div className="habitat-section-4">
              <p className="section-content">
                Festuca arundinacea originates from Europe where it primarily
                occurs in grasslands, woodland margins, and coastal marshes, with
                its native range extending from the Mediterranean to northern
                Europe
              </p>
              <div className="section-title">Moisture preference</div>
            </div>

            <div className="habitat-section-5">
              <p className="section-content">
                Festuca arundinacea originates from Europe where it primarily
                occurs in grasslands, woodland margins, and coastal marshes, with
                its native range extending from the Mediterranean to northern
                Europe
              </p>
              <div className="section-title">Temperature and humidity tolerance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
