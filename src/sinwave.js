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
    let speed = 0.01; // Initial speed/frequency of the wave animation
    let frequencyChangeRate = 0.01; // Rate at which the frequency changes
    let offset = 3; // Phase shift
    let amplitude = height / 2; // Amplitude of the wave
    const maxAmplitude = height / 2; // Max amplitude for the wave
    const minAmplitude = height / 4; // Min amplitude for the wave
    let lastAmplitudeChangeTime = 0;

    // Randomize amplitude over time
    const randomAmplitude = () => {
      const currentTime = Date.now();
      if (currentTime - lastAmplitudeChangeTime > 500) { // Change amplitude every 200ms
        amplitude = Math.random() * (maxAmplitude - minAmplitude) + minAmplitude; // Random amplitude between min and max
        lastAmplitudeChangeTime = currentTime;
      }
    };

    // Randomize frequency/speed over time
    const randomizeSpeed = () => {
      if (Math.random() > 0.99) { // Randomly change frequency
        frequencyChangeRate = (Math.random() - 0.5) * 0.02; // Random small changes to frequency rate
      }
      speed += frequencyChangeRate;
      if (speed > 2) speed = 2; // Cap speed
      if (speed < 0.2) speed = 0.2; // Minimum speed
    };

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);

      // Loop through the canvas width and draw vertical bars for the top and bottom halves
      for (let x = 0; x < width; x++) {
        // Top half wave (randomized amplitude)
        const topY = height / 2 + Math.sin((x + offset) * speed) * amplitude;

        // Bottom half wave mirrors the top half
        const bottomY = height / 2 + Math.sin((x + offset) * speed) * -amplitude;

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
      offset += 2; // Control how quickly the wave shifts

      // Randomize amplitude and frequency to simulate a more natural waveform
      randomAmplitude();
      randomizeSpeed();

      drawWaveform();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} width={300} height={90} style={{ display: 'block' }} />;
};

export default SineWaveVisualizer;
