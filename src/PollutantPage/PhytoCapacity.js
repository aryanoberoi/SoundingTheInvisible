import React, { useState } from "react";
import "./PhytoCapacity.css";

export const PhytoCapacity = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleReadMore = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="uses-of-plant-container">
        <div className="uses-of-plant-header">
            <div className="uses-of-plant-rectangle" />
            <div className="uses-of-plant-underline" />
            <div className="uses-of-plant-title">Phytoremediation capacity of the Plant</div>
        </div>

        <div className="uses-of-plant-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est quam, quis dictum ligula fringilla ut. Donec varius nisl ut lobortis dignissim. Integer tincidunt arcu erat, sit amet malesuada purus consequat eu. Nam dapibus a nunc at tincidunt. Etiam commodo, felis nec vulputate rhoncus, diam arcu interdum metus, a lobortis risus ante sit amet nisi. Cras.        </div>

        <div className="phyto-content-wrapper">
            <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
            </div>
            <div className="phyto-info-section">
                <div className="phyto-benefits-heading">Title Here</div>
                <div className="section-divider"></div>
                <p className="phyto-benefits-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                <div className="vertical-divider-right"></div>
            </div>
        </div>

        {/* Duplicate section with reversed order */}
        <div className="phyto-content-wrapper-reversed">
            <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
            </div>
            <div className="phyto-info-section">
                <div className="phyto-benefits-heading">Title Here</div>
                <div className="section-divider"></div>
                <p className="phyto-benefits-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est quam, quis dictum ligula fringilla ut. Donec varius nisl ut lobortis dignissim. Integer tincidunt arcu erat, sit amet malesuada purus consequat eu. Nam dapibus a nunc at tincidunt. Etiam commodo, felis nec vulputate rhoncus,.</p>
            </div>
        </div>
        <div className="uses-of-plant-header">
            <div className="uses-of-plant-rectangle" />
            <div className="uses-of-plant-underline" />
            <div className="uses-of-plant-title">Phytoremediation capacity of the Plant</div>
        </div>

    
        <div className="phyto-content-wrapper">
            <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
            </div>
            <div className="phyto-info-section">
                <div className="phyto-benefits-heading">Title Here</div>
                <div className="section-divider"></div>
                <p className="phyto-benefits-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                <div className="vertical-divider-right"></div>
            </div>
        </div>

        {/* Duplicate section with reversed order */}
        <div className="phyto-content-wrapper-reversed">
            <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
            </div>
            <div className="phyto-info-section">
                <div className="phyto-benefits-heading">Title Here</div>
                <div className="section-divider"></div>
                <p className="phyto-benefits-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est quam, quis dictum ligula fringilla ut. Donec varius nisl ut lobortis dignissim. Integer tincidunt arcu erat, sit amet malesuada purus consequat eu. Nam dapibus a nunc at tincidunt. Etiam commodo, felis nec vulputate rhoncus,.</p>
            </div>
        </div>

        <div className="phyto-content-wrapper">
            <div className="phyto-svg-container">
                <img src={require("./phyto.svg").default} alt="Phytoremediation visual" />
            </div>
            <div className="phyto-info-section">
                <div className="phyto-benefits-heading">Title Here</div>
                <div className="section-divider"></div>
                <p className="phyto-benefits-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            </div>
        </div>
        
    </div>
  );
};
