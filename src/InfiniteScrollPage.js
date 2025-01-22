import React, { useState } from 'react';
import './pollutantPage.css';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(0);

  const handleSliderMove = (e) => {
    const container = document.getElementById('slider-container');
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      const screenWidth = window.innerWidth;
      const boundaryOffset = (5 / screenWidth) * 100; // Last 5 cm in percentage

      if (newPosition >= 100 - boundaryOffset) {
        setSliderPosition(100 - boundaryOffset);
        setRotation(90); // Stop rotation at the end
      } else if (newPosition <= boundaryOffset) {
        setSliderPosition(boundaryOffset);
        setRotation(-90); // Stop rotation at the beginning
      } else {
        setSliderPosition(newPosition);

        // Calculate rotation proportionally to slider movement
        const rotationFactor = 180 / (100 - 2 * boundaryOffset);
        const adjustedPosition = newPosition - boundaryOffset;
        const maxRotation = 90; // Maximum rotation at each end

        if (adjustedPosition > sliderPosition - boundaryOffset) {
          setRotation(Math.min((adjustedPosition * rotationFactor) - 90, maxRotation));
        } else if (adjustedPosition < sliderPosition - boundaryOffset) {
          setRotation(Math.max((adjustedPosition * rotationFactor) - 90, -maxRotation));
        }
      }
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
        <div
          className="slider-circle"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
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
