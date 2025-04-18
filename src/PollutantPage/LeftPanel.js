import React from 'react';
import './pollutantcard.css';
import './LeftPanel.css';
import { KnowMoreButtonInvertedRA } from './Knowmorebutton';
import { KnowMoreButtonInverted } from './Knowmorebutton';
import SineWaveVisualizer from './sinwave';

const LeftPanel = ({ sections = [] }) => {
  if (sections.length === 0) return null;
  
  const { 
    pollutantName = "Pollutant Name",
    pollutantDescription = "",
    effect = "",
    sources = "",
    atomImage = "",
    typeOfWaste = ""
  } = sections[0];

  // Process health effects into titles
  const healthEffectsTitles = effect.split('_');

  // 1. Modify the scroll function to accept an offset parameter
  const scrollToId = (id, specificOffset) => {
    const element = document.getElementById(id);
    if (element) {
      const defaultOffset = 100; // Default offset
      const offset = specificOffset !== undefined ? specificOffset : defaultOffset; // Use specific offset if provided, otherwise default
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  };

  return (
    <div className="left-panel">
      <div className="container">
        <div className="contentWrapper">
          <div className="mainContent">
            <div className="pollutantInfo">
              <div className="headerWrapper">
                <img src={atomImage} alt={`${pollutantName} waste type icon`} className="circle" />
                <div className="pollutantName">{pollutantName}</div>
              </div>
              <div className="description">
                {pollutantDescription}
              </div>
              <div className='knowone'>
                <KnowMoreButtonInverted className="knowMoreButtonInverted" onClick={() => scrollToId('about-pollutant-section')} />
              </div>
              <div className="imageContainer" />
            </div>
          </div>
          <div className="sideContent">
            <div className="sideContentWrapper">
              <div className="sectionTitleLeftPanel">Effects on human health:</div>
              <div className="titleList">
                {healthEffectsTitles.map((title, index) => (
                  <div key={index} className="titleEntry">
                    <span className="titleTextSC">{title}</span>
                    <div className="bulletcircle"/>
                  </div>
                ))}
              </div>
              <KnowMoreButtonInvertedRA className="knowMoreButtonInvertedRA" onClick={() => scrollToId('effects-on-health-section')}/>
              <div className="sectionTitleLeftPanel" style={{paddingBottom: '10px'}}>
                Enthalpy and sound <br /> Frequency of {pollutantName}
                <br />
              </div>
              <div style={{ border: '1px solid black', width: '260px', height: '50px', overflow: 'hidden' }}>
                <SineWaveVisualizer />
              </div>
              <KnowMoreButtonInvertedRA className="knowMoreButtonInvertedRA" onClick={() => scrollToId('enthalpy-section', 333)} />
            </div>
            <div className="sourcesTitle">Sources In Venice Lagoon:</div>
            <div className="sourcesDescription">
              {sources}
            </div>
            <KnowMoreButtonInvertedRA className="knowMoreButtonInvertedRA" onClick={() => scrollToId('sources-section')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;