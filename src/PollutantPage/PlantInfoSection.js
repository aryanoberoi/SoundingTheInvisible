import React from 'react';
import styles from './PlantDetails.css';
import { KnowMoreButton } from './Knowmorebutton';

export const PlantInfoSection = ({ title, description, showKnowMore = true }) => {
  return (
    <div className={styles.infoSection} style={{ marginBottom: !showKnowMore ? '40px' : '0' }}>
      <div className={styles.infoContent}>
        <h2 className="sectionTitle">{title}</h2>
        <p className="plantDetails">{description}</p>
      </div>
      {showKnowMore && <KnowMoreButton className="knowMoreButton" />}
    </div>
  );
};