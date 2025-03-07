import React from 'react';
import styles from './PlantDetails.css';
import { KnowMoreButton } from './Knowmorebutton';

export const PlantInfoSection = ({ title, description }) => {
  return (
    <div className={styles.infoSection}>
      <div className={styles.infoContent}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
      <KnowMoreButton className="knowMoreButton" />
    </div>
  );
};