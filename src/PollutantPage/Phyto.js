import React from "react";
import ellipse88 from "./ellipse-88.svg";
import "./Phyto.css";
import vector164 from "./vector-164.svg";
import vector165 from "./vector-165.svg";

export const Phyto = () => {
  return (
    <div className="box">
      <div className="group">
        <div className="text-wrapper">Plant species name</div>

        <div className="overlap-group">
          <p className="div">10 / 20 / 30</p>

          <div className="div-wrapper">
            <div className="text-wrapper-2">Time period (days)</div>
          </div>

          <img className="vector" alt="Vector" src={vector164} />

          <img className="img" alt="Vector" src={vector165} />

          <img className="ellipse" alt="Ellipse" src={ellipse88} />
        </div>

        <div className="overlap">
          <div className="element">50% /&nbsp;&nbsp;55%&nbsp;&nbsp;/ 60%</div>

          <div className="group-2">
            <div className="rectangle" />

            <div className="text-wrapper-2">Petroleum removal (%)</div>
          </div>
        </div>
      </div>
      <div className="box">
      <div className="group">
        <div className="text-wrapper">Plant species name</div>

        <div className="overlap-group">
          <p className="div">10 / 20 / 30</p>

          <div className="div-wrapper">
            <div className="text-wrapper-2">Time period (days)</div>
          </div>

          <img className="vector" alt="Vector" src={vector164} />

          <img className="img" alt="Vector" src={vector165} />

          <img className="ellipse" alt="Ellipse" src={ellipse88} />
        </div>

        <div className="overlap">
          <div className="element">50% /&nbsp;&nbsp;55%&nbsp;&nbsp;/ 60%</div>

          <div className="group-2">
            <div className="rectangle" />

            <div className="text-wrapper-2">Petroleum removal (%)</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
