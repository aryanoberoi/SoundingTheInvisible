import React from 'react';
import styles from './pollutantcard.module.css';
import { KnowMoreButton } from './Knowmorebutton';
import SineWaveVisualizer from './sinwave';

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.pollutantInfo}>
              <div className={styles.headerWrapper}>
                <div className={styles.circle} />
                <div className={styles.pollutantName}>Pollutant name</div>
              </div>
              <div className={styles.description}>
                <div className={styles.descriptionTitle}>Pollutant Description:</div>
                <div className={styles.descriptionLine}> Physical characteristics and properties</div>
                <div className={styles.descriptionLine}> Historical context and usage timeline</div>
                <div className={styles.descriptionLine}> Chemical half-life decomposition</div>
              </div>
              <KnowMoreButton className={`${styles.knowMoreButtonLeft} ${styles.descriptionKnowMore}`} />
              <div className={styles.imageContainer}>
              </div>
            </div>
          </div>
          <div className={styles.sideContent}>
            <div className={styles.sideContentWrapper}>
              <div className={styles.sectionTitle}>Effects on human health:</div>
              <div className={styles.titleList}>
                {['Title here', 'Title here', 'Title here', 'Title here'].map((title, index) => (
                  <div key={index} className={styles.titleEntry}>
                    <span className={styles.titleText}>{title}</span>
                    <div className={styles.bulletcircle} />
                  </div>
                ))}
              </div>
              <KnowMoreButton />
              <div className={styles.sectionTitle} style={{paddingBottom: '10px'}}>
                Enthalpy and sound <br /> Frequency of Pollutant
                <br />
              </div>
              <div style={{ border: '1px solid black', height: '120px' }}>
                <SineWaveVisualizer />
              </div>
              <KnowMoreButton className={styles.knowMoreButton} />
            </div>
            <div className={styles.sourcesTitle}>Sources In Venice Lagoon:</div>
            <div className={styles.sourcesDescription}>
              Lorem ipsum dolor sit amet, consectetur 
              <br />
              adipiscing eli.
              <br />
              Duis accumsan lacus sit amet sagittis
              <br />
              feugiat.
              <br />
              Morbi et velit fringilla, maximus quam et,
            </div>
            <KnowMoreButton className={styles.knowMoreButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;