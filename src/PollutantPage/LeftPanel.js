import React from 'react';
import styles from './pollutantcard.module.css';
import { KnowMoreButton } from './Knowmorebutton';
import SineWaveVisualizer from './sinwave';

const LeftPanel = ({
  pollutantName ="Pollutant Name",
  descriptionLines = [],
  healthEffectsTitles = [],
  sourcesDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing eli. Duis accumsan lacus sit amet sagittis feugiat. Morbi et velit fringilla, maximus quam et.",
}) => {
  return (
    <div className="left-panel">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.pollutantInfo}>
              <div className={styles.headerWrapper}>
                <div className={styles.circle} />
                <div className={styles.pollutantName}>{pollutantName}</div>
              </div>
              <div className={styles.description}>
              {descriptionLines.map((line, index) => (
                  <div key={index} className={styles.descriptionLine}>{line}</div>
                ))}
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
              {healthEffectsTitles.map((title, index) => (
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
            {sourcesDescription.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            <KnowMoreButton className={styles.knowMoreButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;