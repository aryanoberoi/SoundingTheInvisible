import React from 'react';
import '../pollutantPage.css'; // Import your CSS file if needed

export const AboutPollutantSection = ({ sections }) => {
  if (!sections || sections.length === 0) return null;
  
  // Get first section's text
  const contentText = sections[0].text;
  
  // Split text at first underscore
  const [titlePart, descriptionPart] = contentText.split(/_/, 2);

  return (
      <div className="main-container" id="about-pollutant">
        <div className="flex-row-f">
          <img 
            src="/ap.png" 
            alt="Pollutant" 
            className="image"
          />
          <div id="about-pollutant-section" className="about-pollutant">
            {/* Split title into two parts at first space */}
            <span className="about">{titlePart.split(' ', 1)[0]} </span>
            <span className="pollutant">
              {titlePart.slice(titlePart.indexOf(' ') + 1)}
            </span>
          </div>
        </div>
        <div className="flex-row-a">
          <img 
            src="l1.png" 
            alt="Vector graphic" 
            className="vector-image"
            style={{width: '100%'}}
          />
        </div>

        <span className="lorem-ipsum-dolor">
          {descriptionPart}
        </span>
        <img 
          src="g3.png" 
          alt="graphic element"
          className="group-3"
        />
      </div>
  );
};