// src/PlayPads.js
import React, { useRef } from "react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Change if your Flask server runs elsewhere

function PlayPads() {
  const audioRefs = useRef([]);

  const playPad = async (padNumber) => {
    try {
      // Fetch the MP3 file from the Flask backend
      const response = await fetch(`${API_BASE}/play_pad?pad=${padNumber}`);
      if (!response.ok) {
        alert(`No MP3 found for pad ${padNumber}`);
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Play the audio
      if (!audioRefs.current[padNumber]) {
        audioRefs.current[padNumber] = new Audio(url);
      } else {
        audioRefs.current[padNumber].src = url;
      }
      audioRefs.current[padNumber].play();
    } catch (err) {
      alert("Error playing sound: " + err.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Play Pads 1-36</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {Array.from({ length: 36 }, (_, i) => (
          <button
            key={i + 1}
            style={{
              width: 60,
              height: 60,
              fontSize: 20,
              margin: 4,
              borderRadius: "50%",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => playPad(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlayPads;