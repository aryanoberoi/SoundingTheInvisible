import React, { useState, useEffect, useRef } from "react";

const SoundToggle = ({ isWhiteBg }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection to Flask server
    wsRef.current = new WebSocket("ws://localhost:5000/audio"); // Update with your Flask WebSocket URL

    wsRef.current.binaryType = "arraybuffer";

    wsRef.current.onopen = () => {
      // Request the audio file
      wsRef.current.send("get_audio");
    };

    wsRef.current.onmessage = (event) => {
      // Receive audio data as ArrayBuffer
      const arrayBuffer = event.data;
      const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Audio play error:", err));
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioUrl);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
    // eslint-disable-next-line
  }, []);

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