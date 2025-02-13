import React, { useState } from 'react';
import './pollutantPage.css';
import styles from './pollutantcard.module.css';
import { KnowMoreButton } from './Knowmorebutton';
import { PlantInfoSection } from './PlantInfoSection';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(0);

  const plantData = [
    { title: "Wetland status:", description: "FACU or OBL etc and explain what it is" },
    { title: "Common names of Plant:", description: "Lorem ipsum dolor sit amet..." },
    { title: "Plant Habitat:", description: "Temperature, humidity, soil type, etc." }
  ];

  const handleSliderMove = (e) => {
    const container = document.getElementById('slider-container');
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      document.documentElement.style.setProperty('--slider-position', `${newPosition}%`);
      setSliderPosition(newPosition);
    }
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleSliderMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleSliderMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="scroll-container">
      
      {/* Top Section - Existing Content */}
      <div className="top-section">
        <div id="slider-container" className="slider-container">
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
                      Pollutant Description:
                      <br />
                      Physical description, history, half-life, etc.
                    </div>
                    <KnowMoreButton />
                    <div className={styles.imageContainer}>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c05deecce1d9a93f6c5f23b1d4ff068c93611042f2fc0f83338c3006ad141976"
                        className={styles.pollutantImage}
                        alt="Pollutant visualization"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.sideContent}>
                  <div className={styles.sideContentWrapper}>
                    <div className={styles.sectionTitle}>Effects on human health:</div>
                    <div className={styles.titleList}>
                      Title here <br />
                      Title here <br />
                      Title here
                    </div>
                    <KnowMoreButton />
                    <div className={styles.sectionTitle}>
                      Enthalpy and Sound Frequency of Pollutant
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c0d0a89470ab1d23b75aa92fbc9fde2020654ff4e78817c48b8da0bb5b8083"
                      className={styles.frequencyImage}
                      alt="Frequency visualization"
                    />
                    <KnowMoreButton />
                  </div>
                  <div className={styles.sourcesTitle}>Sources In Venice Lagoon:</div>
                  <div className={styles.sourcesDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                  </div>
                  <KnowMoreButton />
                </div>
              </div>
            </div>
<<<<<<< HEAD
          </div>
          <div className="right-panel">
            <div className={styles.plantContainer}>
              <div className={styles.contentWrapper}>
                <aside className={styles.sidebar}>
                  {plantData.map((section, index) => (
                    <PlantInfoSection key={index} title={section.title} description={section.description} />
                  ))}
                </aside>
                <main className={styles.mainContent}>
                  <div className={styles.imageSection}>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/16352f3f964c03ec54c661ca0da371220832b2c2f872538ebde3aa40d6a7628c"
                      alt="Detailed view of the plant"
                      className={styles.plantImage}
                    />
                    <div className={styles.plantDescription}>
                      <h1 className={styles.plantName}>Plant name</h1>
                      <p className={styles.plantDetails}>
                        Describe the plant from top to bottom for visualization.
                      </p>
                    </div>
                  </div>
                  <KnowMoreButton />
                </main>
              </div>
            </div>
          </div>
          <div
            className="slider-bar"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="slider-circle" style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="slider-half left-half">
                <span className="arrow left-arrow">&#9664;</span>
              </div>
              <div className="slider-half right-half">
                <span className="arrow right-arrow">&#9654;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Black Background */}
      <div className="bottom-section1">
      <div className="nav-bar">
      <div className="text-wrapper">Pollutant name</div>

      <div className="div">Plant name</div>

      <div className="text-wrapper-2">Sound frequency</div>

      <div className="text-wrapper-3">Common names of Plant</div>

      <div className="text-wrapper-4">Plant Habitat</div>

      <div className="text-wrapper-5">Origin and Geographical Distribution</div>

      <p className="p">Phytoremediation capacity of the Plants</p>

      <div className="text-wrapper-6">Uses of plant</div>

      <div className="text-wrapper-7">References</div>

      <div className="text-wrapper-8">Effect on health</div>

      <div className="text-wrapper-9">Case study</div>

      <p className="text-wrapper-10">
        Phytoremediation of the Representative Pollutant
      </p>

      <div className="overlap-group">
        {/* <img className="line" alt="Line" src={line1} /> */}

        <div className="ellipse" />

        <div className="ellipse-2" />

        <div className="ellipse-3" />

        <div className="ellipse-4" />

        <div className="ellipse-5" />

        <div className="ellipse-6" />

        <div className="ellipse-7" />

        <div className="ellipse-8" />

        <div className="ellipse-9" />

        <div className="ellipse-10" />

        <div className="ellipse-11" />

        <div className="ellipse-12" />
=======
            <div className={styles.description}>
              <div className={styles.descriptionTitle}>Pollutant Description:</div>
              <div className={styles.descriptionLine}> Physical characteristics and properties</div>
              <div className={styles.descriptionLine}> Historical context and usage timeline</div>
              <div className={styles.descriptionLine}> Chemical half-life decomposition</div>
            </div>
            <KnowMoreButton className={`${styles.knowMoreButtonLeft} ${styles.descriptionKnowMore}`} />
            <div className={styles.imageContainer}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c05deecce1d9a93f6c5f23b1d4ff068c93611042f2fc0f83338c3006ad141976?placeholderIfAbsent=true&apiKey=e7c66450d645437e80b3c1918bb89cd7"
                className={styles.pollutantImage}
                alt="Pollutant visualization"
              />
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
            <div className={styles.sectionTitle}>
              Enthalpy and sound <br /> Frequency of Pollutant
              <br />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c0d0a89470ab1d23b75aa92fbc9fde2020654ff4e78817c48b8da0bb5b8083?placeholderIfAbsent=true&apiKey=e7c66450d645437e80b3c1918bb89cd7"
              className={styles.frequencyImage}
              alt="Frequency visualization"
            />
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
>>>>>>> a59c93aa276ced5c7ca3e8692ab8e432b48032b2
      </div>
    </div>
      </div>
      
    </div>

    
    
  );
};

export default PollutantPage;
