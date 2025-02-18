import React from 'react';
import './pollutantPage.css';

const Timeline = ({ pollutant, position }) => {
  const timelineEvents = [
    { type: 'pollutant', content: pollutant },
    { type: 'sound', content: '440Hz - Natural frequency of A note' },
    { type: 'health', content: ['Respiratory issues', 'Neurological damage', 'Cancer risks'] },
    { type: 'test', content: 'EC50: 5.2mg/L | LC50: 12.4mg/L' },
    { type: 'plant', content: 'Phragmites Australis' },
    { type: 'names', content: ['Common Reed', 'Ditch Reed', 'Carrizo'] },
    { type: 'origin', content: 'Native to Europe and Asia' },
    { type: 'phyto', content: 'Hyperaccumulator of heavy metals' },
    { type: 'uses', content: ['Water filtration', 'Biofuel production', 'Erosion control'] },
    { type: 'references', content: ['WHO Guidelines', 'EPA Technical Reports'] }
  ];

  const getPositionClass = (type) => {
    const leftTypes = ['pollutant', 'plant', 'references'];
    return leftTypes.includes(type) ? 'left' : 'right';
  };

  const renderContent = (event) => {
    switch(event.type) {
      case 'pollutant':
      case 'plant':
        return <h3 className="event-title">{event.content}</h3>;
      case 'sound':
        return (
          <div className="sound-frequency">
            <p>{event.content}</p>
            {/* <SineWaveVisualizer /> */}
          </div>
        );
      case 'health':
      case 'names':
      case 'uses':
      case 'references':
        return (
          <ul className="event-list">
            {event.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      default:
        return <p className="event-description">{event.content}</p>;
    }
  };

  return (
    <div className="timeline-container">
      <h2 className="text-wrapper">{pollutant} Timeline</h2>
      <div className="timeline-line"></div>
      <div className="overlap-group">
        {timelineEvents.map((event, index) => (
          <div 
            key={index}
            className={`timeline-item ${getPositionClass(event.type)}`}
            style={{ top: `${index}px` }}
          >
            <div className="event-content">
              {renderContent(event)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 