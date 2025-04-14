import React, { useState, useRef, useEffect } from "react";

const PeepholeEffect = ({ imageUrl, width = "100%", height = "100%" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(180);
  const [showSlider, setShowSlider] = useState(false);
  const containerRef = useRef(null);

  // Initialize position in the center and update on resize
  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return; // Exit if ref is not available yet

    // Function to calculate and set the initial position
    const updateInitialPosition = () => {
      const rect = containerElement.getBoundingClientRect();
      const initialX = rect.width * (2 / 3); // Two-thirds from the left
      const initialY = rect.height * (1 / 3); // One-third from the top
      setPosition({
        x: initialX,
        y: initialY,
      });
      console.log("Peephole initial position set to:", initialX, initialY); // Optional: for debugging
    };

    // Create a ResizeObserver to watch the container element
    const resizeObserver = new ResizeObserver(() => {
      // When the container size changes, re-calculate the initial position
      // Note: You might want different behavior on resize, e.g., keep the relative position.
      // For now, it resets to the initial relative position based on the new size.
      updateInitialPosition();
    });

    // Start observing the container element
    resizeObserver.observe(containerElement);

    // Perform initial positioning right after observing
    updateInitialPosition();

    // Cleanup function: stop observing when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array: setup observer once on mount

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
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, white 0%, white 99%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, white 0%, white 99%, transparent 100%)`,
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

      {/* Radius Adjuster with hide/show on hover */}
      <div 
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "5px",
          borderRadius: "5px",
          opacity: showSlider ? 1 : 0,
          transition: "opacity 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <input
          type="range"
          min="50"
          max="300"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          style={{ 
            width: "150px",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  );
};

export default PeepholeEffect;