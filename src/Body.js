import React from "react";
import "./Body.css";

export const Box = () => {
  return (
    <div className="health-effects-box">
      <div className="content-sections">
        <div className="header-container">
          <div className="header-overlap">
            <div className="header-background" />
            <div className="header-underline" />
            <div className="header-title">Effects on human health</div>
          </div>
        </div>

        <div className="human-container">
          <div className="human-image-wrapper">
            <img
              className="main-human-image"
              alt="Human anatomy diagram"
              src="https://c.animaapp.com/Vg2l9Q1d/img/group-186.png"
            />
            <div className="human-graphics-container">
              <div className="human-graphics-overlap">
                <img
                  className="human-vector"
                  alt="Anatomy vector"
                  src="https://c.animaapp.com/Vg2l9Q1d/img/human-2.png"
                />
              </div>
            </div>
          </div>
        </div>

        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div className={`content-item content-item-${item}`} key={item}>
            <div className="item-overlap">
              <div className="item-title">Place your title here</div>
              <div className="item-icon-wrapper">
                <img
                  className="item-icon"
                  alt="Expand icon"
                  src={`https://c.animaapp.com/Vg2l9Q1d/img/vector-148-${item % 2 === 0 ? 6 : 4}.svg`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
