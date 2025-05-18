// AudioEnablePopup.js
import React from "react";
import "./AudioPopup.css"

export const AudioEnablePopup = ({ visible, onClick }) => {
  if (!visible) return null;
  
  return (
    <div className="audio-enable-popup">
      <div className="audio-enable-content">
        <div className="audio-popup-text">
          This website uses audio for <span className="bold">a better experience</span>
        </div>
        <button className="enable-sound-button" onClick={onClick}>
          ENABLE SOUND
        </button>
      </div>
    </div>
  );
};

export default AudioEnablePopup;