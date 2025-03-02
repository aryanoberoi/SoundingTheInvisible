import React from "react";
import group233 from "./group-233.png";
import "./AboutPlant.css";
import vector41 from "./vector-41.svg";
import vector42 from "./vector-42.svg";
import vector43 from "./vector-43.svg";

export const AboutPlant = () => {
  return (
    <div className="box">
      <div className="group">
        <p className="text-wrapper">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
          imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu
          neque. Etiam rhoncus erat non quam vehicula, sed maximus magna
          tincidunt. Sed condimentum sollicitudin nibh, nec mattis quam. Ut eu
          volutpat nisi, quis varius risus. Integer rutrum eros ac turpis
          euismod, in tincidunt risus dapibus. Etiam eget turpis massa. Fusce
          rutrum sit amet magna sit amet aliquam. Donec sit amet cursus erat,
          sit amet sagittis nunc. Nullam mattis risus nisi, non interdum elit
          congue in. Donec vitae ligula elit. Morbi nec luctus elit, eu feugiat
          turpis. Sed porttitor luctus ornare. Suspendisse condimentum fermentum
          convallis.
        </p>

        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="div">About Plant</div>

            <div className="overlap-group">
              <div className="group-wrapper">
                <img className="img" alt="Group" src={group233} />
              </div>

              <img className="vector" alt="Vector" src={vector41} />

              <img className="vector-2" alt="Vector" src={vector42} />

              <img className="vector-3" alt="Vector" src={vector43} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
