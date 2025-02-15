import React, { useRef, useEffect } from 'react';

const SineWaveVisualizer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let animationFrameId;

    // Sine wave parameters
    const amplitude = height / 2; // Adjust amplitude to fit in frame
    const frequency = (4 * Math.PI) / width; // Increase frequency for faster wave
    const speed = 200; // Increase speed for faster animation
    let offset = 0; // Phase shift

    const drawSineWave = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
        const y = height / 2 + amplitude * Math.sin(frequency * (x + offset));
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = '#0077be';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      offset += speed / 60; // Adjust offset increment for smoother animation
      drawSineWave();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} width={300} height={200} />;
};

export default SineWaveVisualizer;
