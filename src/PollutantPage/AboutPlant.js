import React from "react";
import group233 from "./group-233.png";
import "./AboutPlant.css";
import vector41 from "./vector-41.svg";
import vector42 from "./vector-42.svg";
import vector43 from "./vector-43.svg";

export const AboutPlant = () => {
  return (
    // <PeepholeEffect />
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
        <div className="inverted-graphic-container">
          <div className='imageContainer2'></div>
          <img 
            src="n19.svg" 
            alt="graphic element"
            className="inverted-graphic-element"
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
