import React from 'react';
import '../pollutantPage.css'; // Import your CSS file if needed

const AboutPollutantSection = () => {
  return (
    <div className="bottom-section1" id="about-pollutant">
      <div className="main-container">
        <div className="flex-row-f">
          <img 
            src="/ap.png" 
            alt="Pollutant" 
            className="image"
          />
          <div className="about-pollutant">
            <span className="about">About </span>
            <span className="pollutant">Pollutant </span>
          </div>
        </div>
        <div className="flex-row-a">
          <img 
            src="l1.png" 
            alt="Vector graphic" 
            className="vector-image"
          />
        </div>

        <span className="lorem-ipsum-dolor">
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
        <img 
          src="g3.png" 
          alt="graphic element"
          className="group-3"
        />
      </div>
    </div>
  );
};

export default AboutPollutantSection;