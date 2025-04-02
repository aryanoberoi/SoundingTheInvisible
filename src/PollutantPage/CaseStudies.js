import React from "react";
import group121 from "./group-121.svg";
import "./CaseStudies.css";

export const CaseStudies = ({ sections }) => {
  // Helper function to get title and content from text
  const parseSection = (text) => {
    const [title, content] = text.split('_');
    return { title, content };
  };

  const name = parseSection(sections[0].text);
  const location = parseSection(sections[1].text);

  return (
    <div className="box">
      <div className="group">
        <div className="overlap">
          <div className="overlap-group">
            <p className="text-wrapper">
              {location.content}
            </p>

            <img
              className="rectangle"
              alt="Rectangle"
              src="https://c.animaapp.com/2uQFoxD8/img/rectangle-28.svg"
            />

            <p className="div">
              {name.content}
            </p>

            <div className="overlap-wrapper">
              <div className="overlap-2">
                <div className="overlap-3">
                  <img
                    className="group-121"
                    alt="Group"
                    src={group121}
                  />
                </div>  
              </div>
            </div>

            <div className="text-wrapper-2">{location.title}</div>

            <img
              className="rectangle-5"
              alt="Rectangle"
              src="https://c.animaapp.com/2uQFoxD8/img/rectangle-28-1.svg"
            />
          </div>

          <img
            className="vector-3"
            alt="Vector"
            src="https://c.animaapp.com/2uQFoxD8/img/vector-109.svg"
          />
        </div>

        <div className="overlap-group-wrapper">
          <div className="overlap-group-2">
            <div id = "sources-section" className="text-wrapper-3">Case studies</div>
          </div>
        </div>

        <div className="text-wrapper-4">{name.title}</div>
      </div>
    </div>
  );
};
  