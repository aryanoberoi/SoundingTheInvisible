import React, { useState } from "react";
import "./UsesOfPlant.css";
import vector166 from "./vector-166.svg";
import vector167 from "./vector-167.svg";
import ellipse89 from "./ellipse-89.svg";
import vector166E from "./vector-166-e.svg";
import longDownArrow from "./long-down-arrow.svg";

export const UsesOfPlant = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleReadMore = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="uses-of-plant-container">
        <div className="uses-of-plant-header">
            <div className="uses-of-plant-rectangle" />
            <div className="uses-of-plant-underline" />
            <div className="uses-of-plant-title">Uses of the Plant</div>
        </div>
        <div className="uses-container-nutritional">
            <div className="circle-inverted"/>
            <div className={`text-vector-group ${expandedSection === 'nutritional' ? 'expanded' : ''}`}>
                <div className="nutritional">NUTRITIONAL</div>
                <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                <div className="nutrition-text-header">This is placeholder text for title</div>
                <div className="nutrition-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                <img 
                    alt="nsvg"
                    src={expandedSection === 'nutritional' ? vector166E : vector166}
                    className={`vector-166 ${expandedSection === 'nutritional' ? 'expanded' : ''}`}
                />
                {expandedSection !== 'nutritional' && <img alt="nsvg" src={vector167} className="vector-167" />}
            </div>
            
            {expandedSection === 'nutritional' && (
              <>
                <div className="text-vector-group">
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className="nutrition-text-header">This is placeholder text for title</div>
                  <div className="nutrition-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                </div>
                <div className="text-vector-group">
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className="nutrition-text-header">This is placeholder text for title</div>
                  <div className="nutrition-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                </div>
              </>
            )}
            
            <div className="button-container">
                <button className="read-more-button" onClick={() => handleReadMore('nutritional')}>
                    {expandedSection === 'nutritional' ? 'Show Less' : 'Read More'}
                </button>
            </div>
        </div>
        <div className="uses-container-medicine"> 
            <div className="circle-inverted"/>
            <div className={`text-vector-group ${expandedSection === 'medicine' ? 'expanded' : ''}`}>
                <div className="medicine">MEDICINE</div>
                <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                <div className="medicine-text-header">This is placeholder text for title</div>
                <div className="medicine-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                <img 
                    alt="nsvg"
                    src={expandedSection === 'medicine' ? vector166E : vector166}
                    className={`vector-166 ${expandedSection === 'medicine' ? 'expanded' : ''}`}
                />
                {expandedSection !== 'medicine' && <img alt="nsvg" src={vector167} className="vector-167" />}
            </div>
            
            {expandedSection === 'medicine' && (
              <>
                <div className="text-vector-group">
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className="medicine-text-header">This is placeholder text for title</div>
                  <div className="medicine-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                </div>
                <div className="text-vector-group">
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className="medicine-text-header">This is placeholder text for title</div>
                  <div className="medicine-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                </div>
              </>
            )}
            
            <div className="button-container">
                <button className="read-more-button" onClick={() => handleReadMore('medicine')}>
                    {expandedSection === 'medicine' ? 'Show Less' : 'Read More'}
                </button>
            </div>
        </div>
        <div className="uses-container-additional">
            <div className="circle-inverted"/>
            <div className={`text-vector-group ${expandedSection === 'additional' ? 'expanded' : ''}`}>
                <div className="additional">ADDITIONAL</div>
                <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                <div className="additional-text-header">This is placeholder text for title</div>
                <div className="additional-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                <img 
                    alt="nsvg"
                    src={expandedSection === 'additional' ? vector166E : vector166}
                    className={`vector-166 ${expandedSection === 'additional' ? 'expanded' : ''}`}
                />
                {expandedSection !== 'additional' && <img alt="nsvg" src={vector167} className="vector-167" />}
            </div>
            
            {expandedSection === 'additional' && (
              <>
                <div className="text-vector-group">
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className="additional-text-header">This is placeholder text for title</div>
                  <div className="additional-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                </div>
                <div className="text-vector-group">
                  <img src={ellipse89} alt="ellipse" className="ellipse-89" />
                  <div className="additional-text-header">This is placeholder text for title</div>
                  <div className="additional-text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.</div>
                </div>
              </>
            )}
            
            <div className="button-container">
                <button className="read-more-button" onClick={() => handleReadMore('additional')}>
                    {expandedSection === 'additional' ? 'Show Less' : 'Read More'}
                </button>
            </div>
        </div>
        <div className="uses-of-plant-container" style={{marginLeft: '100px'}}>
          <img 
              alt="down arrow"
              src={longDownArrow}
              className="down-arrow-icon"
              style={{marginTop: '120px', marginBottom: '160px', marginLeft: '40px'}}
          />
          <div className="button-container-bibliography">
            <button className="bibliography-button">
              BIBLIOGRAPHY
            </button>
          </div>
        </div>
        
    </div>
  );
};
