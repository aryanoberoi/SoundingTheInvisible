// AudioEnablePopup.js
import React from "react";
import "./AudioPopup.css"

export const AudioEnablePopup = ({ visible, onClick }) => {
  if (!visible) return null;
  
  return (
    <div className="audio-enable-popup">
      <div className="audio-enable-content">
        <div className="popup-text-container">
          <h3>Enable Interactive Sound</h3>
          <p>Click anywhere to enable sound interaction. After clicking, you can hover over elements to hear their unique sounds.</p>
          <button onClick={onClick}>Enable Sound</button>
        </div>
      </div>
    </div>
  );
};

export default AudioEnablePopup;