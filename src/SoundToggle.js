import React, { useState, useRef, useEffect } from "react";

const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Sound ON by default
  const audioRef = useRef(new Audio("/your-sound-file.mp3")); // Replace with actual file path

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; // Enable looping

    if (isPlaying) {
      audio.play().catch((err) => console.error("Audio play error:", err));
    } else {
      audio.pause();
    }

    return () => audio.pause(); // Stop audio on unmount
  }, [isPlaying]);

  return (
    <button onClick={() => setIsPlaying(!isPlaying)} className="sound-button">
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
