import React, { useState, useEffect } from 'react';
import './pollutantPage.css';
import styles from './PollutantPage/pollutantcard.css'
import { Box } from './PollutantPage/Body';
import { CaseStudies } from './PollutantPage/CaseStudies';
import { Phyto } from './PollutantPage/Phyto';
import LeftPanel from './PollutantPage/LeftPanel';
import RightPanel from './PollutantPage/RightPanel';
import { AboutPlant } from './PollutantPage/AboutPlant';
import { CommonNames } from './PollutantPage/CommonNames';
import { PlantHabitat } from './PollutantPage/PlantHabitat';
import { Origin } from './PollutantPage/Origin';
import { UsesOfPlant } from './PollutantPage/UsesOfPlant';
import { PhytoCapacity } from './PollutantPage/PhytoCapacity';
import { AboutPollutantSection } from './PollutantPage/AboutPollutant';
import { SoundFrequency } from './PollutantPage/SoundFrequency';

const PollutantPage = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const leftpanelcontent = [
    { 
      pollutantName: "Potassium",
      typeOfWaste: 1,
      atomImage: "",
      pollutantDescription: "Potassium (K) is a soft, silvery alkali metal discovered in 1807 by Sir Humphry Davy through electrolysis of potash (KOH). Radioactive K-40 has a 1.25 billion-year half-life; stable isotopes are K-39 and K-41. Excess potassium causes eutrophication. Canada leads potash production, used mainly in fertilizers.",
      effect: "Cardiac arrhythmias and potential heart failure_Weakness and fatigue_Nausea and vomiting_Breathing difficulties",
      sources: "Research on nutrient pollution in the Venice Lagoon, primarily from agricultural runoff, urban wastewater, and industrial discharges, has been extensive. Fertilizers, a key potassium source, are a major contributor, alongside urban wastewater and industrial activities. While potassium-specific studies are limited, these sources contribute to overall nutrient pollution impacting the lagoon."
    }
  ];
  const rightpanelcontent = [
    {
      plantNameSplit: "Salvinia molesta",
      wetlandDescription: "OBL (Obligate Wetland Plant) - Almost always occurs in wetlands",
      phytoCapacity: "Copper_Nickel_Lead_Mercury_Heavy metals",
      temperature: "Ideal temperatures of 20 and 30°C (68–86°F)",
      humidity: "Prefers humidity levels >60%",
      soil: "Can survive in waterlogged soils",
      ph: "4.5 to 8.5",
      imgUrl: "https://res.cloudinary.com/dj1km5iax/image/upload/v1742130083/elyrp1i8tuj1jvvznlbb.jpg",
      plantName: "Salvinia molesta",
      plantDetails: "Salvinia molesta is a floating fern with whorled fronds and root-like submerged structures. It reproduces asexually, forming dense mats. Native to Brazil, it spread globally post-1950s, becoming invasive. Human activity, like ornamental trade, aided its dispersal across continents, impacting ecosystems."
    }
  ];
  const aboutpollutantcontent = [
    {
      text: "About Potassium_Potassium is a highly reactive and soft metal that rapidly tarnishes in air and reacts violently with water, generating sufficient heat to ignite the hydrogen emitted in the reaction. Its name originates from \"potash,\" while its symbol(K) derives from the Latin \"kalium,\" reflecting its historical association with ashes. Long before its scientific discovery, potassium compounds were utilized in ancient practices like glassmaking and soap production, and as a component of gunpowder. Today, it remains crucial in various industries, notably as a fertilizer to enhance agricultural yields. Canada stands as the leading potash producer, followed by other nations like China, highlighting potassium's global economic significance. While stable potassium is generally benign, excessive potassium-based fertilizer runoff contributes to eutrophication, disrupting aquatic ecosystems by promoting algal blooms and oxygen depletion. Furthermore, the naturally occurring radioactive isotope potassium-40, present in all living organisms, contributes to low-level radiation exposure and raises concerns about long-term bioaccumulation in the environment. This necessitates careful management of potassium use to balance its industrial and agricultural benefits with its potential environmental impacts.",
      image: ""
    }
  ];
  const sinewavefreq = [
    { 
      enthalpy: "90 KJ/mol",
      soundfrequency: "22.56 Hz",
      wavefrequency: 250.5
    }
  ];
  const effectonhealthcontent = [
    { text: "Cardiac Effects_Potassium imbalances disrupt the heart's electrical activity. Hyperkalemia(elevated potassium levels) causes erratic signals, irregular beats, and potential heart failure. Hypokalemia (low potassium levels) also disrupts rhythm, increasing arrhythmia risk. Maintaining potassium balance is essential for preventing cardiac arrhythmias and heart failure." },
    { text: "Musculoskeletal Effects_Potassium is crucial for muscle function. Hypokalemia and hyperkaemia causes weakness, cramps, and may even lead to paralysis. The balance of potassium is vital for preventing muscle weakness and other harmful effects." },
    { text: "Neurological Effects_Potassium aids nerve signal transmission. Imbalances disrupt this process, affecting nerve function. Though not always noticeable, these disruptions contribute to weakness and fatigue. Maintaining proper potassium levels is important for preventing nerve signal transmission disruption." },
    { text: "Gastrointestinal Effects_Hyperkalemia induces nausea and vomiting. High potassium impacts the gastrointestinal system's nerves and muscles, possibly affecting the brain's chemoreceptor trigger zone. This helps to prevent nausea and vomiting related to hyperkalemia." },
    { text: "Respiratory Effects_Severe hyperkalemia causes breathing difficulties. High potassium affects respiratory muscles, leading to shallow or labored respiration. Maintaining proper potassium levels is essential for preventing respiratory distress due to muscle weakness." },
    { text: "General Systemic Effects_Hyperkalemia leads to fatigue and chest pain. Potassium chlorate poisoning causes organ damage and death. Untreated, severe hyperkalemia can be fatal due to cardiac arrest or respiratory failure. Proper potassium management is crucial for preventing fatal outcomes." },
  ];
  const casestudiescontent = [
    { text: "Venice lagoon_Research in the Venice Lagoon, notably a 2007 study on PM2.5, revealed potassium's presence, with concentrations averaging about 99 ng/m³, primarily originating from natural marine aerosols generated by the interaction between seawater and the atmosphere. While not a primary pollutant, potassium contributes to the lagoon's particulate matter composition, alongside sulfates, nitrates, and organic carbon. The study also addressed broader environmental concerns, linking agricultural runoff to nutrient pollution, particularly nitrogen and phosphorus, leading to eutrophication within the lagoon. Industrial activities in Porto Marghera are significant contributors of potassium to the lagoon's ecosystem. Companies like Giammarco-Vetrocoke, employing potassium carbonate in carbon capture, and various chemical, petrochemical, pulp and paper, and food processing plants, release potassium-bearing effluents. These industries utilize potassium compounds in diverse manufacturing and processing procedures. Studies from 1998-2000, as part of the DRAIN project, identified canals, such as the San Giuliano Canal, as conduits for pollutants from industrial zones into the lagoon. This research underscores the necessity for continuous monitoring of air quality and nutrient dynamics in coastal ecosystems like the Venice Lagoon. Understanding both natural and anthropogenic sources of pollution is crucial for effective environmental management and preservation of such delicate ecosystems." },
    { text: "Saskatchewan, Canada_Potash mining in Saskatchewan, Canada, initiated in the 1950s, has increasingly revealed its environmental consequences, particularly in the Qu'Appelle Valley. By the 1980s, leaching of salt-rich tailings, primarily potassium chloride, into water systems raised significant concerns. This contamination manifested as heightened water salinity, eutrophication, and subsequent fish kills, disrupting the valley's delicate ecological balance. The tailings, rich in potassium, stimulate excessive algal proliferation, leading to oxygen depletion upon decomposition and creating hypoxic conditions that severely impact aquatic life. Local agriculture bears the brunt of saline irrigation water, which degrades soil quality and reduces crop yields. The fishing industry faces a decline in biodiversity and experiences mortality events due to these hypoxic conditions. While corporations like Yancoal have implemented mitigation measures, including enhanced tailings containment, advanced water treatment, and isolating the mining site from natural drainage with regular water monitoring, environmental advocacy groups remain vigilant. They voice concerns regarding the potential impact of solution mining on local water supplies and the broader Qu'Appelle watershed, advocating for caution and more stringent regulatory frameworks to address the long-term ramifications of potassium contamination."}
  ];
  const phytocontent = [
    {
      medium: "Chenopodium quinoa_soil",
      timePeriod: "Chenopodium quinoa_70 days",
      remediation: "Chenopodium quinoa_66%"
    },
    {
      medium: "Cucurbita pepo_soil",
      timePeriod: "Cucurbita pepo_15/30/45 days",
      remediation: "Cucurbita pepo_60%/70%/80%"
    },
    {
      medium: "Artemisia annua_soil",
      timePeriod: "Artemisia annua_15/30/45 days",
      remediation: "Artemisia annua_30%/40%/47.36%"
    },{
      medium: "Amaranthus dubius_soil",
      timePeriod: "Amaranthus dubius_15/30/45 days",
      remediation: "Amaranthus dubius_25%/35%/40.72%"
    },
    {
      medium: "Ipomoea aquatica_water",
      timePeriod: "Ipomoea aquatica_15/30/45 days",
      remediation: "Ipomoea aquatica_60%/70%/79.17%"
    },
    {
      medium: "Salvinia molesta_water",
      timePeriod: "Salvinia molesta_15/30 days",
      remediation: "Salvinia molesta_50%/90%"
    }
  ];
  const aboutplantcontent = [
    { 
      description: "About Salvinia molesta_Salvinia molesta, a perennial aquatic fern, exhibits a characteristic structure  that is adapted for its free-floating lifestyle. Its aerial fronds (a large leaf), arranged in triplets, transition from flat, youthful forms to increasingly folded, mature structures, reaching sizes up to 2.2 cm. These fronds possess a specialized upper surface, featuring papillae with intricate, hair-like cages that trap air, enhancing buoyancy and repelling water. The lower surface, covered in dense brown hairs, further contributes to flotation.",
      status: "Wetland Status_ OBL (Obligate Wetland Plant) - Almost always occurs in wetlands"
    }
  ];
  const commonname = [
    { text: "Chinese; rén yàn huái cài pín, rén yàn huái yè píng" },
    { text: "Dutch; Grote vlotvaren" },
    { text: "English; African payal, African pyle, Aquarium water moss, Azolla, Giant azolla, Giant salvinia, Kariba weed, Salvinia, Salvinia moss, Water fern, Water spangles, Australian azolla, butterfly fern, cats tongue, koi kandy, velvet weed, watermoss" },
    { text: "Finland; rikkakellussaniainen" },
    { text: "Germany; Lästiger büschelfarn; Schwimmfarn, Bueschelfarn, Leastiger Schwimmfarn" },
    { text: "Italy; Salvinia molesta (The genus name Salvinia honors the Italian scholar Antonio Maria Salvini (1633–1729), a professor of the Greek language at the University of Florence)" },
    { text: "Netherlands; drijfplantje" },
    { text: "Portuguese; mururé carrapatinho" },
    { text: "South Africa; Water varing" },
    { text: "Swedish; öronsimbräken" },
    { text: "Thailand; Chawk hunu" }
  ];
  const habitat = [
    {
      title: "Diverse Habitats",
      content: "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe"
    },
    {
      title: "Flood and Drought adaptability",
      content: "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe"
    },
    {
      title: "Climate Resilience",
      content: "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe"
    },
    {
      title: "Moisture preference",
      content: "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe"
    },
    {
      title: "Temperature and humidity tolerance",
      content: "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe"
    }
  ];
  const geographicaldistribution = [
      {text: "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe, particularly in countries like Spain, Italy, and France. In Italy, it is widely distributed across various regions, particularly in northern areas, where it plays a significant role in grasslands, pastures, and as a forage crop. In the Venice lagoons, it is notably adapted to saline and brackish environments, thriving in areas with periodic flooding.<br /><br /> Over time, it has spread beyond its native regions due to its adaptability and usefulness in agriculture and land management. Its introduction to North America likely occurred as a contaminant in imported meadow fescue seed before 1880, and while it was initially of minor importance in Europe, it gained prominence in the United States due to its superior growth characteristics and adaptability to diverse environmental conditions. By the late 19th century, this plant was recognized for its value as a forage grass, especially after the release of cultivars like Kentucky 31 in 1943, which became widely planted across the southern U.S. Today,"}
  ];
  const sectionphyto = [
    { title: "Title 1", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco." },
    { title: "Title 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada est quam, quis dictum ligula fringilla ut. Donec varius nisl ut lobortis dignissim. Integer tincidunt arcu erat, sit amet malesuada purus consequat eu. Nam dapibus a nunc at tincidunt. Etiam commodo, felis nec vulputate rhoncus,." },
    // Add more sections as needed
  ];
  const usessections = [
    {
      id: 'nutritional',
      title: 'NUTRITIONAL',
      header: 'This is placeholder text for title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.'
    },
    {
      id: 'medicine',
      title: 'MEDICINE',
      header: 'This is placeholder text for title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.'
    },
    {
      id: 'additional',
      title: 'ADDITIONAL',
      header: 'This is placeholder text for title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt.'
    }
  ];
  

  const handleSliderMove = (e) => {
    const container = document.getElementById('slider-container');
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
  
    if (newPosition >= 0 && newPosition <= 100) {
      document.documentElement.style.setProperty('--slider-position', `${newPosition}%`);
      setSliderPosition(newPosition);

      // For navbar
      document.body.classList.toggle('right-panel-active', newPosition < 3);
      
      // Toggle visibility based on dominant panel
      document.body.classList.toggle('white-panel-active', newPosition <= 50);
      document.body.classList.toggle('black-panel-active', newPosition > 50);

      // Custom condition for sound button
      document.body.classList.toggle('sound-panel-active', newPosition < 98);

      // Calculate rotation based on slider position
      const newRotation = (newPosition / 100) * 360;

      setRotation(newRotation);
      document.documentElement.style.setProperty('--rotation', `${newRotation}deg`);
    }
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleSliderMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleSliderMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      threshold: 0.3,
      root: null
    });

    // Observe all sections in both panels
    const sections = document.querySelectorAll(`
      [id^="about-"],
      [id^="plant-"],
      [id^="sound-"],
      [id^="common-"],
      [id^="effect-"],
      [id^="case-"],
      [id^="phytoremediation"],
      [id^="phyto-"],
      [id^="uses-"],
      [id^="origin"],
      [id^="references"]
    `);
    
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Mobile-specific behavior
    if(isMobile) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Determine which panel to activate
    const isWhitePanel = section.closest('.white-container');
    const sliderPos = isWhitePanel ? 0 : 100;
    
    // Update slider position and panel visibility
    setSliderPosition(sliderPos);
    document.documentElement.style.setProperty('--slider-position', `${sliderPos}%`);
    document.body.classList.toggle('white-panel-active', isWhitePanel);
    document.body.classList.toggle('black-panel-active', !isWhitePanel);

    // Scroll after panel transition
    setTimeout(() => {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <>
      <div id="slider-container" className="slider-container">
        <LeftPanel sections={leftpanelcontent} />
        <RightPanel sections={rightpanelcontent}/>
        <div
          className="slider-bar"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <img
            src="slider.png"
            alt="Slider"
            className="slider-image"
            style={{ 
              transform: `rotate(${rotation}deg) scale(1.7)`,
              transformOrigin: 'center center'
            }}
          />
        </div>
        <div className="scrollable-black">
          <div className={styles.scrollableContent}>
            <p>Additional scrollable content goes here...</p>
            <p>More information can be added here...</p>
            <p>Keep scrolling for more details...</p>
          </div>
        </div>
        <div className="additional-scroll-section">
          <div className={styles.additionalContent}>
            <h2>Explore More Information</h2>
            <p>Here you can add more detailed information about the topic.</p>
            <p>Include any additional resources or links for further reading.</p>
            <p>Continue scrolling to discover more insights and data.</p>
          </div>
        </div>
      </div>
      <div className="combined-section">
        <div className="nav-bar">
          {isMobile && (
            <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
          )}
          <div className={`nav-items-container ${isMobile ? 'mobile' : ''}`}>
            <div className="text-wrapper" onClick={() => handleNavClick('about-pollutant')}>Pollutant name</div>
            <div className="div" onClick={() => handleNavClick('plant-name')}>Plant name</div>
            <div className="text-wrapper-2" onClick={() => handleNavClick('sound-frequency')}>Sound frequency</div>
            <div className="text-wrapper-3" onClick={() => handleNavClick('common-names')}>Common names of Plant</div>
            <div className="text-wrapper-4" onClick={() => handleNavClick('plant-habitat')}>Plant Habitat</div>
            <div className="text-wrapper-5" onClick={() => handleNavClick('origin')}>Origin and Geographical Distribution</div>
            <p className="p" onClick={() => handleNavClick('phyto-capacity')}>Phytoremediation capacity of the Plants</p>
            <div className="text-wrapper-6" onClick={() => handleNavClick('uses-of-plant')}>Uses of plant</div>
            <div className="text-wrapper-7" onClick={() => handleNavClick('references')}>References</div>
            <div className="text-wrapper-8" onClick={() => handleNavClick('effect-on-health')}>Effect on health</div>
            <div className="text-wrapper-9" onClick={() => handleNavClick('case-study')}>Case study</div>
            <p className="text-wrapper-10" onClick={() => handleNavClick('phytoremediation')}>
              Phytoremediation of the Representative Pollutant
            </p>
          </div>
          <div className="overlap-group">
            <div className={`ellipse ${activeSection === 'about-pollutant' ? 'active' : ''}`} />
            <div className={`ellipse-2 ${activeSection === 'sound-frequency' ? 'active' : ''}`} />
            <div className={`ellipse-3 ${activeSection === 'effect-on-health' ? 'active' : ''}`} />
            <div className={`ellipse-4 ${activeSection === 'case-study' ? 'active' : ''}`} />
            <div className={`ellipse-5 ${activeSection === 'phytoremediation' ? 'active' : ''}`} />
            <div className={`ellipse-6 ${activeSection === 'plant-name' ? 'active' : ''}`} />
            <div className={`ellipse-7 ${activeSection === 'common-names' ? 'active' : ''}`} />
            <div className={`ellipse-8 ${activeSection === 'plant-habitat' ? 'active' : ''}`} />
            <div className={`ellipse-9 ${activeSection === 'origin' ? 'active' : ''}`} />
            <div className={`ellipse-10 ${activeSection === 'phyto-capacity' ? 'active' : ''}`} />
            <div className={`ellipse-11 ${activeSection === 'uses-of-plant' ? 'active' : ''}`} />
            <div className={`ellipse-12 ${activeSection === 'references' ? 'active' : ''}`} />
          </div>
        </div>
        
        <div className="content-sections">
          <div className="bottom-section1" id="about-pollutant">
            <AboutPollutantSection  sections={aboutpollutantcontent} />
          </div>
          <div className="bottom-section2" id="sound-frequency">
              <SoundFrequency sections={sinewavefreq}/>
          </div>
          <div className="bottom-section2" id="effect-on-health">
            <Box sections={effectonhealthcontent}/> {/** sizing */}
          </div>
          <div className="bottom-section3" id="case-study">
            <CaseStudies sections={casestudiescontent}/> {/** text overlap */}
          </div>
          <div className="bottom-section4" id="phytoremediation">
            <Phyto sections={phytocontent}/> {/** time period overlap */}
          </div>
          <div className="white-container">
            <div className="bottom-section5" id="plant-name">
              <div className="content-container">
                <AboutPlant sections={aboutplantcontent}/>
              </div>
            </div>
            <div className="bottom-section6" id="common-names">
              <CommonNames sections={commonname}/>
            </div>
            <div className="bottom-section7" id="plant-habitat">
              <PlantHabitat sections={habitat}/>
            </div>
            <div className="bottom-section8" id="origin">
              <Origin sections={geographicaldistribution}/>
            </div>
            <div className="bottom-section9" id="phyto-capacity">
              <PhytoCapacity sections={sectionphyto}/>
            </div>
            <div className="bottom-section10" id="uses-of-plant">
              <UsesOfPlant sections={usessections}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollutantPage;