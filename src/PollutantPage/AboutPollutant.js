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
        <svg width="438" height="16" viewBox="0 0 438 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.0489 7L18.8209 7.445L18.9283 7.5H19.0489V7ZM419.333 7C419.333 8.47276 420.527 9.66667 422 9.66667C423.473 9.66667 424.667 8.47276 424.667 7C424.667 5.52724 423.473 4.33333 422 4.33333C420.527 4.33333 419.333 5.52724 419.333 7ZM0.272074 0.945028L18.8209 7.445L19.2768 6.55497L0.727926 0.0549722L0.272074 0.945028ZM19.0489 7.5H422V6.5H19.0489V7.5Z" fill="white"/>
          <path d="M388.594 13.7849L388.389 14.2411L388.487 14.2849H388.594V13.7849ZM432.619 13.7849C432.619 15.2576 433.813 16.4515 435.286 16.4515C436.758 16.4515 437.952 15.2576 437.952 13.7849C437.952 12.3121 436.758 11.1182 435.286 11.1182C433.813 11.1182 432.619 12.3121 432.619 13.7849ZM368.795 7.45624L388.389 14.2411L388.798 13.3286L369.205 6.54376L368.795 7.45624ZM388.594 14.2849H435.286V13.2849H388.594V14.2849Z" fill="white"/>
          <path d="M401.323 2V1.5H401.075L400.925 1.69737L401.323 2ZM426.333 2C426.333 3.47276 427.527 4.66667 429 4.66667C430.473 4.66667 431.667 3.47276 431.667 2C431.667 0.527237 430.473 -0.666667 429 -0.666667C427.527 -0.666667 426.333 0.527237 426.333 2ZM396.398 7.30263L401.721 2.30263L400.925 1.69737L395.602 6.69737L396.398 7.30263ZM401.323 2.5H429V1.5H401.323V2.5Z" fill="white"/>
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