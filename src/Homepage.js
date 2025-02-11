// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Homepage.css";

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="homepage">
//       {/* Section 1 - White */}
//       <section className="section white">
//         <img src="image1.png" alt="Artwork 1" className="overlapping-image" />
//         <p className="overlapping-text">
//           Welcome to the exploration of environmental pollutants and their impact.
//         </p>
//       </section>

//       {/* Section 2 - White */}
//       <section className="section white">
//         <p className="overlapping-text">A delicate balance between nature and industrialization...</p>
//         <img src="image2.png" alt="Artwork 2" className="overlapping-image" />
//       </section>

//       {/* Section 3 - Black */}
//       <section className="section black">
//         <img src="image3.png" alt="Artwork 3" className="overlapping-image" />
//         <p className="overlapping-text">But at what cost?</p>
//       </section>

//       {/* Section 4 - White */}
//       <section className="section white">
//         <p className="overlapping-text">
//           Nature finds a way, but human intervention leaves a mark.
//         </p>
//         <img src="image4.png" alt="Artwork 4" className="overlapping-image" />
//       </section>

//       {/* Section 5 - White */}
//       <section className="section white">
//         <img src="image5.png" alt="Artwork 5" className="overlapping-image" />
//         <button className="navigate-button" onClick={() => navigate("/pollutants")}>
//           Explore Pollutants →
//         </button>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

// import React from "react";
// import { Group12 } from "./Group12";
// import { PropertyDefault } from "./PropertyDefault";
// import frame2 from "./frame-2.svg";
// import frame41 from "./frame-41.svg";
// import frame from "./frame.svg";
// import image from "./image.svg";
// import "./style.css";

// export const Homepage = () => {
//   return (
//     <div className="homepage">
//       <div className="div">
//         <div className="overlap">
//           <div className="overlap-2">
//             <img className="frame" alt="Frame" src={frame2} />

//             <PropertyDefault
//               className="property-1-default"
//               img="rectangle-5.png"
//               overlapGroupClassName="property-default-instance"
//               rectangle="rectangle-3.png"
//               rectangle1="rectangle-4.png"
//               rectangleClassName="property-1-default-instance"
//             />
//             <img className="frame-2" alt="Frame" src={frame41} />
//           </div>

//           <p className="text-wrapper">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
//             imperdiet.
//           </p>
//         </div>

//         <div className="overlap-3">
//           <div className="overlap-4">
//             <img className="frame-3" alt="Frame" src={frame} />

//             <div className="rectangle-3" />

//             <img className="frame-4" alt="Frame" src={image} />

//             <p className="p">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse congue mollis mauris eget faucibus. Donec fermentum
//               nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
//               quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
//             </p>

//             <p className="text-wrapper-2">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse congue mollis mauris eget faucibus. Donec fermentum
//               nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
//               quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
//             </p>
//           </div>

//           <p className="text-wrapper-3">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
//             imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper
//             eu neque. Etiam rhoncus erat non quam vehicula.
//           </p>
//         </div>

//         <Group12 className="group" />
//       </div>
//     </div>
//   );
// };

// import React from 'react';
// import { TopSection } from './TopSection';
// import { MiddleSection } from './MiddleSection';
// import { BottomSection } from './BottomSection';

// export default function HomePage() {
//   return (
//     <main className="flex overflow-hidden flex-col items-end pt-10 bg-white pb-[736px] max-md:pb-24">
//       <TopSection />
//       <MiddleSection />
//       <BottomSection />
//     </main>
//   );
// }

import React from "react";
// import { Group12 } from "./Group12";
// import { PropertyDefault } from "./PropertyDefault";
// import frame2 from "./frame-2.svg";
// import frame41 from "./frame-41.svg";
// import frame from "./frame.svg";
// import image from "./image.svg";
import "./Homepage.css";

export default function Homepage () {
  return (
    <div className="homepage">
      <div className="div">
        <div className="overlap">
          <div className="overlap-2">
            {/* <img className="frame" alt="Frame" src={frame2} /> */}

            {/* <PropertyDefault
              className="property-1-default"
              img="rectangle-5.png"
              overlapGroupClassName="property-default-instance"
              rectangle="rectangle-3.png"
              rectangle1="rectangle-4.png"
              rectangleClassName="property-1-default-instance"
            /> */}
            {/* <img className="frame-2" alt="Frame" src={frame41} /> */}
          </div>

          <p className="text-wrapper">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
            imperdiet.
          </p>
        </div>

        <div className="overlap-3">
          <div className="overlap-4">
            {/* <img className="frame-3" alt="Frame" src={frame} /> */}

            <div className="rectangle-3" />

            {/* <img className="frame-4" alt="Frame" src={image} /> */}

            <p className="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse congue mollis mauris eget faucibus. Donec fermentum
              nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
              quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
            </p>

            <p className="text-wrapper-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse congue mollis mauris eget faucibus. Donec fermentum
              nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
              quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
            </p>
          </div>

          <p className="text-wrapper-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
            imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper
            eu neque. Etiam rhoncus erat non quam vehicula.
          </p>
        </div>

        {/* <Group12 className="group" /> */}
      </div>
    </div>
  );
};

