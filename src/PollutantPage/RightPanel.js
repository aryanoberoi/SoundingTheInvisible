import React from 'react';
import { KnowMoreButton } from './Knowmorebutton';
import './RightPanel.css';
import { PlantInfoSection } from './PlantInfoSection';
import tempIcon from './temp.png';
import humidityIcon from './humidity.png';
import soilIcon from './soil.png';
import areaIcon from './area.png';

const RightPanel = ({ sections = [] }) => {
  const {
    wetlandDescription = "",
    phytoCapacity = "",
    temperature = "",
    humidity = "",
    soil = "",
    ph = "",
    imgUrl = "",
    plantName = "",
    plantDetails = ""
  } = sections[0] || {};

  const habitatIcons = [tempIcon, humidityIcon, soilIcon, areaIcon];

  const plantData = [
    {
      title: "Wetland status:",
      description: wetlandDescription
    },
    {
      title: `Phytoremediation capacity of ${plantName}:`,
      description: phytoCapacity.split('_').join('\n')
    },
    {
      title: "Plant Habitat:",
      description: [
        `Temperature: ${temperature}`,
        `Humidity: ${humidity}`,
        `Soil: ${soil}`,
        `PH Value: ${ph}`
      ].join('\n')
    }
  ];

  const scrollToId = (id, specificOffset) => {
    const element = document.getElementById(id);
    if (element) {
      const defaultOffset = 77;
      const offset = specificOffset !== undefined ? specificOffset : defaultOffset;

      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  };

  return (
    <div className="right-panel">
      <div className="plantContainer">
        <div className="contentWrapper">
          <aside className="sidebar">
            {plantData.map((section, index) => {
              if (index >= 1) {
                let targetId = '';
                if (index === 1) {
                  targetId = 'phyto-capacity';
                } else if (index === 2) {
                  targetId = 'plant-habitat';
                }

                return (
                  <div key={index}>
                    <div className="sectionTitle">{section.title}</div>
                    <div className="titleListRightPanel">
                      {index === 1 ? (
                        <ul>
                          {section.description.split('\n').map((line, lineIndex) => (
                            <li key={lineIndex} className="titleListRightPanel">
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        section.description.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className="titleEntry">
                            <div className="rightPanel-bullet">
                              <img
                                src={habitatIcons[lineIndex]}
                                alt={`icon-${lineIndex}`}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              />
                            </div>
                            <span className="titleTextRightPanel">{line}</span>
                          </div>
                        ))
                      )}
                    </div>
                    {targetId && <KnowMoreButton className="knowMoreButtonRightPanel" onClick={() => scrollToId(targetId)} />}
                  </div>
                );
              }
              return (
                <PlantInfoSection
                  key={index}
                  title={section.title}
                  description={section.description}
                  showKnowMore={false}
                />
              );
            })}
          </aside>
          
          <main className="mainContent">
            <div className="imageSection">
              <img
                src='plantimg.png'
               alt="Detailed view of the plant"
                className="plantImageRightPanel"
              />
              <div className="plantDescription">
                <h1 className="plantName">{plantName}</h1>
                <p className="plantDetails">
                  {plantDetails}
                </p>
                <KnowMoreButton className="knowMoreButtonRightPanel" onClick={() => scrollToId('plant-name', 130)} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;