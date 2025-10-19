import React, { useRef, useEffect } from 'react';

const SineWaveVisualizer = ({ frequency = 200.5 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    let animationFrameId;

    const amplitude = height / 2;
    const wavelength = width;
    let phase = 0;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
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
      // Logarithmic scaling to normalize animation speed
      const normalizedFrequency = Math.max(
        100,
        883.05 * Math.log10(frequency) - 1666.1
      );
      
      phase = normalizedFrequency * (timestamp / 200000);
      drawWaveform();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [frequency]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default SineWaveVisualizer;