import React from 'react';
import styles from './pollutantcard.css';

export const KnowMoreButton = ({ className }) => (
  <button className={`${styles.knowMoreButton} ${className}`} tabIndex="0">
    know more
  </button>
);

export const KnowMoreButtonInverted = ({ className }) => (
  <button className={`${styles.knowMoreButtonInverted} ${className}`} tabIndex="0">
    know more
  </button>
);

export const KnowMoreButtonInvertedRA = ({ className }) => (
  <button className={`${styles.knowMoreButtonInverted} ${className}`} tabIndex="0">
    know more
  </button>
);