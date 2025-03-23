import React from "react";
import "./PhytoCapacity.css";

export const PhytoCapacity = () => {
  return (
    <div className="phyto-capacity-container">
        <div className="phyto-capacity-header">
            <div className="phyto-capacity-rectangle" />
            <div className="phyto-capacity-underline" />
            <div className="phyto-capacity-title">Phytoremediation capacity of the Plant</div>
        </div>

        <div className="phyto-capacity-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est quam, quis dictum ligula fringilla ut. Donec varius nisl ut lobortis dignissim. Integer tincidunt arcu erat, sit amet malesuada purus consequat eu. Nam dapibus a nunc at tincidunt. Etiam commodo, felis nec vulputate rhoncus, diam arcu interdum metus, a lobortis risus ante sit amet nisi. Cras.        </div>

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
        <div className="phyto-capacity-header">
            <div className="phyto-capacity-rectangle" />
            <div className="phyto-capacity-underline" />
            <div className="phyto-capacity-title">Phytoremediation capacity of the Plant</div>
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
