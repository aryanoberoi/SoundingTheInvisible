import React, { useState, useEffect } from 'react';
import './pollutantPage.css';
import styles from './pollutantcard.module.css'
import plantStyles from './PlantDetails.module.css';
import { KnowMoreButton } from './Knowmorebutton';
import { PlantInfoSection } from './PlantInfoSection';
import SineWaveVisualizer from './sinwave';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(0);

  const plantData = [
    {
      title: "Wetland status:",
      description: "FACU or OBL etc and explain what it is"
    },
    {
      title: "Common names of Plant:",
      description: "Lorem ipsum dolor sit amet, \n consectetur adipiscing eli. \n Duis accumsan lacus sit amet sagittis feugiat. \n Morbi et velit fringilla, maximus quam et, \n cursus odio. \n Donec quis sem gravida nisi malesuada fringilla. \n Duis ac erat vitae magna rutrum suscipit."
    },
    {
      title: "Plant Habitat:",
      description: "Temperature,  \nhumidity, \nsoil type, \nwhat kind of areas it"
    }
  ];

  const handleSliderMove = (e) => {
    const container = document.getElementById('slider-container');
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
  
    if (newPosition >= 0 && newPosition <= 100) {
      document.documentElement.style.setProperty('--slider-position', `${newPosition}%`);
      setSliderPosition(newPosition);

      // For navbar
      document.body.classList.toggle('right-panel-active', newPosition < 3);
      
      // Custom condition for sound button
      document.body.classList.toggle('sound-panel-active', newPosition < 98);

      // Calculate rotation based on slider position
      const newRotation = (newPosition <= 50)
        ? (newPosition / 50) * 180 // Rotate left 180 degrees
        : ((newPosition - 50) / 50) * 180; // Rotate right 180 degrees

      setRotation(newRotation);
      document.documentElement.style.setProperty('--rotation', `${newRotation}deg`);
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
    <>
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
                  <div style={{ border: '1px solid black'}}>
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
        <div className="right-panel">
          <div className={plantStyles.plantContainer}>
            <div className={plantStyles.contentWrapper}>
              <aside className={plantStyles.sidebar}>
                {plantData.map((section, index) => {
                  if (index === plantData.length - 1) {
                    return (
                      <div key={index}>
                        <div className={plantStyles.sectionTitle}>{section.title}</div>
                        <div className={plantStyles.titleList}>
                          {section.description.split('\n').map((line, lineIndex) => (
                            <div key={lineIndex} className={plantStyles.titleEntry}>
                              <div className={plantStyles.bulletcircle} />
                              <span className={plantStyles.titleText}>{line}</span>
                            </div>
                          ))}
                        </div>
                        <KnowMoreButton className={plantStyles.knowMoreButton} />
                      </div>
                    );
                  }
                  return (
                    <PlantInfoSection
                      key={index}
                      title={section.title}
                      description={section.description}
                    />
                  );
                })}
              </aside>
              
              <main className={plantStyles.mainContent}>
                <div className={plantStyles.imageSection}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/16352f3f964c03ec54c661ca0da371220832b2c2f872538ebde3aa40d6a7628c?placeholderIfAbsent=true&apiKey=e7c66450d645437e80b3c1918bb89cd7"
                    alt="Detailed view of the plant"
                    className={plantStyles.plantImage}
                  />
                  <div className={plantStyles.plantDescription}>
                    <h1 className={plantStyles.plantName}>Plant name</h1>
                    <p className={plantStyles.plantDetails}>
                      Describe the plant from top to down so one can visualize it. 
                      Don't jump from different parts of the plant. Please use simple 
                      language so that the reader can visualize the plant. 
                      Reproduction of the plant needs to be explained.
                    </p>
                    <KnowMoreButton className={plantStyles.knowMoreButton} />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
        <div
          className="slider-bar"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="slider-circle"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="slider-half left-half">
              <span className="arrow left-arrow">&#9664;</span>
            </div>
            <div className="slider-half right-half">
              <span className="arrow right-arrow">&#9654;</span>
            </div>
          </div>
        </div>
        <div className="scrollable-black">
          <div className={styles.scrollableContent}>
            <p>Additional scrollable content goes here...</p>
            <p>More information can be added here...</p>
            <p>Keep scrolling for more details...</p>
          </div>
        </div>
        <div className="additional-scroll-section">
          <div className={styles.additionalContent}>
            <h2>Explore More Information</h2>
            <p>Here you can add more detailed information about the topic.</p>
            <p>Include any additional resources or links for further reading.</p>
            <p>Continue scrolling to discover more insights and data.</p>
          </div>
        </div>
      </div>

      <div className="bottom-section1">
        <div className="main-container">
          <div className="flex-row-f">
            <img 
              src="/ap.png" 
              alt="Pollutant" 
              className="image"
            />
            <div className="about-pollutant">
              <span className="about">About </span>
              <span className="pollutant">Pollutant </span>
            </div>
          </div>
          <div className="flex-row-a">
            <img 
              src="l1.png" 
              alt="Vector graphic" 
              className="vector-image"
              style={{ 
                width: '100%',
                height: 'auto',
                objectFit: 'cover' 
              }}
            />
          </div>

          <span className="lorem-ipsum-dolor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
            imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu
            neque. Etiam rhoncus erat non quam vehicula, sed maximus magna
            tincidunt. Sed condimentum sollicitudin nibh, nec mattis quam. Ut eu
            volutpat nisi, quis varius risus. Integer rutrum eros ac turpis euismod,
            in tincidunt risus dapibus. Etiam eget turpis massa. Fusce rutrum sit
            amet magna sit amet aliquam. Donec sit amet cursus erat, sit amet
            sagittis nunc. Nullam mattis risus nisi, non interdum elit congue in.
            Donec vitae ligula elit. Morbi nec luctus elit, eu feugiat turpis. Sed
            porttitor luctus ornare. Suspendisse condimentum fermentum convallis.
          </span>
          <img 
            src="g3.png" 
            alt="graphic element"
            className="group-3"
          />
        </div>
        <div className="nav-bar" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '20px 0'
        }}>
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
          </div>
        </div>
      </div>

      {/* <div className="bottom-section2">
        <div className="content-container">
          <h2>Next Page Content</h2>
        </div>
        <div className="wave-container">
          <SineWaveVisualizer />
        </div>
      </div> */}
    </>
  );
};

export default PollutantPage;