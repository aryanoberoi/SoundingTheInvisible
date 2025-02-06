import React, { useState, useEffect, useRef } from "react";

const SoundToggle = ({ isWhiteBg }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio("/your-sound-file.mp3")); // Replace with actual file path

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Audio play error:", err));
    } else {
      audio.pause();
    }

    return () => audio.pause();
  }, [isPlaying]);

  return (
    <button className={`sound-button ${isWhiteBg ? "white-bg" : ""}`} onClick={() => setIsPlaying(!isPlaying)}>
      <div className={`sound-icon ${isPlaying ? "playing" : "muted"}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
};

export default SoundToggle;
