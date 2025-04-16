import React, { useState, useEffect, useRef} from 'react';
import './pollutantPage.css';
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


const PollutantPage = (categorizedData) => {
  let data = categorizedData?.undefined || [];
  console.log("this is the data", data);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(180);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [leftPanelLoaded, setLeftPanelLoaded] = useState(false); // Track left panel load
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false); // Track right panel load
  
  // Refs for panels to measure their heights
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const lastPositionRef = useRef(sliderPosition); // Add ref to track latest position

  // Pollutant categorization by waste type
  const pollutantCategories = {
    1: ['potassium', 'simazine', 'imidacloprid', 'plantago', 'atrazine', 'glyphosate', 'phosphorus', 'nitrates'],
    2: ['mercury', 'copper', 'lead', 'chromium', 'cadmium', 'thalium', 'selenium', 'nickel', 'arsenic', 'zinc', 'iron', 'manganese', 'aluminum'],
    3: ['thorium', 'strontium'],
    4: ['benzene', 'crude-oil', 'petrol', 'spiralis', 'diesel', 'sulphide', 'ammonium', 'phenol', 'organic-matter', 'estrogen', 'phthalate', 'fragrance', 'diclofenac', 'bht']
  };

  // Mapping of waste types to corresponding SVG icons
  const wasteTypeToIcon = {
    1: 'agriculture-waste-icon.svg',
    2: 'heavy-metal-waste-icon.svg',
    3: 'radioactive-waste-icon.svg',
    4: 'sewage-waste-icon.svg'
  };
  
  const pollutantWasteTypeMapping = {
    // Type 1: Agricultural/Inorganic Pollutants
    'potassium': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'simazine': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'imidacloprid': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'plantago': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'atrazine': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'glyphosate': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'phosphorus': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },
    'nitrates': { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' },

    // Type 2: Heavy Metals
    'mercury': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'copper': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'lead': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'chromium': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'cadmium': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'thalium': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'selenium': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'nickel': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'arsenic': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'zinc': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'iron': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'manganese': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'aluminum': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },

    // Type 3: Radioactive Elements
    'thorium': { typeOfWaste: 3, atomImage: 'radioactive-waste-icon.svg' },
    'strontium': { typeOfWaste: 3, atomImage: 'radioactive-waste-icon.svg' },

    // Type 4: Organic Pollutants
    'benzene': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'crude-oil': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'petrol': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'spiralis': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'diesel': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'sulphide': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'ammonium': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'phenol': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'organic-matter': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'estrogen': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'phthalate': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'fragrance': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'diclofenac': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' },
    'bht': { typeOfWaste: 4, atomImage: 'sewage-waste-icon.svg' }
  };

  const leftpanelcontent = [
    { 
      pollutantName: "Potassium",
      ...pollutantWasteTypeMapping['potassium'],
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
      imgUrl: "",
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
      pollutantName: leftpanelcontent[0].pollutantName,
      enthalpy: "90 KJ/mol",
      soundfrequency: "22.56 Hz",
      wavefrequency: -200.5
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
      remediation: "Chenopodium quinoa_66"
    },
    {
      medium: "Cucurbita pepo_soil",
      timePeriod: "Cucurbita pepo_15/30/45",
      remediation: "Cucurbita pepo_60/70/80"
    },
    {
      medium: "Artemisia annua_soil",
      timePeriod: "Artemisia annua_15/30/45",
      remediation: "Artemisia annua_30/40/47.36"
    },{
      medium: "Amaranthus dubius_soil",
      timePeriod: "Amaranthus dubius_15/30/45",
      remediation: "Amaranthus dubius_25/35/40.72"
    },
    {
      medium: "Ipomoea aquatica_water",
      timePeriod: "Ipomoea aquatica_15/30/45",
      remediation: "Ipomoea aquatica_60/70/79.17"
    },
    {
      medium: "Salvinia molesta_water",
      timePeriod: "Salvinia molesta_15/30",
      remediation: "Salvinia molesta_50/90"
    }
  ];
  const aboutplantcontent = [
    { 
      plant_name: rightpanelcontent[0].plantNameSplit,
      description: "About Salvinia molesta_Salvinia molesta, a perennial aquatic fern, exhibits a characteristic structure  that is adapted for its free-floating lifestyle. Its aerial fronds (a large leaf), arranged in triplets, transition from flat, youthful forms to increasingly folded, mature structures, reaching sizes up to 2.2 cm. These fronds possess a specialized upper surface, featuring papillae with intricate, hair-like cages that trap air, enhancing buoyancy and repelling water. The lower surface, covered in dense brown hairs, further contributes to flotation.Beneath the surface, highly divided, feathery fronds act as pseudo-roots, anchoring the plant and facilitating nutrient absorption. These submerged fronds extend significantly, ranging from 2 to 50 cm. At the bottom, rhizomes, which are horizontal stems beneath the water surface , propagate vegetatively through fragmentation, allowing the fern to rapidly colonize aquatic environments and form dense mats. \nMature plants produce sporocarps, small, egg-shaped structures containing infertile microspores and megaspores. These sporocarps, covered in soft hairs, are clustered along the submerged leaves. Lacking sexual reproduction, Salvinia molesta relies entirely on asexual propagation through fragmentation. This strategy enables rapid dispersal and the formation of extensive, floating mats, which can significantly impact aquatic ecosystems.",
      status: "Wetland Status_ OBL (Obligate Wetland Plant) - Almost always occurs in wetlands"
    }
  ];
  const commonname = [
    { plantName: rightpanelcontent[0].plantNameSplit },
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
    { plantName: rightpanelcontent[0].plantNameSplit },
    {
      title: "Diverse Habitats",
      content: "Salvinia molesta flourishes in diverse freshwater settings, preferring still or sluggish waters. It establishes itself in sheltered areas like small bays, inlets along irregular shorelines, and the gentle flow of tributary streams. Its presence is common in lakes, wetlands, man-made irrigation channels, ditches, ponds, and canals. It colonizes disturbed environments, including rice paddies, flood control canals, artificial reservoirs, swamps, drainage channels, and the edges of rivers. This adaptability is further highlighted by its tolerance of fluctuating water levels, enabling it to survive in seasonally waterlogged soils and even thrive on nutrient-rich mud banks composed of silt and clay."
    },
    {
      title: "Light, salinity and pH",
      content: "Salvinia molesta flourishes in warm, nutrient-rich freshwater, demonstrating a strong preference for environments high in nitrogen and phosphorus, and a slightly acidic to neutral pH between 4.5 and 8.5. Requiring ample sunlight for rapid growth, this aquatic fern has adapted to low-oxygen conditions through specialized leaf structures that enhance gas exchange. While strictly a freshwater species, it is highly intolerant of salinity, succumbing quickly to seawater, though it may endure brief exposure to low salt concentrations. These combined factors contribute to its rapid proliferation and invasive potential in suitable freshwater ecosystems."
    },
    {
      title: "Temperature and Humidity",
      content: "Salvinia molesta requires high humidity for survival and propagation. Specifically, humidity levels above 60% are necessary to prevent desiccation (removal of moisture). The plant thrives within a temperature range of 20 to 30°C (68–86°F), with optimal growth occurring when relative humidity is between 70% and 90%. It is important to note that Salvinia molesta is intolerant of extreme temperatures, and will not survive below 10°C or above 40°C."
    },
    {
      title: "Climate Resilience",
      content: "Beyond its primary aquatic habitat, Salvinia molesta exhibits remarkable adaptability, extending its range to semi-terrestrial environments. It has been observed thriving among emergent undergrowth and around trees on flooded shorelines, demonstrating its ability to exploit these transitional zones. Notably, the plant can even survive terrestrially in consistently high-humidity areas, such as the mist-laden environment at the base of Victoria Falls. Moreover, its persistence on moist, waterlogged soils further emphasizes its resilience and capacity to thrive in a wider array of ecological niches than typically associated with a purely aquatic species."
    }
  ];
  const geographicaldistribution = [
      {text: "Originating from southeastern Brazil, in the subtropical zone between latitudes 24°050 S and 32°050 S at elevations up to 900 m, Salvinia molesta has become a globally disruptive invasive aquatic fern, spreading rapidly since the mid-20th century. Initially introduced as an ornamental plant and for water treatment, it has since colonized diverse aquatic ecosystems worldwide, causing significant ecological disruption. Its spread accelerated from the 1950s, reaching numerous African countries. By the 1970s and 1980s, it had invaded Cameroon, the Democratic Republic of the Congo, Nigeria, and South Africa, and later spread to Ghana and Kenya, among others. In the Indian subcontinent and Southeast Asia, it is prevalent in India, and is considered an invasive species in Indonesia, Malaysia, and Israel, and has also been observed in Japan. In Europe, it is found in Denmark, France, Germany, and Spain. It is an invasive species in Austria, Belgium, and Italy, notably in Tuscany and near Rome, where it displaces native species and alters ecosystems. The plant is able to thrive in tropical, subtropical, and warm temperate regions, including Australia, New Zealand, the southern United States, and various Pacific islands."}
  ];
  const sectionphyto = [
    { type: 'intro', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque.' },
    { plantName: rightpanelcontent[0].plantNameSplit },
    { text: "Potassium_Salvinia molesta effectively concentrates potassium in its roots and fronds, enabling phytoremediation of polluted waters. Studies from the Cochin University of Science and Technology show dried plants contain 2.8 g/kg potassium, with removal rates of 50-90% within 15-30 days, dependent on initial potassium levels, growth period, environment, and biomass." },
    { text: "Lead _Salvinia molesta demonstrates significant lead (Pb) removal capabilities in polluted water. Studies in Patna,India, reported 85% Pb accumulation, and a Tamil Nadu study documented a 35.3% reduction in Pb from industrial effluent (2.974 ppm to 1.924 ppm). A study from the Department of Biological Sciences, Faculty of Science, Ahmadu Bello University, Zaria, Nigeria, observed increasing Pb uptake over 18 days, reaching 0.087% of dry weight without visible plant damage, suggesting a unique stress response. These findings highlight Salvinia molesta's potential for Pb phytoremediation, even at varying initial concentrations." },
    { text: "Mercury_A study conducted by the Ganga Devi Mahila College (Magadh University), Kankarbagh in Patna, India, further explored Salvinia molesta's phytoremediation potential by assessing its ability to remove mercury (Hg) from polluted water. The research indicated that when exposed to a 100% concentration of Hg in the experimental solution, Salvinia molesta accumulated up to 74% of the mercury in 15 days within its plant tissues." },
    { text: "Copper_Salvinia molesta effectively removes copper (Cu) from polluted environments. Studies show it accumulates Cu without visible damage, even at high concentrations. A University of Vellore, India, study revealed an 86.4% increase of Cu within plant tissues over 15 days, while a study from University of Kelaniya, Srilanka, demonstrated a 32.6% Cu reduction in sewage sludge over 28 days. These findings confirm Salvinia molesta's capacity for both Cu bioaccumulation and removal, making it a promising phytoremediation agent." },
    { text: "Cadmium_Salvinia molesta demonstrates cadmium (Cd) removal capabilities, though its tolerance varies with concentration. Pondicherry University research found survival at 1 ppm Cd for 16 days, but limited growth at higher concentrations (10 ppm for a week, 100 ppm for 5 days). A Vellore Institute of Technology study showed a 92.83% Cd reduction from industrial effluent, decreasing from 0.251 ppm to 0.018 ppm. This indicates effective Cd absorption, particularly at lower concentrations, but also highlights Salvinia molesta's sensitivity to elevated Cd levels." },
    { text: "Chromium_Salvinia molesta exhibits varying chromium (Cr) tolerance. Pondicherry University studies showed healthy growth for 45 days at 1 ppm Cr, 25 days at 10 ppm, but immediate decay at 100 ppm. A Vellore Institute of Technology study demonstrated a 47.95% Cr reduction from industrial effluent, decreasing from 2.021 ppm to 1.052 ppm. This indicates effective Cr removal at lower concentrations, but highlights sensitivity to higher Cr levels." },
    { text: "Zinc_Salvinia molesta demonstrates a strong capacity for zinc (Zn) accumulation and removal. Experiments show it concentrates Zinc in dry tissues 10,000-fold compared to water, indicating purification potential. Studies in Loyola College, Tamil Nadu confirm significant Zn reduction in wastewater after 10 days. Research done by  Centre for Water Resources Development & Management, Kunnamangalam, Kerala published in Resources and Conservation further highlights its efficiency, with 50% Zn removal in 15 days and 90% in 30 days, showcasing its ability to effectively absorb and cleanse Zn from contaminated water." },
    { text: "Other heavy metals_Salvinia molesta demonstrates effective manganese (Mn) and iron (Fe) accumulation. A 2016 VIT University study revealed Salvinia molesta concentrates Mn in dry tissues five-fold compared to water, using Atomic Absorption Spectrophotometry. Additionally, University of Kelaniy, Sri Lanaka, research showed a 26.6% Fe reduction in sewage sludge over 28 days. These findings, combined with its high growth rate and metal tolerance, solidify Salvinia molesta as a potent heavy metal hyperaccumulator, suitable for phytoremediation." },
    { text: "Nickel_Salvinia molesta demonstrates effective manganese (Mn) and iron (Fe) accumulation. A 2016 VIT University study revealed Salvinia molesta concentrates Mn in dry tissues five-fold compared to water, using Atomic Absorption Spectrophotometry. Additionally, University of Kelaniy, Sri Lanaka, research showed a 26.6% Fe reduction in sewage sludge over 28 days. These findings, combined with its high growth rate and metal tolerance, solidify Salvinia molesta as a potent heavy metal hyperaccumulator, suitable for phytoremediation." },
    { text: "Micronutrients_Salvinia molesta exhibits strong nitrogen (N) and phosphorus (P) phytoremediation capabilities. Studies show N content ranges from 0.6% to 4.0% of dry weight, with uptake rates up to 8 mg per g of dry weight/day, or 6,000 kg of nitrogen per hectare/year. Australian sewage lagoons recorded 1,580 kg per hectare/year removal. While S. molesta phosphorus uptake data is limited, Salvinia minima and Salvinia auriculata studies indicate phosphorus concentration enhances growth and uptake, respectively, suggesting S. molesta's potential to combat eutrophication." },
  ];

  // Optimized data structure for UsesOfPlant component
  const usesSectionsData = {
    plantName: rightpanelcontent[0].plantNameSplit, // Define plant name once
    sections: [
      {
        id: 'nutritional',
        title: 'NUTRITIONAL',
        flavourtext: 'Salvinia molesta is not suitable for human consumption due to its poor nutritional value and potential toxicity.',
        items: [
          {
            header: 'The edibility rating for Salvinia molesta is unavailable.',
            text: 'Its nutritional value is poor, lacking significant macronutrients like carbohydrates, proteins, and fats. While containing minerals, it poses toxicity risks due to heavy metal accumulation from its phytoremediation abilities. High lignin and tannin content interfere with nutrient absorption. Furthermore, aquatic environments expose it to microbial contamination. Therefore, Salvinia molesta is deemed unsuitable for human consumption, and its primary applications lie in environmental remediation, animal feed research, and biomass production.'
          }
        ]
      },
      {
        id: 'medicine',
        title: 'MEDICINE',
        flavourtext: 'Salvinia molesta exhibits promising antibacterial properties against certain harmful bacteria.', // Common flavour text for medicine group
        items: [
          {
            header: 'Antimicrobial',
            text: 'A 2014 Indian study from International Journal of PharmTech Research revealed Salvinia molestas antibacterial properties were attributed to its secondary metabolites (product of metabolism). Methanol and chloroform extracts demonstrated 7-15% antimicrobial activity against Pseudomonas aeruginosa, a bacterium responsible for various infections, including urinary tract infections, respiratory infections and other infections, and also showed excellent potential against Aeromonas hydrophila, bacteria that causes gastroenteritis or infectious diarrhea which is the inflammation of the stomach and small intestine.'
          },
          {
            header: 'Respiratory',
            text: 'Salvinia molesta roots are used to address respiratory issues such as cough, phlegm, and inflammation. Traditional Chinese medicine utilizes a decoction to address such ailments. Prepared by boiling 10g of the dried roots in 500ml of water for 15-20 minutes, this remedy is sometimes enhanced with ginger for increased anti-inflammatory effects and honey for soothing properties. The strained, warm liquid is then consumed twice daily.'
          },
          {
            header: 'Dermatitis',
            text: 'In Malay and Indonesian traditional medicine, Salvinia molesta leaves offer a natural remedy. Fresh leaves are washed, crushed into a paste, and sometimes mixed with coconut oil or turmeric for enhanced effects. This paste is applied to affected areas for 15-30 minutes, then rinsed. Twice-daily application aims to reduce redness, itching, and inflammation, promoting skin healing. This traditional use reflects the plants potential soothing and antimicrobial properties.'
          },
          {
            header: 'Anti-cancer activity',
            text: 'A 2013 study at Stephen F. Austin State University found that Salvinia molesta extracts, specifically abietane diterpenes, could selectively stop cancer cell growth. These compounds were toxic to tumor cells but left healthy cells unharmed, showing potential for targeted cancer treatment.'
          },
          {
            header: 'Wound healing',
            text: 'A 2015 IIT Varanasi study published in the Journal of Photochemistry and Photobiology B: Biology demonstrated the green synthesis of silver nanoparticles using Salvinia molesta extract. This eco-friendly method converts silver ions into nanoparticles, offering potential applications in wound healing, antibacterial coatings, and drug delivery.'
          },
          {
            header: 'Antioxidant', // Corrected typo
            text: 'A 2014 CSIR (Council of Scientific and Industrial Research) study, documented in Philippine Medicinal Plants, revealed Salvinia molesta extracts (acetone/methanol) possess high antioxidant activity due to phenolic compounds, primarily naringenin and myricetin.This antioxidant capacity may combat oxidative stress, inflammation, and chronic diseases, potentially supporting liver health, metabolism, neuroprotection, and cardiovascular function.'
          }
        ]
      },
      {
        id: 'additional',
        title: 'ADDITIONAL',
        flavourtext: 'Salvinia molesta has various other uses beyond medicinal applications.', // Added a generic flavourtext for 'additional'
        items: [
          {
            header: 'Paper industry raw material',
            text: 'A study from the Bulletin of the National Institute of Ecology, India, suggests S. molesta can be processed into low-grade paper products like kraft, newsprint, and tissue. It can be utilized alone or in conjunction with agricultural byproducts such as rice straw or waste textile cuttings, offering a sustainable alternative to traditional pulp sources.'
          },
          {
            header: 'Supplementary animal feed', // Corrected typo
            text: 'While not suitable as a sole feed source due to its high crude ash and tannin content, which can hinder digestibility, S. molesta can supplement the diets of various animals, including ducks, pigs, geese, and fish. It provides a source of nutrients and can be particularly useful in regions with limited feed resources.'
          },
          {
            header: 'Biofuel Production via Anaerobic Digestion',
            text: 'Research from the Indian Institutes of Technology (IIT) and Indian Agricultural Research Institute (IARI) demonstrates the potential for S. molesta to generate biogas through anaerobic digestion, yielding methane, a valuable energy source. Combining it with other aquatic plants like Eichhornia crassipes can further enhance biogas production.'
          },
          {
            header: 'Ornamental Horticulture and Invasive Spread', // Removed duplicate entry
            text: 'Its aesthetic qualities have made S. molesta popular in botanical gardens and aquariums. However, this widespread use has inadvertently contributed to its classification as an invasive species in many regions'
          },
          {
            header: 'Agricultural Fertilizer and Soil Amendment',
            text: 'S. molesta can be composted or used as mulch, providing a nutrient-rich soil amendment. Its use as mulch is particularly beneficial in dry regions and for citrus crops, enhancing soil fertility and moisture retention.'
          },
          {
            header: 'Aquaculture Enhancement and Fish Feed Supplement',
            text: 'In aquaculture, S. molesta can serve as a partial feed source for fish species like Nile tilapia, potentially improving growth performance. It also fosters the growth of invertebrate larvae, a valuable food source for prawns and fish.'
          },
          {
            header: 'Ecological Control via Biological Agents',
            text: 'The introduction of specific weevil species, natural predators of S. molesta, offers a biological control method to manage its rapid growth and prevent ecological imbalances. This approach helps maintain biodiversity and ecosystem health.'
          }
        ]
      }
    ]
  };

  // Add state to track dragging
  const [isDragging, setIsDragging] = useState(false);

  // Central function to update slider position and related effects
  const updateSliderPosition = (newPosition) => {
    const clampedPosition = Math.max(0, Math.min(100, newPosition));

    document.documentElement.style.setProperty('--slider-position', `${clampedPosition}%`);
    setSliderPosition(clampedPosition);

    // Toggle visibility and other classes based on dominant panel
    // Ensures navbar and other styles react correctly to the final snapped position
    document.body.classList.toggle('right-panel-active', clampedPosition < 3); // Snap target 2 is < 3
    document.body.classList.toggle('white-panel-active', clampedPosition < 50); // White active only if strictly LESS than 50
    document.body.classList.toggle('black-panel-active', clampedPosition >= 50); // Black active if GREATER than or EQUAL to 50
    document.body.classList.toggle('sound-panel-active', clampedPosition < 98); // Snap targets 2, 50 are < 98

    // Calculate rotation based on slider position
    const newRotation = (clampedPosition / 100) * 360;
    setRotation(newRotation);
    document.documentElement.style.setProperty('--rotation', `${newRotation}deg`);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    lastPositionRef.current = sliderPosition; // Ensure ref is synced on initial click
    // Optional: Could temporarily disable transitions during drag if needed for performance
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = document.getElementById('slider-container');
    if (!container) return; // Safety check
    const rect = container.getBoundingClientRect();
    let newPosition = ((e.clientX - rect.left) / rect.width) * 100;

    // Ensure position stays within bounds during drag
    newPosition = Math.max(0, Math.min(100, newPosition));

    // Update position using the refactored function
    updateSliderPosition(newPosition);
    // Update the ref synchronously with the latest calculated position
    lastPositionRef.current = newPosition;
  };

  const handleMouseUp = () => {
    if (!isDragging) return; // Safety check
    setIsDragging(false);

    // --- Snap Logic ---
    // Read the latest position from the ref, not state
    const currentPosition = lastPositionRef.current;
    const thresholdLeft = 25; // Midway between 2 and 50
    const thresholdRight = 75; // Midway between 50 and 98
    const snapLeft = 1;
    const snapCenter = 50;
    const snapRight = 99;
    let snapTarget;

    if (currentPosition <= thresholdLeft) {
      snapTarget = snapLeft;
    } else if (currentPosition > thresholdRight) {
      snapTarget = snapRight;
    } else {
      snapTarget = snapCenter;
    }
    // --- End Snap Logic ---

    // Update to the snapped position using the refactored function
    // The CSS transition will handle the smooth animation
    updateSliderPosition(snapTarget);
    // Optional: Re-enable transitions if they were disabled in handleMouseDown
  };

  // Function to update container height based on panel heights
  const updateContainerHeight = () => {
    // Ensure refs are available before proceeding
    if (!leftPanelRef.current || !rightPanelRef.current || !sliderContainerRef.current) {
      console.log("Height update skipped: Refs not ready.");
      return;
    }

    // Calculate heights directly now that we know components are loaded
    const leftPanelHeight = leftPanelRef.current.scrollHeight;
    const rightPanelHeight = rightPanelRef.current.scrollHeight;

    // Use the height of the taller panel
    const maxHeight = Math.max(leftPanelHeight, rightPanelHeight);

    // Add a minimum height fallback if calculation results in 0 or very small value
    const finalHeight = maxHeight > 50 ? `${maxHeight}px` : '78vw'; // Use '78vw' or another sensible default

    setContainerHeight(finalHeight);

    console.log(`Left panel height: ${leftPanelHeight}px, Right panel height: ${rightPanelHeight}px, Using: ${finalHeight}`);
  };

  // Effect to update height when both panels signal loaded state
  useEffect(() => {
    if (leftPanelLoaded && rightPanelLoaded) {
      console.log("Both panels loaded, updating container height.");
      // Use requestAnimationFrame to wait for the next browser paint after state updates
      requestAnimationFrame(() => {
         // A small delay can still be helpful for complex layouts to fully settle
        setTimeout(updateContainerHeight, 100);
      });
    }
  }, [leftPanelLoaded, rightPanelLoaded]); // Rerun when load states change

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    // Clean up on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    // Set the initial rotation CSS variable directly on mount
    document.documentElement.style.setProperty('--rotation', `180deg`);

    // Update container height on window resize
    window.addEventListener('resize', updateContainerHeight);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []); // Initial setup effect, height update logic moved

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Find the first entry that is currently intersecting
      const intersectingEntry = entries.find(entry => entry.isIntersecting);

      // If an intersecting entry is found, update the active section
      if (intersectingEntry) {
        setActiveSection(intersectingEntry.target.id);
      }
      // Optional: If no entry is intersecting, you might want to clear
      // the active section or keep the last active one, depending on desired UX.
      // Example: else if (entries.some(entry => !entry.isIntersecting)) {
      //   // Logic if elements are leaving viewport but none are entering
      // }

    }, {
      // Keep the lower threshold
      threshold: 0.1,
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

// Replace the current phyto section scroll effect with this code
useEffect(() => {
  if (activeSection === 'phytoremediation') {
    const section = document.getElementById('phytoremediation');
    if (!section) return;
    
    // Create visual indicator
    const indicator = document.createElement('div');
    indicator.className = 'phyto-scroll-indicator';
    indicator.innerHTML = `
      <div class="indicator-arrow">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="indicator-text">Continue to Plant Details</div>
    `;
    section.appendChild(indicator);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .phyto-scroll-indicator {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(70px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s;
        opacity: 0;
        z-index: 100;
        pointer-events: none;
      }
      
      .phyto-scroll-indicator.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      
      .indicator-arrow {
        margin-bottom: 5px;
        animation: pulse 1.5s infinite;
      }
      
      .indicator-text {
        font-size: 14px;
        white-space: nowrap;
      }
      
      @keyframes pulse {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(5px); }
      }
      
      .transition-flash {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .transition-flash.active {
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
    
    // Add transition flash element
    const flash = document.createElement('div');
    flash.className = 'transition-flash';
    document.body.appendChild(flash);
    
    let isTransitioning = false;
    let scrollTriggerCount = 0;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const handleScroll = () => {
      if (isTransitioning) return;
      
      const rect = section.getBoundingClientRect();
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollingDown = currentScrollTop > lastScrollTop;
      lastScrollTop = currentScrollTop;
      
      // Distance from bottom of section to bottom of viewport
      const distanceToBottom = rect.bottom - window.innerHeight;
      
      // Show indicator when approaching bottom
      if (distanceToBottom < 100 && scrollingDown) {
        indicator.classList.add('visible');
        
        // If very close to the bottom, increment the trigger counter
        if (distanceToBottom < 20) {
          scrollTriggerCount++;
          
          // If user keeps scrolling at the bottom, trigger transition
          if (scrollTriggerCount > 2 || distanceToBottom <= 0) {
            triggerTransition();
          }
        }
      } else {
        // Hide indicator when scrolling up or away from bottom
        indicator.classList.remove('visible');
        scrollTriggerCount = Math.max(0, scrollTriggerCount - 1);
      }
    };
    
    const handleWheel = (e) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }
      
      const rect = section.getBoundingClientRect();
      const distanceToBottom = rect.bottom - window.innerHeight;
      
      // If scrolling down forcefully while near the bottom
      if (e.deltaY > 30 && distanceToBottom < 50) {
        scrollTriggerCount++;
        
        // Trigger transition on forceful scroll
        if (scrollTriggerCount > 1 || e.deltaY > 60) {
          triggerTransition();
          e.preventDefault();
        }
      }
    };
    
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }
      
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchY;
      const rect = section.getBoundingClientRect();
      const distanceToBottom = rect.bottom - window.innerHeight;
      
      // If swiping down near the bottom
      if (touchDiff > 20 && distanceToBottom < 50) {
        scrollTriggerCount++;
        
        // Trigger on strong swipe
        if (scrollTriggerCount > 1 || touchDiff > 50) {
          triggerTransition();
          e.preventDefault();
        }
      }
    };
    
    const triggerTransition = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      // Show flash effect
      flash.classList.add('active');
      
      // Navigate after a short delay
      setTimeout(() => {
        handleNavClick('plant-name');
        
        // Hide flash and reset when transition complete
        setTimeout(() => {
          flash.classList.remove('active');
          isTransitioning = false;
          scrollTriggerCount = 0;
        }, 300);
      }, 200);
    };
    
    // Add all event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      // Clean up
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (indicator.parentNode) indicator.remove();
      if (style.parentNode) style.remove();
      if (flash.parentNode) flash.remove();
    };
  }
}, [activeSection]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      updateContainerHeight();
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
      setMenuOpen(false); // Close mobile menu on click
      return;
    }

    // --- REVISED DESKTOP LOGIC ---
    // Determine which panel the section belongs to
    const isInRightPanel = section.closest('.white-container') !== null;

    // Set the target snap position based on the panel
    const targetSliderPos = isInRightPanel ? 1 : 99;

    // Get current scroll position and target section position
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const targetRect = section.getBoundingClientRect();
    const targetPositionY = targetRect.top + window.scrollY;
    
    // Determine if we're scrolling up or down
    const scrollingDown = targetPositionY > currentScroll;

    // Update slider position 
    updateSliderPosition(targetSliderPos);
    lastPositionRef.current = targetSliderPos;

    // Use instant scroll for upward movement, smooth scroll for downward
    setTimeout(() => {
      section.scrollIntoView({
        behavior: scrollingDown ? 'smooth' : 'auto', // Instant for upward scrolling
        block: 'start'
      });
    }, 50);
  };

  return (
    <>
      <div 
        id="slider-container" 
        className="slider-container"
        ref={sliderContainerRef}
        style={{ height: containerHeight }}
      >
        <div ref={leftPanelRef}>
          <LeftPanel sections={leftpanelcontent} onLoad={() => setLeftPanelLoaded(true)} />
        </div>
        <div ref={rightPanelRef}>
          <RightPanel sections={rightpanelcontent} onLoad={() => setRightPanelLoaded(true)} />
        </div>
        <div
          className="slider-bar"
          style={{ left: `${sliderPosition}%`, height: `calc(${containerHeight} + 57%)` }}
          onMouseDown={handleMouseDown}
        >
          <img
            src="slider.png"
            alt="Slider"
            className="slider-image"
          />
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
            <div className="text-wrapper" onClick={() => handleNavClick('about-pollutant')}>{leftpanelcontent[0].pollutantName}</div>
            <div className="div" onClick={() => handleNavClick('plant-name')}>{rightpanelcontent[0].plantNameSplit}</div>
            <div className="text-wrapper-2" onClick={() => handleNavClick('sound-frequency')}>Sound frequency</div>
            <div className="text-wrapper-3" onClick={() => handleNavClick('common-names')}>Common names of {rightpanelcontent[0].plantNameSplit}</div>
            <div className="text-wrapper-4" onClick={() => handleNavClick('plant-habitat')}>{rightpanelcontent[0].plantNameSplit}'s Habitat</div>
            <div className="text-wrapper-5" onClick={() => handleNavClick('origin')}>Origin and Geographical Distribution</div>
            <p className="p" onClick={() => handleNavClick('phyto-capacity')}>Phytoremediation capacity of {rightpanelcontent[0].plantNameSplit}</p>
            <div className="text-wrapper-6" onClick={() => handleNavClick('uses-of-plant')}>Uses of {rightpanelcontent[0].plantNameSplit}</div>
            <div className="text-wrapper-7" onClick={() => handleNavClick('references')}>Bibliography</div>
            <div className="text-wrapper-8" onClick={() => handleNavClick('effect-on-health')}>Effect on health</div>
            <div className="text-wrapper-9" onClick={() => handleNavClick('case-study')}>Case study</div>
            <p className="text-wrapper-10" onClick={() => handleNavClick('phytoremediation')}>
              Phytoremediation of {leftpanelcontent[0].pollutantName}
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
          <div className="sound-frequency-section" id="sound-frequency">
              <SoundFrequency sections={sinewavefreq}/>
          </div>
          <div className="effect-on-health-section" id="effect-on-health">
            <Box sections={effectonhealthcontent}/> {/** sizing */}
          </div>
          <div className="bottom-section3" id="case-study">
            <CaseStudies sections={casestudiescontent}/> {/** text overlap */}
          </div>
          <div className="bottom-section4" id="phytoremediation">
            <Phyto sections={phytocontent} pollutantName={leftpanelcontent[0].pollutantName}/> {/** time period overlap */}
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
              <UsesOfPlant sectionsData={usesSectionsData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollutantPage;