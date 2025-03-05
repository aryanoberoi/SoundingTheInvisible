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
import { AboutPlant } from './PollutantPage/AboutPlant';
import { CommonNames } from './PollutantPage/CommonNames';
import { PlantHabitat } from './PollutantPage/PlantHabitat';
import { Origin } from './PollutantPage/Origin';
import { UsesOfPlant } from './PollutantPage/UsesOfPlant';
import { PhytoCapacity } from './PollutantPage/PhytoCapacity';

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
      
      // Toggle visibility based on dominant panel
      document.body.classList.toggle('white-panel-active', newPosition <= 50);
      document.body.classList.toggle('black-panel-active', newPosition > 50);

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
    }, { 
      threshold: 0.3,
      root: null
    });

    // Observe all sections in both panels
    const sections = document.querySelectorAll(`
      [id^="about-"],
      [id^="plant-"],
      [id^="sound-"],
      [id^="common-"],
      [id^="effect-"],
      [id^="case-"],
      [id^="phytoremediation"],
      [id^="phyto-"],
      [id^="uses-"],
      [id^="origin"],
      [id^="references"]
    `);
    
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Determine which panel to activate
    const isWhitePanel = section.closest('.white-container');
    const sliderPos = isWhitePanel ? 0 : 100;
    
    // Update slider position and panel visibility
    setSliderPosition(sliderPos);
    document.documentElement.style.setProperty('--slider-position', `${sliderPos}%`);
    document.body.classList.toggle('white-panel-active', isWhitePanel);
    document.body.classList.toggle('black-panel-active', !isWhitePanel);

    // Scroll after panel transition
    setTimeout(() => {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

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
          <div className="text-wrapper" onClick={() => handleNavClick('about-pollutant')}>Pollutant name</div>
          <div className="div" onClick={() => handleNavClick('plant-name')}>Plant name</div>
          <div className="text-wrapper-2" onClick={() => handleNavClick('sound-frequency')}>Sound frequency</div>
          <div className="text-wrapper-3" onClick={() => handleNavClick('common-names')}>Common names of Plant</div>
          <div className="text-wrapper-4" onClick={() => handleNavClick('plant-habitat')}>Plant Habitat</div>
          <div className="text-wrapper-5" onClick={() => handleNavClick('origin')}>Origin and Geographical Distribution</div>
          <p className="p" onClick={() => handleNavClick('phyto-capacity')}>Phytoremediation capacity of the Plants</p>
          <div className="text-wrapper-6" onClick={() => handleNavClick('uses-of-plant')}>Uses of plant</div>
          <div className="text-wrapper-7" onClick={() => handleNavClick('references')}>References</div>
          <div className="text-wrapper-8" onClick={() => handleNavClick('effect-on-health')}>Effect on health</div>
          <div className="text-wrapper-9" onClick={() => handleNavClick('case-study')}>Case study</div>
          <p className="text-wrapper-10" onClick={() => handleNavClick('phytoremediation')}>
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
          <div className="white-container">
            <div className="bottom-section5" id="plant-name">
              <div className="content-container">
                <AboutPlant/>
              </div>
            </div>
            <div className="bottom-section6" id="common-names">
              <CommonNames/>
            </div>
            <div className="bottom-section7" id="plant-habitat">
              <PlantHabitat/>
            </div>
            <div className="bottom-section8" id="origin">
              <Origin/>
            </div>
            <div className="bottom-section9" id="phyto-capacity">
              <PhytoCapacity/>
            </div>
            <div className="bottom-section10" id="uses-of-plant">
              <UsesOfPlant/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollutantPage;