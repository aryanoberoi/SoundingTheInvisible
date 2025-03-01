import React, { useState } from "react";

const PeepholeEffect = ({ peepholeSize = 100 }) => {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isPeeping, setIsPeeping] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchStart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setIsPeeping(true);
    setPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleTouchMove = (e) => {
    if (!isPeeping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleTouchEnd = () => {
    setIsPeeping(false);
    setPosition({ x: -9999, y: -9999 });
  };

  return (
    <div
      className="relative w-64 h-64 bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: -9999, y: -9999 })}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        maskImage: `radial-gradient(circle ${peepholeSize}px at ${position.x}px ${position.y}px, white 20%, black 80%)`,
        WebkitMaskImage: `radial-gradient(circle ${peepholeSize}px at ${position.x}px ${position.y}px, white 20%, black 80%)`,
        backgroundColor: "white",
      }}
    />
  );
};

export default PeepholeEffect;
