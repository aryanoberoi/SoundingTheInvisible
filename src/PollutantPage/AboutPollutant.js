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
        <svg width="438" height="22" viewBox="0 0 438 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.0489 10L18.8209 10.445L18.9283 10.5H19.0489V10ZM419.333 10C419.333 11.4728 420.527 12.6667 422 12.6667C423.473 12.6667 424.667 11.4728 424.667 10C424.667 8.52724 423.473 7.33333 422 7.33333C420.527 7.33333 419.333 8.52724 419.333 10ZM0.272074 0.945028L18.8209 10.445L19.2768 9.55497L0.727926 0.0549722L0.272074 0.945028ZM19.0489 10.5H422V9.5H19.0489V10.5Z" fill="white"/>
          <path d="M388.594 18.7849L388.389 19.2411L388.487 19.2849H388.594V18.7849ZM432.619 18.7849C432.619 20.2576 433.813 21.4515 435.286 21.4515C436.758 21.4515 437.952 20.2576 437.952 18.7849C437.952 17.3121 436.758 16.1182 435.286 16.1182C433.813 16.1182 432.619 17.3121 432.619 18.7849ZM368.795 10.4562L388.389 19.2411L388.798 18.3286L369.205 9.54376L368.795 10.4562ZM388.594 19.2849H435.286V18.2849H388.594V19.2849Z" fill="white"/>
          <path d="M401.323 3V2.5H401.075L400.925 2.69737L401.323 3ZM426.333 3C426.333 4.47276 427.527 5.66667 429 5.66667C430.473 5.66667 431.667 4.47276 431.667 3C431.667 1.52724 430.473 0.333333 429 0.333333C427.527 0.333333 426.333 1.52724 426.333 3ZM396.398 10.3026L401.721 3.30263L400.925 2.69737L395.602 9.69737L396.398 10.3026ZM401.323 3.5H429V2.5H401.323V3.5Z" fill="white"/>
        </svg>
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