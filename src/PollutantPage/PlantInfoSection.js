import React from 'react';
import styles from './PlantDetails.css';
import { KnowMoreButton } from './Knowmorebutton';

export const PlantInfoSection = ({ name, title, description, showKnowMore = true }) => {
  return (
    <div className={styles.infoSection} style={{ marginBottom: !showKnowMore ? '0px' : '0' }}>
      <div className={styles.infoContent}>
        <h1 className="sectionTitle">{name}</h1>
        <h2 className="sectionTitle">{title}</h2>
        <p className="plantDetails">{description}</p>
      </div>
      {showKnowMore && <KnowMoreButton className="knowMoreButton" />}
    </div>
  );
};