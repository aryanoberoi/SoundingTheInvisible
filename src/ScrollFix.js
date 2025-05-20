// ScrollFix.js - A component to add to both App.js and SVGComponent

import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function forceScrollToTop() {
  console.log('[ScrollFix] Force scroll to top called');
  
  // Try to identify all possible scroll containers
  const containers = [
    window,
    document.documentElement,
    document.body,
    document.getElementById('root'),
    document.querySelector('main'),
    ...Array.from(document.querySelectorAll('.homepage-content, .homepage, #app'))
  ].filter(Boolean);
  
  // Force scroll on all possible containers
  containers.forEach(container => {
    try {
      if (container.scrollTo) {
        container.scrollTo(0, 0);
      } else if (container.scrollTop !== undefined) {
        container.scrollTop = 0;
      }
    } catch (e) {
      console.error('[ScrollFix] Error scrolling container:', e);
    }
  });
  
  // Log current scroll positions for debugging
  console.log('[ScrollFix] Current scroll positions:',
    'window:', window.pageYOffset,
    'documentElement:', document.documentElement.scrollTop,
    'body:', document.body.scrollTop
  );
}

// Enhanced ScrollToTop component with debugging
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const attemptCount = useRef(0);
  
  useEffect(() => {
    console.log('[ScrollFix] Path changed to:', pathname);
    attemptCount.current = 0;
    
    // Reset any CSS that might be preventing scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    // Check for any fixed position elements that might be taking up the whole viewport
    const fixedElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
    console.log('[ScrollFix] Fixed position elements:', fixedElements.length);
    
    // Function to make repeated scroll attempts
    const attemptScroll = () => {
      attemptCount.current++;
      console.log(`[ScrollFix] Scroll attempt ${attemptCount.current}`);
      
      forceScrollToTop();
      
      // Continue attempts if we're still not at the top
      if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
        if (attemptCount.current < 10) { // Limit to 10 attempts
          setTimeout(attemptScroll, 100 * attemptCount.current); // Increasing delay
        }
      }
    };
    
    // Start with immediate attempt
    attemptScroll();
    
    // Use various timers to catch different moments in the rendering cycle
    const timers = [
      setTimeout(attemptScroll, 0),
      setTimeout(attemptScroll, 50),
      setTimeout(attemptScroll, 100),
      setTimeout(attemptScroll, 300),
      setTimeout(attemptScroll, 500)
    ];
    
    // Also attempt on next animation frame
    requestAnimationFrame(attemptScroll);
    
    return () => timers.forEach(clearTimeout);
  }, [pathname]);
  
  return null;
};

// SVGComponent Click Handler - Modified version
export const createScrollSafeClickHandler = (navigate) => {
  return (id) => (e) => {
    e.stopPropagation();
    console.log('[ScrollFix] Element clicked:', id);
    
    // Prevent default to ensure we control everything
    e.preventDefault();
    
    // Store current scroll position to detect if scroll gets reset
    const startScrollY = window.pageYOffset;
    console.log('[ScrollFix] Starting scroll position:', startScrollY);
    
    // Force scroll to top BEFORE navigation
    forceScrollToTop();
    
    // Add a class to body to prevent scroll during transition
    document.body.classList.add('transitioning-page');
    document.body.style.overflow = 'hidden';
    
    // Navigate after a short delay to ensure scroll happens first
    setTimeout(() => {
      console.log('[ScrollFix] Navigating to:', id);
      navigate(`/${id}`);
      
      // Remove the transitioning class after navigation
      setTimeout(() => {
        document.body.classList.remove('transitioning-page');
        document.body.style.overflow = '';
        forceScrollToTop(); // Try once more after navigation
      }, 100);
    }, 50);
  };
};

// DOM Inspection utility - run this in componentDidMount or useEffect
// to identify problematic elements
export function inspectScrollableElements() {
  console.log('[ScrollFix] Inspecting DOM for scrollable elements');
  
  // Find all potentially scrollable elements
  const elements = document.querySelectorAll('*');
  const scrollableElements = Array.from(elements).filter(el => {
    const style = window.getComputedStyle(el);
    return (
      style.overflow === 'scroll' || 
      style.overflowY === 'scroll' ||
      style.overflowX === 'scroll' ||
      style.overflow === 'auto' || 
      style.overflowY === 'auto' ||
      style.overflowX === 'auto'
    );
  });
  
  console.log('[ScrollFix] Potentially scrollable elements:', scrollableElements);
  
  // Check for fixed/sticky positioned elements
  const fixedElements = Array.from(elements).filter(el => {
    const style = window.getComputedStyle(el);
    return (
      style.position === 'fixed' || 
      style.position === 'sticky'
    );
  });
  
  console.log('[ScrollFix] Fixed/sticky positioned elements:', fixedElements);
  
  return { scrollableElements, fixedElements };
}

// Add this CSS to your App.css or create a new file
export const scrollFixCSS = `
/* Ensure the main containers can scroll properly */
html, body {
  scroll-behavior: auto !important;
  overflow-x: hidden;
}

/* Prevent scroll during page transitions */
body.transitioning-page {
  overflow: hidden !important;
}

/* Ensure the app container takes full height */
#root, .app, main {
  min-height: 100vh;
  width: 100%;
}
`;