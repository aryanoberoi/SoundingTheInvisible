import React, { useRef, useEffect } from 'react';

const SineWaveVisualizer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    let animationFrameId;

    // Wave parameters for 440Hz (A4 note)
    const frequency = 4; // Hz (cycles per second)
    const amplitude = height / 2; // Changed from /4 to /2 to use full height
    const wavelength = width; // Display one full cycle across canvas width
    let phase = 0;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height/2); // Start at center-left

      // Create continuous wave path
      for (let x = 0; x < width; x++) {
        // Wave equation: y = A*sin(2π(x/λ - ft) + φ)
        const y = height/2 + amplitude * Math.sin(
          (x * 2 * Math.PI / wavelength) - // Spatial component
          (phase * 2 * Math.PI) // Temporal component
        );
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = (timestamp) => {
      // Calculate phase based on frequency and time
      phase = frequency * (timestamp / 1000); // Convert ms to seconds
      drawWaveform();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} style={{ 
    width: '100%',
    height: '100%',
    display: 'block' 
  }} />;
};

export default SineWaveVisualizer;