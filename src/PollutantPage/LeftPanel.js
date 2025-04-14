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

  const scrollToAboutPollutant = () => {
    const aboutPollutantSection = document.getElementById("about-pollutant-section");
    if (aboutPollutantSection) {
      aboutPollutantSection.scrollIntoView({ behavior: "smooth" });
    }};

  const scrollToEffectsOnHealth = () => {
    const effectsOnHealthSection = document.getElementById("effects-on-health-section");
    if (effectsOnHealthSection) {
      effectsOnHealthSection.scrollIntoView({ behavior: "smooth" });
    }};

  const scrollToEnthalpy = () => {
    const enthalpySection = document.getElementById("enthalpy-section");
    if (enthalpySection) {
      enthalpySection.scrollIntoView({ behavior: "smooth" });
    }};
  
  const scrollToSources = () => {
    const sourcesSection = document.getElementById("sources-section");
    if (sourcesSection) {
      sourcesSection.scrollIntoView({ behavior: "smooth" });
    }};

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
                <KnowMoreButtonInverted className="knowMoreButtonInverted" onClick={scrollToAboutPollutant} />
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
              <KnowMoreButtonInvertedRA className="knowMoreButtonInvertedRA" onClick={scrollToEffectsOnHealth}/>
              <div className="sectionTitleLeftPanel" style={{paddingBottom: '10px'}}>
                Enthalpy and sound <br /> Frequency of {pollutantName}
                <br />
              </div>
              <div style={{ border: '1px solid black', width: '260px', height: '50px', overflow: 'hidden' }}>
                <SineWaveVisualizer />
              </div>
              <KnowMoreButtonInvertedRA className="knowMoreButtonInvertedRA" onClick={scrollToEnthalpy} />
            </div>
            <div className="sourcesTitle">Sources In Venice Lagoon:</div>
            <div className="sourcesDescription">
              {sources}
            </div>
            <KnowMoreButtonInvertedRA className="knowMoreButtonInvertedRA" onClick={scrollToSources}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;