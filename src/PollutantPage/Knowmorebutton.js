import React from 'react';
import styles from './pollutantcard.css';

export const KnowMoreButton = ({ className, onClick }) => (
  <button 
    className={`${styles.knowMoreButton} ${className}`} 
    tabIndex="0" 
    onClick={onClick} // Added onClick event
  >
    know more
  </button>
);

export const KnowMoreButtonInverted = ({ className, onClick }) => (
  <button 
    className={`${styles.knowMoreButtonInverted} ${className}`} 
    tabIndex="0" 
    onClick={onClick} // Added onClick event
  >
    know more
  </button>
);

export const KnowMoreButtonInvertedRA = ({ className, onClick }) => (
  <button 
    className={`${styles.knowMoreButtonInverted} ${className}`} 
    tabIndex="0" 
    onClick={onClick} // Added onClick event
  >
    know more
  </button>
);
