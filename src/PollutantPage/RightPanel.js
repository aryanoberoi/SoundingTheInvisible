import React from 'react';
import { KnowMoreButton } from './Knowmorebutton';
import './RightPanel.css';
import { PlantInfoSection } from './PlantInfoSection';


const plantData = [
  {
    title: "Wetland status:",
    description: "FACU or OBL etc and explain what it is"
  },
  {
    title: `Phytoremdiation capacity of plant_name:`,
    description: "Lorem ipsum dolor sit amet, \n consectetur adipiscing eli. \n Duis accumsan lacus sit amet sagittis feugiat. \n Morbi et velit fringilla, maximus quam et, \n cursus odio. \n Donec quis sem gravida nisi malesuada fringilla. \n Duis ac erat vitae magna rutrum suscipit."
  },
  {
    title: "Plant Habitat:",
    description: "Temperature,  \nhumidity, \nsoil type, \nwhat kind of areas it"
  }
];

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div className="plantContainer">
        <div className="contentWrapper">
          <aside className="sidebar">
            {plantData.map((section, index) => {
              if (index === plantData.length - 1) {
                return (
                  <div key={index}>
                    <div className="sectionTitle">{section.title}</div>
                    <div className="titleList">
                      {section.description.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className="titleEntry">
                          <div className="rightPanel-bullet" />
                          <span className="titleText">{line}</span>
                        </div>
                      ))}
                    </div>
                    <KnowMoreButton className="knowMoreButton" />
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
          
          <main className="mainContent">
            <div className="imageSection">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/16352f3f964c03ec54c661ca0da371220832b2c2f872538ebde3aa40d6a7628c?placeholderIfAbsent=true&apiKey=e7c66450d645437e80b3c1918bb89cd7"
                alt="Detailed view of the plant"
                className="plantImageRightPanel"
              />
              <div className="plantDescription">
                <h1 className="plantName">Plant name</h1>
                <p className="plantDetails">
                  Describe the plant from top to down so one can visualize it. 
                  Don't jump from different parts of the plant. Please use simple 
                  language so that the reader can visualize the plant. 
                  Reproduction of the plant needs to be explained.
                </p>
                <KnowMoreButton className="knowMoreButton" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;