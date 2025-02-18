import React, { useRef, useEffect } from 'react';

const SineWaveVisualizer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let animationFrameId;

    // Waveform parameters
    const barWidth = 2; // Width of each vertical bar
    const speed = 0.5; // Speed of the wave animation (lower is slower)
    let offset = 3; // Phase shift

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);

      // Loop through the canvas width and draw vertical bars for the top and bottom halves
      for (let x = 0; x < width; x++) {
        // Top half wave
        const topY = height / 2 + Math.sin((x + offset) * speed) * (height / 2);
        
        // Bottom half wave mirrors the top half
        const bottomY = height / 2 + Math.sin((x + offset) * speed) * -(height / 2);

        // Draw the top half
        ctx.beginPath();
        ctx.moveTo(x, height / 2);
        ctx.lineTo(x, topY);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = barWidth;
        ctx.stroke();

        // Draw the bottom half (mirrored)
        ctx.beginPath();
        ctx.moveTo(x, height / 2);
        ctx.lineTo(x, bottomY);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = barWidth;
        ctx.stroke();
      }
    };

    const animate = () => {
      offset += 15; // Control how quickly the wave shifts
      drawWaveform();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} width={300} height={90} style={{ display: 'block' }} />;
};

export default SineWaveVisualizer;
