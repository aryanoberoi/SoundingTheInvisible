import React from "react";
import "./Body.css";

export const Box = ({ sections }) => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  // Helper function to parse title and content
  const parseSection = (text) => {
    const [title, content] = text.split('_');
    return { title, content };
  };

  return (
    <div className="box-container">
      <div className="box-content-sections">
        <div className="box-header-container">
          <div className="box-header-overlap">
            <div id="effects-on-health-section" className="box-header-title">Effects on human health</div>
          </div>
        </div>

        <div className="human-container" style={{ height: 'auto', minHeight: '800px' }}>
          <div className="human-image-wrapper" style={{ height: 'auto', minHeight: '400px' }}>
            <img
              className="main-human-image"
              alt="Human anatomy diagram"
              src="https://c.animaapp.com/Vg2l9Q1d/img/group-186.png"
              style={{ height: '200%' }}
            />
            <div className="human-graphics-container" style={{ height: 'auto', minHeight: '300px' }}>
              <div className="human-graphics-overlap" style={{ height: 'auto', minHeight: '300px' }}>
                <img
                  className="human-vector"
                  alt="Anatomy vector"
                  src="https://c.animaapp.com/Vg2l9Q1d/img/human-2.png"
                  style={{ height: '200%' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="content-items-container" style={{ transform: 'translate(-8em, 13em)' }}>
          {sections.map((section, index) => {
            const { title, content } = parseSection(section.text);
            return (
              <div 
                className={`content-item content-item-${index + 1} ${expandedItem === index + 1 ? 'expanded' : ''}`} 
                key={index}
                onClick={() => toggleItem(index + 1)}
              >
                <div className="item-overlap">
                  <div className="item-title">{title}</div>
                  <div className="item-icon-wrapper">
                    <img
                      className="item-icon"
                      alt="Expand icon"
                      src={`https://c.animaapp.com/Vg2l9Q1d/img/vector-148-${(index + 1) % 2 === 0 ? 6 : 4}.svg`}
                    />
                  </div>
                  {expandedItem === index + 1 && (
                    <div className="item-content">
                      {content}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};