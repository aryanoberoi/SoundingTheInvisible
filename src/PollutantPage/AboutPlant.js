import React from "react";
import "./AboutPlant.css";
import PeepholeEffect from "./PeepHoleImage";

export const AboutPlant = () => {
  return (
    <div className="inverted-section">
      <div className="main-container inverted">
        <div className="flex-row-f">
          <img 
            src="/ap.png" 
            alt="Pollutant" 
            className="image inverted-text"
          />
          <div className="about-pollutant">
            <span className="about" style={{color: 'black'}}>About </span>
            <span style={{color: 'black'}}>Plant </span>
          </div>
        </div>
        <div className="flex-row-a">
          <img 
            src="l1.png" 
            alt="Vector graphic" 
            className="vector-image inverted-image"
          />
        </div>
        <span className="lorem-ipsum-dolor inverted-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
          imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu
          neque. Etiam rhoncus erat non quam vehicula, sed maximus magna
          tincidunt. Sed condimentum sollicitudin nibh, nec mattis quam. Ut eu
          volutpat nisi, quis varius risus. Integer rutrum eros ac turpis euismod,
          in tincidunt risus dapibus. Etiam eget turpis massa. Fusce rutrum sit
          amet magna sit amet aliquam. Donec sit amet cursus erat, sit amet
          sagittis nunc. Nullam mattis risus nisi, non interdum elit congue in.
          Donec vitae ligula elit. Morbi nec luctus elit, eu feugiat turpis. Sed
          porttitor luctus ornare. Suspendisse condimentum fermentum convallis.
        </span>
        <div className="inverted-graphic-container" style={{ height: "400px" }}>
          {/* Replace the imageContainer2 div with the PeepholeEffect component */}
          <PeepholeEffect 
            imageUrl="n19.svg" 
            width="100%" 
            height="400px" 
          />
        </div>
        <div className="wetland-status-container">
          <div className="rectangle-inv" />
          <div className="wetland-black-bar" />
          <div className="wetland-status-text">Wetland Status</div>
        </div>
        <span className="lorem-ipsum-dolor inverted-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
        imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu
        neque. Etiam rhoncus erat non quam vehicula, sed maximus magna
        tincidunt. Sed condimentum sollicitudin nibh, nec mattis quam. Ut eu
        </span>
      </div>
    </div>
  );
};