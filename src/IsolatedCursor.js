// Create this as a new file: IsolatedCursor.js
import React, { useEffect } from 'react';

const IsolatedCursor = () => {
  useEffect(() => {
    // Create cursor elements dynamically to avoid React rendering issues
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'isolated-cursor-container';

    const cursor = document.createElement('div');
    cursor.className = 'isolated-cursor';

    const cursorDot = document.createElement('div');
    cursorDot.className = 'isolated-cursor-dot';

    cursor.appendChild(cursorDot);
    cursorContainer.appendChild(cursor);
    document.body.appendChild(cursorContainer);

    // Variables for cursor movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isAnimating = false;

    function updateCursorPosition() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.2;
      cursorY += dy * 0.2;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        requestAnimationFrame(updateCursorPosition);
      } else {
        isAnimating = false;
      }
    }

    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Enhanced color detection logic -> Replaced with new logic below
      // updateCursorColor(e.clientX, e.clientY);
      detectColorAndUpdateCursor(e.clientX, e.clientY); // Use the new function

      // Start animation if not already running
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(updateCursorPosition);
      }
    }

    // START: New functions for color detection
    function detectColorAndUpdateCursor(x, y) {
      // Get element under cursor
      const element = document.elementFromPoint(x, y);
      if (!element) return;

      // Default to panel-based behavior as a fallback
      let isDarkBackground = !document.body.classList.contains('white-panel-active');

      // SPECIAL CASE: First check for slider container - has priority
      const sliderContainer = document.querySelector('.slider-container');
      if (sliderContainer && elementContainsPoint(sliderContainer, x, y)) {
        // Get slider position from CSS variable
        const sliderPosRaw = getComputedStyle(document.documentElement)
                             .getPropertyValue('--slider-position') || '50%';
        // Ensure we remove '%' and handle potential unit issues gracefully
        const sliderPos = parseFloat(sliderPosRaw.replace('%', ''));

        // If sliderPos is a valid number
        if (!isNaN(sliderPos)) {
            // If less than 50%, we're in the right panel (white)
            if (sliderPos < 50 && x > window.innerWidth * (sliderPos/100)) {
              isDarkBackground = false; // Right side is white, use black cursor
            }
            // If 50% or more, we're in the left panel (black)
            else if (sliderPos >= 50 && x < window.innerWidth * (sliderPos/100)) {
              isDarkBackground = true; // Left side is black, use white cursor
            }
             // Else: We are in the slider region but the logic above didn't catch it
             // This might happen if the cursor is exactly on the dividing line or
             // if there's an edge case. Fall back to background color check.
             else {
                const backgroundColor = getEffectiveBackgroundColor(element);
                if (backgroundColor) {
                  isDarkBackground = isColorDark(backgroundColor);
                }
             }
        } else {
          // Fallback if sliderPos couldn't be parsed
          const backgroundColor = getEffectiveBackgroundColor(element);
          if (backgroundColor) {
            isDarkBackground = isColorDark(backgroundColor);
          }
        }
      }
      // If not in slider or specific checks failed, use background color detection
      else {
        // Try to get actual background color
        const backgroundColor = getEffectiveBackgroundColor(element);
        if (backgroundColor) {
          // Parse the color and determine if it's dark or light
          isDarkBackground = isColorDark(backgroundColor);
        }
        // If no background color found by traversing, stick with the initial panel-based default
      }

      // Apply the appropriate class based on background darkness
      cursor.classList.toggle('inverted', isDarkBackground);
    }

    // Helper function to check if an element contains a point
    function elementContainsPoint(element, x, y) {
      const rect = element.getBoundingClientRect();
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    }

    // Function to get effective background color, traversing up the DOM if needed
    function getEffectiveBackgroundColor(element) {
      let current = element;
      const maxDepth = 10; // Prevent infinite loops
      let depth = 0;

      while (current && depth < maxDepth) {
        // Get computed style
        const style = window.getComputedStyle(current);
        const backgroundColor = style.backgroundColor;

        // If this element has a background color that's not transparent
        if (backgroundColor &&
            backgroundColor !== 'transparent' &&
            backgroundColor !== 'rgba(0, 0, 0, 0)') {
          return backgroundColor;
        }

        // Explicit panel checks as a fallback (might be redundant but safe)
        if (current.classList.contains('left-panel')) {
          return 'rgb(0, 0, 0)'; // Black
        }
        if (current.classList.contains('right-panel')) {
          return 'rgb(255, 255, 255)'; // White
        }

        // Move to parent
        current = current.parentElement;
        depth++;
      }

      // If we couldn't find a background color, return based on body class as final fallback
      return document.body.classList.contains('white-panel-active')
        ? 'rgb(255, 255, 255)' // White
        : 'rgb(0, 0, 0)'; // Black
    }

    // Function to determine if a color is dark based on its luminance
    function isColorDark(color) {
      // Handle named colors by temporarily applying them
      if (!color.startsWith('rgb') && !color.startsWith('#')) {
           const tempDiv = document.createElement('div');
           tempDiv.style.color = color;
           document.body.appendChild(tempDiv); // Needs to be in DOM for getComputedStyle
           const computedColor = window.getComputedStyle(tempDiv).color;
           document.body.removeChild(tempDiv);
           color = computedColor; // Now it should be rgb or similar
      }

      // Extract RGB components
      const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
      if (!rgbMatch) {
        // Try hex - basic support for #RGB and #RRGGBB
         if (color.startsWith('#')) {
            let hex = color.substring(1);
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
            if (hex.length === 6) {
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                // Recalculate luminance for hex
                 const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                 return luminance < 0.5;
            }
         }
        // If still can't parse, assume dark as a safe default
        return true;
      }

      const [, r, g, b] = rgbMatch.map(Number);

      // Calculate relative luminance
      // Formula: 0.299R + 0.587G + 0.114B
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // If luminance is less than 0.5, color is dark
      return luminance < 0.5;
    }
    // END: New functions for color detection

    function handleMouseDown() {
      cursor.classList.add('clicking');
    }

    function handleMouseUp() {
      cursor.classList.remove('clicking');
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Force initial position
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
    cursorX = mouseX;
    cursorY = mouseY;
    updateCursorPosition();

    // Clean up on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (cursorContainer.parentNode) {
        document.body.removeChild(cursorContainer);
      }
    };
  }, []);

  // This component doesn't render anything - all DOM manipulation is done via useEffect
  return null;
};

export default IsolatedCursor; 