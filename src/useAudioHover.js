// src/useAudioHover.js
import { useState, useRef, useEffect } from 'react';

export function useAudioHover(categorizedData) {
  const audioContext = useRef(null);
  const oscillators = useRef({});
  
  const idMappings = {
    'atrazine': 'Atrazine ',
    'diclofenac': 'Diclofenac',
    'aluminum': 'Aluminium',  // Note the spelling difference
    'nickel': 'Nickel',
    // Add mappings for all your elements
  };
  
  // Initialize Web Audio API context
  useEffect(() => {
    // Create context on-demand when needed (to address autoplay policy)
    const initContext = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioContext.current;
    };
    
    // Handle user interaction to enable audio
    const enableAudio = () => initContext();
    document.addEventListener('click', enableAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', enableAudio);
      if (audioContext.current) {
        Object.values(oscillators.current).forEach(osc => {
          if (osc.oscillator) osc.oscillator.stop();
        });
        audioContext.current.close();
      }
    };
  }, []);
  
  // Helper to extract audio parameters from an element
  const extractParams = (element) => {
    return {
      frequency: parseFloat(element.Sound_Frequency) || 440,
      audibleFrequency: parseFloat(element.SineWaveVisualizer_frequency_audiblefrequency) || 440,
      enthalpy: parseFloat(element.Enthalpy_) || 0,
      type: parseFloat(element.type_of_waste) || 0
    };
  };
  
  // Extract audio parameters from categorizedData
  const getAudioParams = (elementId) => {
    console.log("Looking for element:", elementId);
    
    if (!categorizedData) {
      console.error("No categorized data available");
      return null;
    }
    
    // Try mapped ID first
    const mappedId = idMappings[elementId] || elementId;
    
    if (categorizedData[mappedId]?.[0]) {
      console.log("Found match with mapped ID:", mappedId);
      return extractParams(categorizedData[mappedId][0]);
    }
    
    // Try direct match first
    if (categorizedData[elementId]?.[0]) {
      return extractParams(categorizedData[elementId][0]);
    }
    
    // Not found, try with normalization (case-insensitive, trim whitespace)
    const normalizedId = elementId.toLowerCase().trim();
    
    // Find matching key with normalization
    const matchingKey = Object.keys(categorizedData).find(key => 
      key.toLowerCase().trim() === normalizedId
    );
    
    if (matchingKey && categorizedData[matchingKey]?.[0]) {
      console.log("Found match with normalized ID:", matchingKey);
      return extractParams(categorizedData[matchingKey][0]);
    }
    
    console.error("Element not found in data, even with normalization");
    return null;
  };
  
  // Play sound for a specific element
  const playElementSound = (elementId) => {
    console.log("Attempting to play sound for:", elementId);

    if (!audioContext.current) {
      try {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        console.log("Created audio context:", audioContext.current.state);
      } catch (e) {
        console.error("Failed to create audio context:", e);
        return;
      }
    }

    // Check context state
    if (audioContext.current.state === 'suspended') {
      console.log("Audio context suspended, attempting to resume");
      audioContext.current.resume().then(() => {
        console.log("Audio context resumed successfully");
        // Try playing again
        setTimeout(() => playElementSound(elementId), 100);
      }).catch(err => {
        console.error("Failed to resume audio context:", err);
      });
      return;
    }
    
    // Stop any existing sounds
    stopAllSounds();
    
    const params = getAudioParams(elementId);
    if (!params) {
      console.log("No data found for element, using default sound");
      
      // More varied default sounds based on pollutant type
      let frequency = 440; // Default A4
      let oscillatorType = 'sine';
      
      // Categorize by pollutant type for better defaults
      if (/acid|chlor|diclofenac|phthalate|bht/i.test(elementId)) {
        // Chemicals - higher pitch, sine wave
        frequency = 523; // C5
        oscillatorType = 'sine';
      } else if (/metal|zinc|lead|nickel|aluminum|mercury|cadmium/i.test(elementId)) {
        // Metals - metallic sound, triangle wave
        frequency = 330; // E4
        oscillatorType = 'triangle';
      } else if (/pesticide|cide|atrazine|imidacloprid|glyphosate/i.test(elementId)) {
        // Pesticides - distinctive sound
        frequency = 392; // G4
        oscillatorType = 'sawtooth';
      } else if (/oil|diesel|petrol|gas|benzene/i.test(elementId)) {
        // Fossil fuels - low rumble
        frequency = 196; // G3
        oscillatorType = 'sawtooth';
      }
      
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      
      oscillator.type = oscillatorType;
      oscillator.frequency.value = frequency;
      
      // More complex envelope for better sound
      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.current.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 1.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      
      oscillator.start();
      oscillators.current[elementId] = { oscillator, gainNode };
      
      console.log(`Playing categorized default sound for ${elementId} at ${frequency}Hz using ${oscillatorType} wave`);
      
      // Auto-stop after 1.5 seconds
      setTimeout(() => {
        if (oscillators.current[elementId]) {
          try {
            oscillators.current[elementId].oscillator.stop();
            oscillators.current[elementId].gainNode.disconnect();
          } catch (e) {
             console.log('Error stopping default oscillator:', e);
          }
          delete oscillators.current[elementId];
        }
      }, 1500);
      
      return;
    }
    
    // Continue with existing code for when params exist
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    // Set oscillator type based on enthalpy
    oscillator.type = params.enthalpy > 0 ? 'sine' : 'triangle';
    oscillator.frequency.value = params.audibleFrequency;
    
    // Create envelope
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.current.currentTime + 0.05);
    
    // Different decay for different pollutant types
    const decayTime = params.type === 1 ? 1.5 : params.type === 2 ? 2.0 : 1.0;
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + decayTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.start();
    oscillators.current[elementId] = { oscillator, gainNode };
    
    // Auto-stop after decay
    setTimeout(() => {
      stopElementSound(elementId);
    }, decayTime * 1000 + 100);
  };
  
  // Stop specific sound
  const stopElementSound = (elementId) => {
    if (oscillators.current[elementId]) {
      try {
        oscillators.current[elementId].oscillator.stop();
        oscillators.current[elementId].gainNode.disconnect();
      } catch (e) {
        console.log('Error stopping oscillator:', e);
      }
      delete oscillators.current[elementId];
    }
  };
  
  // Stop all sounds
  const stopAllSounds = () => {
    Object.keys(oscillators.current).forEach(stopElementSound);
  };
  
  return {
    playElementSound,
    stopElementSound,
    stopAllSounds
  };
}