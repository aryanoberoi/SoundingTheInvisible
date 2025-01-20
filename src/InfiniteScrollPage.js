import React, { useState } from 'react';
import './pollutantPage.css';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderMove = (e) => {
    const container = document.getElementById('slider-container');
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleSliderMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleSliderMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div id="slider-container" className="slider-container">
      <div
        className="left-panel"
        style={{ width: `${sliderPosition}%` }}
      ></div>
      <div
        className="right-panel"
        style={{ width: `${100 - sliderPosition}%` }}
      ></div>
      <div
        className="slider-bar"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="slider-circle">
          <div className="slider-half left-half">
            <span className="arrow left-arrow">&#9664;</span>
          </div>
          <div className="slider-half right-half">
            <span className="arrow right-arrow">&#9654;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollutantPage;

