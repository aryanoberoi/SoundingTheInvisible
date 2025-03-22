import React, { useState, useRef, useEffect } from "react";

const PeepholeEffect = ({ imageUrl, width = "100%", height = "100%" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(100); // Increased default peephole size
  const containerRef = useRef(null);

  // Initialize position in the center
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: rect.width / 2,
        y: rect.height / 2,
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      // Get position relative to the container
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Make sure coordinates are within bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setPosition({ x, y });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        width: width,
        height: height,
        position: "relative",
        overflow: "hidden",
        background: "#000", // Black background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }} 
      onMouseMove={handleMouseMove}
    >
      {/* Hidden SVG image (only visible through peephole) */}
      <img
        src={imageUrl}
        alt="Peephole background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          position: "relative",
          display: "block",
          visibility: "hidden" // Hide the original image
        }}
      />

      {/* Peephole Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* This is the peephole that reveals the image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, white 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, white 0%, transparent 100%)`,
          }}
        >
          {/* White background behind visible SVG parts */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#fff",
              zIndex: 1
            }}
          />
          
          {/* SVG image - only visible within the peephole */}
          <img
            src={imageUrl}
            alt="Peephole view"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "relative",
              zIndex: 2
            }}
          />
        </div>
      </div>

      {/* Radius Adjuster with increased range */}
      <div style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "5px",
        borderRadius: "5px",
      }}>
        <input
          type="range"
          min="50"    // Increased minimum radius
          max="300"   // Increased maximum radius
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          style={{ width: "150px" }} // Made slider wider for better control
        />
      </div>
    </div>
  );
};

export default PeepholeEffect;