import React, { useState, useEffect } from 'react';
import './pollutantPage.css';
import styles from './PollutantPage/pollutantcard.module.css'
import SineWaveVisualizer from './PollutantPage/sinwave';
import { Box } from './PollutantPage/Body';
import { CaseStudies } from './PollutantPage/CaseStudies';
import { Phyto } from './PollutantPage/Phyto';
import PeepholeEffect from './PollutantPage/PeepHoleImage';
import LeftPanel from './PollutantPage/LeftPanel';
import RightPanel from './PollutantPage/RightPanel';
import { PlantHabitat } from './PollutantPage/PlantHabitat';
import { AboutPlant } from './PollutantPage/AboutPlant';
import { CommonNames } from './PollutantPage/CommonNames';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
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
      const newRotation = (newPosition / 100) * 360;

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.bottom-section1, .bottom-section2, .bottom-section3, .bottom-section4, .bottom-section5, .bottom-section6').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="slider-container" className="slider-container">
<LeftPanel />
<RightPanel />
        <div
          className="slider-bar"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <img
            src="slider.png"
            alt="Slider"
            className="slider-image"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
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
      <div className="combined-section">
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
            <div className={`ellipse ${activeSection === 'about-pollutant' ? 'active' : ''}`} />
            <div className={`ellipse-2 ${activeSection === 'sound-frequency' ? 'active' : ''}`} />
            <div className={`ellipse-3 ${activeSection === 'effect-on-health' ? 'active' : ''}`} />
            <div className={`ellipse-4 ${activeSection === 'case-study' ? 'active' : ''}`} />
            <div className={`ellipse-5 ${activeSection === 'phytoremediation' ? 'active' : ''}`} />
            <div className={`ellipse-6 ${activeSection === 'plant-name' ? 'active' : ''}`} />
            <div className={`ellipse-7 ${activeSection === 'common-names' ? 'active' : ''}`} />
            <div className={`ellipse-8 ${activeSection === 'plant-habitat' ? 'active' : ''}`} />
            <div className={`ellipse-9 ${activeSection === 'origin' ? 'active' : ''}`} />
            <div className={`ellipse-10 ${activeSection === 'phyto-capacity' ? 'active' : ''}`} />
            <div className={`ellipse-11 ${activeSection === 'uses-of-plant' ? 'active' : ''}`} />
            <div className={`ellipse-12 ${activeSection === 'references' ? 'active' : ''}`} />
          </div>
        </div>
        
        <div className="content-sections">
          <div className="bottom-section1" id="about-pollutant">
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
          </div>

          <div className="bottom-section2" id="sound-frequency">
            <div className="content-container">
              <h2>Enthalpy and sound Frequency of Pollutant</h2>
            </div>
            <div className="wave-container">
              <SineWaveVisualizer />
            </div>
          </div>

          <div className="bottom-section2" id="effect-on-health">
            <Box></Box>
          </div>
          <div className="bottom-section3" id="case-study">
            <CaseStudies></CaseStudies>
          </div>
          <div className="bottom-section4" id="phytoremediation">
            <Phyto></Phyto>
          </div>
          
          <div className="bottom-section5" id="plant-name">
            <div className="content-container">
              <AboutPlant/>
            </div>
          </div>

          <div className="bottom-section6" id="common-names">
            <CommonNames/>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollutantPage;