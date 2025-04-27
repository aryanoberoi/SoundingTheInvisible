import React from 'react';
import '../pollutantPage.css';

export const AboutPollutantSection = ({ sections, wasteTypeIcon }) => {
  if (!sections || sections.length === 0) return null;
  
  // Get first section's text
  const contentText = sections[0].text || '';
  
  // Split text at first underscore
  const [titlePart, descriptionPart] = contentText.split(/_/, 2);

  // Use wasteTypeIcon passed from parent component
  const pollutantIcon = wasteTypeIcon || 'agriculture-waste-icon.svg';

  return (
      <div className="main-container" id="about-pollutant">
        <div className="flex-row-f">
          <img 
            src={pollutantIcon} 
            alt={`${titlePart || 'Pollutant'} waste type`}
            className="imagePollutant"
            onError={(e) => {
              console.warn(`Failed to load pollutant icon: ${e.target.src}`);
              e.target.src = 'agriculture-waste-icon.svg'; // Fallback if image fails to load
            }}
          />
          <div id="about-pollutant-section" className="about-pollutant">
            {/* Split title into two parts at first space */}
            <span className="about">{titlePart ? titlePart.split(' ', 1)[0] : 'About'} </span>
            <span className="pollutant">
              {titlePart ? titlePart.slice(titlePart.indexOf(' ') + 1) : 'Pollutant'}
            </span>
          </div>
        </div>
        {/* Rest of the component remains unchanged */}
        <div className="flex-row-a">
          <img 
            src="l1.png" 
            alt="Vector graphic" 
            className="vector-image"
            style={{width: '100%'}}
          />
        </div>

        <span className="lorem-ipsum-dolor">
          {descriptionPart || ''}
        </span>
        <img 
          src="g3.png" 
          alt="graphic element"
          className="group-3"
        />
      </div>
  );
};