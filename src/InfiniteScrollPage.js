import React, { useState, useEffect } from 'react';
import './pollutantPage.css';
import leftStyles from './pollutantcard.module.css';
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
    <div id="slider-container" className="slider-container">
      <div className="left-panel">
        <div className={leftStyles.container}>
          <div className={leftStyles.contentWrapper}>
            <div className={leftStyles.mainContent}>
              <div className={leftStyles.pollutantInfo}>
                <div className={leftStyles.headerWrapper}>
                  <div className={leftStyles.circle} />
                  <div className={leftStyles.pollutantName}>Pollutant name</div>
                </div>
                <div className={leftStyles.description}>
                  <div className={leftStyles.descriptionTitle}>Pollutant Description:</div>
                  <div className={leftStyles.descriptionLine}> Physical characteristics and properties</div>
                  <div className={leftStyles.descriptionLine}> Historical context and usage timeline</div>
                  <div className={leftStyles.descriptionLine}> Chemical half-life decomposition</div>
                </div>
                <KnowMoreButton className={`${leftStyles.knowMoreButtonLeft} ${leftStyles.descriptionKnowMore}`} />
                <div className={leftStyles.imageContainer}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c05deecce1d9a93f6c5f23b1d4ff068c93611042f2fc0f83338c3006ad141976?placeholderIfAbsent=true&apiKey=e7c66450d645437e80b3c1918bb89cd7"
                    className={leftStyles.pollutantImage}
                    alt="Pollutant visualization"
                  />
                </div>
              </div>
            </div>
            <div className={leftStyles.sideContent}>
              <div className={leftStyles.sideContentWrapper}>
                <div className={leftStyles.sectionTitle}>Effects on human health:</div>
                <div className={leftStyles.titleList}>
                  {['Title here', 'Title here', 'Title here', 'Title here'].map((title, index) => (
                    <div key={index} className={leftStyles.titleEntry}>
                      <span className={leftStyles.titleText}>{title}</span>
                      <div className={leftStyles.bulletcircle} />
                    </div>
                  ))}
                </div>
                <KnowMoreButton />
                <div className={leftStyles.sectionTitle} style={{paddingBottom: '10px'}}>
                  Enthalpy and sound <br /> Frequency of Pollutant
                  <br />
                </div>
                <div style={{ border: '1px solid black'}}>
                  <SineWaveVisualizer />
                </div>
                <KnowMoreButton className={leftStyles.knowMoreButton} />
              </div>
              <div className={leftStyles.sourcesTitle}>Sources In Venice Lagoon:</div>
              <div className={leftStyles.sourcesDescription}>
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
              <KnowMoreButton className={leftStyles.knowMoreButton} />
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
        <div className={leftStyles.scrollableContent}>
          <p>Additional scrollable content goes here...</p>
          <p>More information can be added here...</p>
          <p>Keep scrolling for more details...</p>
        </div>
      </div>
      <div className="additional-scroll-section">
        <div className={leftStyles.additionalContent}>
          <h2>Explore More Information</h2>
          <p>Here you can add more detailed information about the topic.</p>
          <p>Include any additional resources or links for further reading.</p>
          <p>Continue scrolling to discover more insights and data.</p>
        </div>
      </div>
    </div>
  );
};

export default PollutantPage;
