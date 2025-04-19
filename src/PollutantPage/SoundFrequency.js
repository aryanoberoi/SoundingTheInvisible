import React from 'react';
import SineWaveVisualizer from './sinwave';
import '../pollutantPage.css';

export const SoundFrequency = ({ sections }) => {
  const pollutantName = sections[0].pollutantName || "Pollutant";
  return (
    <div className="sound-frequency-container">
        <div className="content-container">
            <div className="content-container-background" />
            <div className="content-container-underline" />
            <div id = "enthalpy-section" className="content-container-title">Enthalpy and Sound Frequency of {pollutantName}</div>
        </div>

      <div className="wave-container">
        <SineWaveVisualizer frequency={sections[0].wavefrequency} />
        <div className="frequency-details">
          <div className="detail-item">
            <span className="label">Enthalpy of formation:</span>
            <span className="value">{sections[0].enthalpy}</span>
          </div>
          <div className="detail-item">
            <span className="label">Sound Frequency:</span>
            <span className="value">{sections[0].soundfrequency}</span>
          </div>
        </div>
        
        {sections[0].optionalText && (
          <div className="optional-text-container">
            {sections[0].optionalText}
          </div>
        )}
      </div>
    </div>
  );
};