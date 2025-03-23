import React, { useState, useEffect } from 'react';
import './pollutantPage.css';
import styles from './PollutantPage/pollutantcard.css'
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
import AboutPollutantSection from './PollutantPage/AboutPollutant';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionphyto = [
    { title: "Title 1", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco." },
    { title: "Title 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est quam, quis dictum ligula fringilla ut. Donec varius nisl ut lobortis dignissim. Integer tincidunt arcu erat, sit amet malesuada purus consequat eu. Nam dapibus a nunc at tincidunt. Etiam commodo, felis nec vulputate rhoncus,." },
    // Add more sections as needed
  ];
  const usessections = [
    {
      id: 'nutritional',
      title: 'NUTRITIONAL',
      header: 'This is placeholder text for title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.'
    },
    {
      id: 'medicine',
      title: 'MEDICINE',
      header: 'This is placeholder text for title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.'
    },
    {
      id: 'additional',
      title: 'ADDITIONAL',
      header: 'This is placeholder text for title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.'
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Mobile-specific behavior
    if(isMobile) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

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
            style={{ 
              transform: `rotate(${rotation}deg) scale(1.7)`,
              transformOrigin: 'center center'
            }}
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
          {isMobile && (
            <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
          )}
          <div className={`nav-items-container ${isMobile ? 'mobile' : ''}`}>
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
          </div>
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
        <AboutPollutantSection />
          <div className="bottom-section2" id="sound-frequency">
            <div className="content-container">
              <div>Enthalpy and sound Frequency of Pollutant</div>
            </div>
            <div className="wave-container">
              <SineWaveVisualizer frequency={4}/>
            </div>
          </div>
          <div className="bottom-section2" id="effect-on-health">
            <Box/>
          </div>
          <div className="bottom-section3" id="case-study">
            <CaseStudies/>
          </div>
          <div className="bottom-section4" id="phytoremediation">
            <Phyto/>
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
              <PhytoCapacity sections={sectionphyto}/>
            </div>
            <div className="bottom-section10" id="uses-of-plant">
              <UsesOfPlant sections={usessections}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollutantPage;