import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SoundToggle = ({ isWhiteBg, padNumber }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const socketRef = useRef(null);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL);

    socketRef.current.on("mp3_file", (data) => {
      if (data.error) {
        console.error(data.error);
        return;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      const byteCharacters = atob(data.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Audio play error:", err));
      }
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    if (isPlaying) {
      // Use the padNumber prop
      socketRef.current.emit("play_pad", { pad: padNumber });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      socketRef.current.emit("stop_sounds");
    }
  }, [isPlaying, padNumber]);

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