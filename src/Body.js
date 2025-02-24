import React from "react";
import "./Body.css";

export const Box = () => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <div className="health-effects-box">
      <div className="content-sections">
        <div className="header-container">
          <div className="header-overlap">
            <div className="header-background" />
            <div className="header-underline" />
            <div className="header-title">Effects on human health</div>
          </div>
        </div>

        <div className="human-container">
          <div className="human-image-wrapper">
            <img
              className="main-human-image"
              alt="Human anatomy diagram"
              src="https://c.animaapp.com/Vg2l9Q1d/img/group-186.png"
            />
            <div className="human-graphics-container">
              <div className="human-graphics-overlap">
                <img
                  className="human-vector"
                  alt="Anatomy vector"
                  src="https://c.animaapp.com/Vg2l9Q1d/img/human-2.png"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="content-items-container">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div 
              className={`content-item content-item-${item} ${expandedItem === item ? 'expanded' : ''}`} 
              key={item}
              onClick={() => toggleItem(item)}
            >
              <div className="item-overlap">
                <div className="item-title">Place your title here</div>
                <div className="item-icon-wrapper">
                  <img
                    className="item-icon"
                    alt="Expand icon"
                    src={`https://c.animaapp.com/Vg2l9Q1d/img/vector-148-${item % 2 === 0 ? 6 : 4}.svg`}
                  />
                </div>
                {expandedItem === item && (
                  <div className="item-content">
                    {/* Add your detailed text content here */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
