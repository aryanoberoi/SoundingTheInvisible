import React from "react";
import "./Body.css";

export const Box = () => {
  const [expandedItem, setExpandedItem] = React.useState(null);

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  // Array of content strings for each item
  const contentArray = [
    "Content for item 1: Detailed information about the first topic.",
    "Content for item 2: Insights and data related to the second topic.",
    "Content for item 3: Explanation and context for the third topic.",
    "Content for item 4: Additional details for the fourth topic.",
    "Content for item 5: Comprehensive overview of the fifth topic.",
    "Content for item 6: Key points and highlights for the sixth topic.",
    "Content for item 7: Final thoughts and conclusions for the seventh topic.",
    "Content for item 8: Final thoughts and conclusions for the seventh topic.",
    "Content for item 9: Final thoughts and conclusions for the seventh topic.",
    "Content for item 10: Final thoughts and conclusions for the seventh topic.",
    "Content for item 11: Final thoughts and conclusions for the seventh topic."
    // Add more content as needed
  ];

  return (
    <div className="box-container">
      <div className="box-content-sections">
        <div className="box-header-container">
          <div className="box-header-overlap">
            <div className="box-header-background" />
            <div className="box-header-underline" />
            <div className="box-header-title">Effects on human health</div>
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
          {contentArray.map((content, index) => (
            <div 
              className={`content-item content-item-${index + 1} ${expandedItem === index + 1 ? 'expanded' : ''}`} 
              key={index}
              onClick={() => toggleItem(index + 1)}
            >
              <div className="item-overlap">
                <div className="item-title">Title for item {index + 1}</div>
                <div className="item-icon-wrapper">
                  <img
                    className="item-icon"
                    alt="Expand icon"
                    src={`https://c.animaapp.com/Vg2l9Q1d/img/vector-148-${(index + 1) % 2 === 0 ? 6 : 4}.svg`}
                  />
                </div>
                {expandedItem === index + 1 && (
                  <div className="item-content">
                    {content} {/* Display content based on the expanded item */}
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