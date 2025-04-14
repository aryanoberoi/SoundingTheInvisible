import React, { useRef, useEffect } from 'react';

const SineWaveVisualizer = ({ frequency = 200.5 }) => { // Default frequency set to 1 Hz for slower propagation
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth; // Increase width by 50%
    const height = canvas.parentElement.clientHeight; // Decrease height by 50%
    canvas.width = width;
    canvas.height = height;
    let animationFrameId;

    const amplitude = height / 2; // Use full height for amplitude
    const wavelength = width; // Display one full cycle across canvas width
    let phase = 0;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2); // Start at center-left

      // Create continuous wave path
      for (let x = 0; x < width; x++) {
        // Wave equation: y = A*sin(2π(x/λ - ft) + φ)
        const y = height / 2 + amplitude * Math.sin(
          (x * 2 * Math.PI / wavelength) - (phase * 2 * Math.PI)
        );
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = (timestamp) => {
      // Slower phase progression: the larger the divisor, the slower the wave moves.
      phase = frequency * (timestamp / 200000);
      drawWaveform();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [frequency]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default SineWaveVisualizer;
