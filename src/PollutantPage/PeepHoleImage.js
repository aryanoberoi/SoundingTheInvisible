import React, { useState } from "react";

const PeepholeEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(100); // Default peephole size

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div style={styles.container} onMouseMove={handleMouseMove}>
      {/* Black Overlay with Peephole Effect */}
      <div
        style={{
          ...styles.overlay,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, transparent 30%, black)`,
          maskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, transparent 30%, black)`,
        }}
      />

      {/* Radius Adjuster */}
      <div style={styles.controls}>
        <label style={{ color: "white" }}>Adjust Peephole Size: </label>
        <input
          type="range"
          min="30"
          max="300"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundImage: 'n19.svg',
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  controls: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },
};

export default PeepholeEffect;