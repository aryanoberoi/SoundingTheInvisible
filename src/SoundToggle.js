import React, { useState, useEffect, useRef } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

const SoundToggle = ({ isWhiteBg, padNumber }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);

  // Fetch and play mp3 when toggled ON or padNumber changes
  useEffect(() => {
    let cancelled = false;

    async function fetchAndPlay() {
      if (!isPlaying || !padNumber) return;

      // Clean up previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      try {
        const response = await fetch(`${API_URL}/play_pad?pad=${padNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mp3");
        }
        const blob = await response.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;
        audioRef.current = new Audio(url);
        audioRef.current.loop = true;
        await audioRef.current.play();
      } catch (err) {
        console.error("Audio fetch/play error:", err);
      }
    }

    fetchAndPlay();

    return () => {
      cancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
  }, [isPlaying, padNumber]);

  // Pause/resume audio when toggled
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Audio play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <button
      className={`sound-button ${isWhiteBg ? "white-bg" : ""}`}
      onClick={() => setIsPlaying((prev) => !prev)}
    >
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