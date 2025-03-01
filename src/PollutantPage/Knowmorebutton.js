import React from 'react';
import styles from './pollutantcard.module.css';

export const KnowMoreButton = ({ className }) => (
  <button className={`${styles.knowMoreButton} ${className}`} tabIndex="0">
    know more
  </button>
);