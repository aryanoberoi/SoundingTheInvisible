import React, { useState, useEffect, useRef } from "react";
import "./pollutantPage.css";
import { Box } from "./PollutantPage/Body";
import { CaseStudies } from "./PollutantPage/CaseStudies";
import { Phyto } from "./PollutantPage/Phyto";
import LeftPanel from "./PollutantPage/LeftPanel";
import RightPanel from "./PollutantPage/RightPanel";
import { AboutPlant } from "./PollutantPage/AboutPlant";
import { CommonNames } from "./PollutantPage/CommonNames";
import { PlantHabitat } from "./PollutantPage/PlantHabitat";
import { Origin } from "./PollutantPage/Origin";
import { UsesOfPlant } from "./PollutantPage/UsesOfPlant";
import { PhytoCapacity } from "./PollutantPage/PhytoCapacity";
import { AboutPollutantSection } from "./PollutantPage/AboutPollutant";
import { SoundFrequency } from "./PollutantPage/SoundFrequency";
import SoundToggle from "./SoundToggle"; // Sound button
import { useParams } from "react-router-dom";
import { Drawer, styled } from "@mui/material";
const PollutantPage = ({ categorizedData }) => {
  //this was hell to make
  const { customName } = useParams();
  const allRows = Object.values(categorizedData).flat();
  console.log("All Rows:", allRows);
  console.log("Custom Name:", customName);
  const matchedRow =
    allRows.find((row) => {
      return row["id"].trim().toLowerCase() === customName.trim().toLowerCase();
    }) || {};

  console.log("Matched Row:", matchedRow); // Verify match clearly again
  console.log("Pollutant Name:", matchedRow["Pollutantname_split"]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(180);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState("100vh");
  const [leftPanelLoaded, setLeftPanelLoaded] = useState(false); // Track left panel load
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false); // Track right panel load
  const [state, setState] = useState(false);

  // Add a resize observer ref
  const resizeObserverRef = useRef(null);

  // Refs for panels to measure their heights
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const sliderBarRef = useRef(null); // Add this new ref
  const lastPositionRef = useRef(sliderPosition); // Add ref to track latest position
  const navBarRef = useRef(null); // New ref for implementing fallback sticky behavior

  // Pollutant categorization by waste type
  const pollutantCategories = {
    1: [
      "potassium",
      "simazine",
      "imidacloprid",
      "plantago",
      "atrazine",
      "glyphosate",
      "phosphorus",
      "nitrates",
    ],
    2: [
      "mercury",
      "copper",
      "lead",
      "chromium",
      "cadmium",
      "thallium",
      "selenium",
      "nickel",
      "arsenic",
      "zinc",
      "iron",
      "manganese",
      "aluminum",
    ],
    3: ["thorium", "strontium"],
    4: [
      "benzene",
      "crude-oil",
      "petrol",
      "spiralis",
      "diesel",
      "sulphide",
      "ammonium",
      "phenol",
      "organic-matter",
      "estrogen",
      "phthalate",
      "fragrance",
      "diclofenac",
      "bht",
    ],
  };

  // Mapping of waste types to corresponding SVG icons
  const wasteTypeToIcon = {
    1: "agriculture-waste-icon.svg",
    2: "heavy-metal-waste-icon.svg",
    3: "radioactive-waste-icon.svg",
    4: "sewage-waste-icon.svg",
  };

  const pollutantWasteTypeMapping = {
    // Type 1: Agricultural/Inorganic Pollutants
    potassium: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    simazine: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    imidacloprid: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    plantago: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    atrazine: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    glyphosate: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    phosphorus: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },
    nitrates: { typeOfWaste: 1, atomImage: "agriculture-waste-icon.svg" },

    // Type 2: Heavy Metals
    mercury: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    copper: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    lead: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    chromium: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    cadmium: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    thalium: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    thallium: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    "Thallium ": { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    selenium: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    nickel: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    arsenic: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    zinc: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    iron: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    manganese: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },
    aluminum: { typeOfWaste: 2, atomImage: "heavy-metal-waste-icon.svg" },

    // Type 3: Radioactive Elements
    thorium: { typeOfWaste: 3, atomImage: "radioactive-waste-icon.svg" },
    strontium: { typeOfWaste: 3, atomImage: "radioactive-waste-icon.svg" },

    // Type 4: Organic Pollutants
    benzene: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    "crude-oil": { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    petrol: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    spiralis: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    diesel: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    sulphide: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    ammonium: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    phenol: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    "organic-matter": { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    estrogen: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    phthalate: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    fragrance: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    diclofenac: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
    bht: { typeOfWaste: 4, atomImage: "sewage-waste-icon.svg" },
  };

  // Get the pollutant name using id as fallback when Pollutantname_split is empty
  const pollutantNameRaw =
    matchedRow.Pollutantname_split || matchedRow.id || "";
  const pollutantNameNormalized = pollutantNameRaw.toLowerCase().trim();

  // Add debug logging to track the lookup
  console.log(
    `Looking up waste type for pollutant: "${pollutantNameNormalized}" (from ${pollutantNameRaw})`
  );

  // Look up the waste type data with a fallback
  const wasteTypeData = pollutantWasteTypeMapping[pollutantNameNormalized] ||
    // Try alternative formats (with/without hyphens)
    pollutantWasteTypeMapping[pollutantNameNormalized.replace(/\s+/g, "-")] ||
    pollutantWasteTypeMapping[pollutantNameNormalized.replace(/-/g, " ")] || {
      // Default fallback if no match is found
      typeOfWaste: 1,
      atomImage: "agriculture-waste-icon.svg",
    };

  // Log the resolved waste type (debugging)
  console.log(
    `Resolved waste type for "${pollutantNameNormalized}":`,
    wasteTypeData
  );

  // Create a single data context object instead of multiple separate arrays
  const dataContext = {
    pollutant: {
      name: matchedRow.Pollutantname_split,
      description: matchedRow.pollutant_description_split,
      wasteType: wasteTypeData.typeOfWaste,
      atomImage: wasteTypeData.atomImage,
      effects: {
        summary: matchedRow.effects_on_human_Health_description_split,
        details: [
          matchedRow.healtheffects_1,
          matchedRow.healtheffects_2,
          // Compact array generation for remaining health effects
          ...Array(9)
            .fill(0)
            .map((_, i) => matchedRow[`healtheffects_${i + 3}`])
            .filter(Boolean),
        ],
      },
      sources: matchedRow.sources_venice_Description_split,
      soundFrequency: {
        enthalpy: matchedRow.Enthalpy_,
        frequency: matchedRow.SineWaveVisualizer_frequency_audiblefrequency,
        wave: matchedRow.Sound_frequency,
      },
      caseStudies: {
        venice: matchedRow.CaseStudies_venice_lagoon,
        area: matchedRow.CaseStudies_area,
      },
      phytoSpecies: Array(6)
        .fill(0)
        .map((_, i) => ({
          medium: matchedRow[`Phyto_Species${i + 1}_medium`],
          timePeriod: matchedRow[`Phyto_Species${i + 1}_timePeriod`],
          remediation: matchedRow[`Phyto_Species${i + 1}_remediation`],
        }))
        .filter((item) => item.medium || item.timePeriod || item.remediation),
      about: {
        description: matchedRow.AboutPollutantSection_description,
        image: matchedRow.AboutPollutantSection_image,
      },
    },

    plant: {
      name: matchedRow.plantName_Split,
      latinName: matchedRow.plant_name,
      image: matchedRow.image_split_plant,
      details: matchedRow.split_plant_details,
      wetlandDescription: matchedRow.plantData_WetlandDescription_split,
      phytoCapacity: matchedRow.phytoremediation_capacity_split,
      habitat: {
        temperature: matchedRow.PlantHabitat_temperature,
        humidity: matchedRow.PlantHabitat_humidity_moisture,
        soil: matchedRow.PlantHabitat_soil,
        ph: matchedRow.PlantHabitat_pH,
        details: Array(5)
          .fill(0)
          .map((_, i) => ({
            title: matchedRow[`PlantHabitat_title${i + 1}`],
            content: matchedRow[`PlantHabitat_content${i + 1}`],
          }))
          .filter((item) => item.title || item.content),
      },
      about: {
        description: matchedRow.AboutPlant_description,
        status: matchedRow.AboutPlant_WetlandStatus,
      },
      commonNames: Array(19)
        .fill(0)
        .map((_, i) => matchedRow[`CommonNames_content${i}`])
        .filter(Boolean),
      geographicalDistribution: matchedRow.Geographicaldistribution_text,
      phytoCapacityDetails: {
        description: matchedRow.PhytoCapacity_description,
        paragraphs: Array(11)
          .fill(0)
          .map((_, i) => matchedRow[`PhytoCapacity_contentPara${i + 1}`])
          .filter(Boolean),
      },
    },
  };

  // Update the leftpanelcontent to use the new dataContext
  const leftpanelcontent = [
    {
      pollutantNumber: matchedRow.Number,
      // Use the non-empty name for display
      pollutantName:
        matchedRow.Pollutantname_split || matchedRow.id || "Unknown Pollutant",
      typeOfWaste: wasteTypeData.typeOfWaste,
      atomImage: wasteTypeData.atomImage,
      pollutantDescription: matchedRow.pollutant_description_split,
      effect: matchedRow.effects_on_human_Health_description_split,
      sources: matchedRow.sources_venice_Description_split,
    },
  ];

  // Update the rightpanelcontent to use the new dataContext
  const rightpanelcontent = [
    {
      plantNameSplit: dataContext.plant.name,
      wetlandDescription: dataContext.plant.wetlandDescription,
      phytoCapacity: dataContext.plant.phytoCapacity,
      temperature: dataContext.plant.habitat.temperature,
      humidity: dataContext.plant.habitat.humidity,
      soil: dataContext.plant.habitat.soil,
      ph: dataContext.plant.habitat.ph,
      imgUrl: dataContext.plant.image,
      plantName: dataContext.plant.latinName,
      plantDetails: dataContext.plant.details,
    },
  ];

  // Check if we have an image from the database, otherwise try to determine one based on pollutant type
  const pollutantImage =
    matchedRow.AboutPollutantSection_image ||
    (wasteTypeData.typeOfWaste === 2
      ? "heavy-metal-pollutant.jpg"
      : wasteTypeData.typeOfWaste === 3
      ? "radioactive-pollutant.jpg"
      : wasteTypeData.typeOfWaste === 4
      ? "organic-pollutant.jpg"
      : "agricultural-pollutant.jpg");

  // Create aboutpollutantcontent with the same approach as other content objects
  const aboutpollutantcontent = [
    {
      text:
        dataContext.pollutant.about.description ||
        `About ${pollutantNameRaw}_This is a description of the pollutant is a highly reactive and soft metal that rapidly tarnishes in air and reacts violently with water, generating sufficient heat to ignite the hydrogen emitted in the reaction. Its name originates from "potash," while its symbol(K) derives from the Latin "kalium," reflecting its historical association with ashes. Long before its scientific discovery, potassium compounds were utilized in ancient practices like glassmaking and soap production, and as a component of gunpowder. Today, it remains crucial in various industries, notably as a fertilizer to enhance agricultural yields. Canada stands as the leading potash producer, followed by other nations like China, highlighting potassium\'s global economic significance. While stable potassium is generally benign, excessive potassium-based fertilizer runoff contributes to eutrophication, disrupting aquatic ecosystems by promoting algal blooms and oxygen depletion. Furthermore, the naturally occurring radioactive isotope potassium-40, present in all living organisms, contributes to low-level radiation exposure and raises concerns about long-term bioaccumulation in the environment. This necessitates careful management of potassium use to balance its industrial and agricultural benefits with its potential environmental impacts.`,
      image: dataContext.pollutant.about.image, // Use image directly from context
    },
  ];

  // Debug log to verify image path
  console.log(
    `Using pollutant image: ${pollutantImage} for ${pollutantNameRaw}`
  );

  // Update sinewavefreq to use the new dataContext
  const sinewavefreq = [
    {
      pollutantName: dataContext.pollutant.name,
      enthalpy: dataContext.pollutant.soundFrequency.enthalpy,
      soundfrequency: dataContext.pollutant.soundFrequency.wave,
      wavefrequency: dataContext.pollutant.soundFrequency.frequency,
    },
  ];

  // Update effectonhealthcontent to use the new dataContext
  // const effectonhealthcontent = dataContext.pollutant.effects.details.map(text => ({ text }));
  const effectonhealthcontent = [
    {
      text: "Cardiac Effects_Potassium imbalances disrupt the heart's electrical activity. Hyperkalemia(elevated potassium levels) causes erratic signals, irregular beats, and potential heart failure. Hypokalemia (low potassium levels) also disrupts rhythm, increasing arrhythmia risk. Maintaining potassium balance is essential for preventing cardiac arrhythmias and heart failure.",
    },
    {
      text: "Musculoskeletal Effects_Potassium is crucial for muscle function. Hypokalemia and hyperkaemia causes weakness, cramps, and may even lead to paralysis. The balance of potassium is vital for preventing muscle weakness and other harmful effects.",
    },
    {
      text: "Neurological Effects_Potassium aids nerve signal transmission. Imbalances disrupt this process, affecting nerve function. Though not always noticeable, these disruptions contribute to weakness and fatigue. Maintaining proper potassium levels is important for preventing nerve signal transmission disruption.",
    },
    {
      text: "Gastrointestinal Effects_Hyperkalemia induces nausea and vomiting. High potassium impacts the gastrointestinal system's nerves and muscles, possibly affecting the brain's chemoreceptor trigger zone. This helps to prevent nausea and vomiting related to hyperkalemia.",
    },
    {
      text: "Respiratory Effects_Severe hyperkalemia causes breathing difficulties. High potassium affects respiratory muscles, leading to shallow or labored respiration. Maintaining proper potassium levels is essential for preventing respiratory distress due to muscle weakness.",
    },
    {
      text: "General Systemic Effects_Hyperkalemia leads to fatigue and chest pain. Potassium chlorate poisoning causes organ damage and death. Untreated, severe hyperkalemia can be fatal due to cardiac arrest or respiratory failure. Proper potassium management is crucial for preventing fatal outcomes.",
    },
  ];

  // Update casestudiescontent to use the new dataContext
  // const casestudiescontent = [
  //   { text: dataContext.pollutant.caseStudies.venice },
  //   { text: dataContext.pollutant.caseStudies.area },
  // ];
  const casestudiescontent = [
    {
      text: "Venice lagoon_Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt. Sed condimentum sollicitudin nibh, nec mattis quam. Ut eu volutpat nisi, quis varius risus. Integer rutrum eros ac turpis euismod, in tincidunt risus dapibus. Etiam eget turpis massa. Fusce rutrum sit amet magna sit amet aliquam. Donec sit amet cursus erat, sit amet sagittis nunc. Nullam mattis risus nisi, non interdum elit congue in. Donec vitae ligula elit. Morbi nec luctus elit, eu feugiat turpis. Sed porttitor luctus ornare. Suspendisse condimentum fermentum convallis.",
    },
    {
      text: "Rest of the world_Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula, sed maximus magna tincidunt. Sed condimentum sollicitudin nibh, nec mattis quam. Ut eu volutpat nisi, quis varius risus. Integer rutrum eros ac turpis euismod, in tincidunt risus dapibus. Etiam eget turpis massa. Fusce rutrum sit amet magna sit amet aliquam. Donec sit amet cursus erat, sit amet sagittis nunc. Nullam mattis risus nisi, non interdum elit congue in. Donec vitae ligula elit. Morbi nec luctus elit, eu feugiat turpis. Sed porttitor luctus ornare. Suspendisse condimentum fermentum convallis.",
    },
  ];

  // Update phytocontent to use the new dataContext
  // const phytocontent = dataContext.pollutant.phytoSpecies;
  const phytocontent = [
    {
      medium: "Chenopodium quinoa_soil",
      timePeriod: "Chenopodium quinoa_70 days",
      remediation: "Chenopodium quinoa_66",
    },
    {
      medium: "Cucurbita pepo_soil",
      timePeriod: "Cucurbita pepo_15/30/45",
      remediation: "Cucurbita pepo_60/70/80",
    },
    {
      medium: "Artemisia annua_soil",
      timePeriod: "Artemisia annua_15/30/45",
      remediation: "Artemisia annua_30/40/47.36",
    },
  ];
  // Update aboutplantcontent to use the new dataContext
  // const aboutplantcontent = [
  //   {
  //     plant_name: dataContext.plant.name,
  //     description: dataContext.plant.about.description,
  //     status: dataContext.plant.about.status,
  //   },
  // ];

  // Update commonname to use the new dataContext
  // const commonname = [
  //   { plantName: dataContext.plant.name },
  //   ...dataContext.plant.commonNames.map((text) => ({ text })),
  // ];

  // Update habitat to use the new dataContext
  // const habitat = [
  //   { plantName: dataContext.plant.name },
  //   ...dataContext.plant.habitat.details,
  // ];

  // Update geographicaldistribution to use the new dataContext
  // const geographicaldistribution = [
  //   { text: dataContext.plant.geographicalDistribution },
  // ];

  // Update sectionphyto to use the new dataContext
  // const sectionphyto = [
  //   { type: "intro", text: dataContext.plant.phytoCapacityDetails.description },
  //   { plantName: dataContext.plant.name },
  //   ...dataContext.plant.phytoCapacityDetails.paragraphs.map((text) => ({
  //     text,
  //   })),
  // ];

  // More efficient structure for plant uses
  // const plantUses = {
  //   plantName: dataContext.plant.name,
  //   bibliography: matchedRow.Bibliography,
  //   sections: [
  //     {
  //       id: "nutritional",
  //       title: "NUTRITIONAL",
  //       flavourtext: matchedRow.Nutritional_flavourtext,
  //       items: Array(10)
  //         .fill(0)
  //         .map((_, i) => ({
  //           header: matchedRow.Medicinal_flavourtext,
  //           text: matchedRow[`UsesOfPlant_nutritional_description${i + 1}`],
  //         }))
  //         .filter((item) => item.text),
  //     },
  //     {
  //       id: "medicine",
  //       title: "MEDICINE",
  //       flavourtext: matchedRow.UsesOfPlant_medicinal_flavourtext,
  //       items: Array(10)
  //         .fill(0)
  //         .map((_, i) => ({
  //           header: matchedRow[`UsesOfPlant_title${i + 1}`],
  //           text: matchedRow[`UsesOfPlant_description${i + 1}`],
  //         }))
  //         .filter((item) => item.text),
  //     },
  //     {
  //       id: "additional",
  //       title: "ADDITIONAL",
  //       items: Array(11)
  //         .fill(0)
  //         .map((_, i) => ({
  //           header: matchedRow[`Add_UsesOfPlant_title${i + 1}`],
  //           text: matchedRow[`Add_UsesOfPlant_description${i + 1}`],
  //         }))
  //         .filter((item) => item.text),
  //     },
  //   ],
  // };

  const aboutplantcontent = [
    {
      plant_name: rightpanelcontent[0].plantNameSplit,
      description:
        "About Salvinia molesta_Salvinia molesta, a perennial aquatic fern, exhibits a characteristic structure  that is adapted for its free-floating lifestyle. Its aerial fronds (a large leaf), arranged in triplets, transition from flat, youthful forms to increasingly folded, mature structures, reaching sizes up to 2.2 cm. These fronds possess a specialized upper surface, featuring papillae with intricate, hair-like cages that trap air, enhancing buoyancy and repelling water. The lower surface, covered in dense brown hairs, further contributes to flotation.Beneath the surface, highly divided, feathery fronds act as pseudo-roots, anchoring the plant and facilitating nutrient absorption. These submerged fronds extend significantly, ranging from 2 to 50 cm. At the bottom, rhizomes, which are horizontal stems beneath the water surface , propagate vegetatively through fragmentation, allowing the fern to rapidly colonize aquatic environments and form dense mats. \nMature plants produce sporocarps, small, egg-shaped structures containing infertile microspores and megaspores. These sporocarps, covered in soft hairs, are clustered along the submerged leaves. Lacking sexual reproduction, Salvinia molesta relies entirely on asexual propagation through fragmentation. This strategy enables rapid dispersal and the formation of extensive, floating mats, which can significantly impact aquatic ecosystems.",
      status:
        "Wetland Status_ OBL (Obligate Wetland Plant) - Almost always occurs in wetlands a perennial aquatic fern, exhibits a characteristic structure  that is adapted for its free-floating lifestyle. Its aerial fronds (a large leaf), arranged in triplets, transition from flat, youthful forms to increasingly folded, mature structures, reaching sizes up to 2.2 cm. These fronds possess a specialized upper surface, featuring papillae with intricate, hair-like cages that trap air, enhancing buoyancy and repelling water. The lower surface, covered in dense brown hairs, further contributes to flotation.Beneath the surface, highly divided, feathery fronds act as pseudo-roots, anchoring the plant and facilitating nutrient absorption. These submerged fronds extend significantly, ranging from 2 to 50 cm. At the bottom, rhizomes, which are horizontal stems beneath the water surface , propagate vegetatively through fragmentation, allowing the fern to rapidly colonize aquatic environments and form dense mats. \nMature plants produce sporocarps, small, egg-shaped structures containing infertile microspores and megaspores. These sporocarps, covered in soft hairs, are clustered along the submerged leaves. Lacking sexual reproduction, Salvinia molesta relies entirely on asexual propagation through fragmentation. This strategy enables rapid dispersal and the formation of extensive, floating mats, which can significantly impact aquatic ecosystems.",
    },
  ];
  const commonname = [
    { plantName: rightpanelcontent[0].plantNameSplit },
    { text: "Chinese; rén yàn huái cài pín, rén yàn huái yè píng" },
    { text: "Dutch; Grote vlotvaren" },
    {
      text: "English; African payal, African pyle, Aquarium water moss, Azolla, Giant azolla, Giant salvinia, Kariba weed, Salvinia, Salvinia moss, Water fern, Water spangles, Australian azolla, butterfly fern, cats tongue, koi kandy, velvet weed, watermoss",
    },
    { text: "Finland; rikkakellussaniainen" },
    {
      text: "Germany; Lästiger büschelfarn; Schwimmfarn, Bueschelfarn, Leastiger Schwimmfarn",
    },
    {
      text: "Italy; Salvinia molesta (The genus name Salvinia honors the Italian scholar Antonio Maria Salvini (1633–1729), a professor of the Greek language at the University of Florence)",
    },
    { text: "Netherlands; drijfplantje" },
    { text: "Portuguese; mururé carrapatinho" },
    { text: "South Africa; Water varing" },
    { text: "Swedish; öronsimbräken" },
    { text: "Thailand; Chawk hunu" },
  ];
  const habitat = [
    { plantName: rightpanelcontent[0].plantNameSplit },
    {
      title: "Diverse Habitats",
      content:
        "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe.",
    },
    {
      title: "Moisture preference",
      content:
        "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe",
    },
    {
      title: "Flood and Drought adaptability",
      content:
        "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe",
    },
    {
      title: "Temperature and humidity tolerance",
      content:
        "Festuca arundinacea originates from Europe where it primarily occurs in grasslands, woodland margins, and coastal marshes, with its native range extending from the Mediterranean to northern Europe",
    },
  ];
  const geographicaldistribution = [
    {
      text: "Originating from southeastern Brazil, in the subtropical zone between latitudes 24°050 S and 32°050 S at elevations up to 900 m, Salvinia molesta has become a globally disruptive invasive aquatic fern, spreading rapidly since the mid-20th century. Initially introduced as an ornamental plant and for water treatment, it has since colonized diverse aquatic ecosystems worldwide, causing significant ecological disruption. Its spread accelerated from the 1950s, reaching numerous African countries. By the 1970s and 1980s, it had invaded Cameroon, the Democratic Republic of the Congo, Nigeria, and South Africa, and later spread to Ghana and Kenya, among others. In the Indian subcontinent and Southeast Asia, it is prevalent in India, and is considered an invasive species in Indonesia, Malaysia, and Israel, and has also been observed in Japan. In Europe, it is found in Denmark, France, Germany, and Spain. It is an invasive species in Austria, Belgium, and Italy, notably in Tuscany and near Rome, where it displaces native species and alters ecosystems. ",
    },
  ];
  const sectionphyto = [
    {
      type: "intro",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque.",
    },
    { plantName: rightpanelcontent[0].plantNameSplit },
    {
      text: "Potassium_Salvinia molesta effectively concentrates potassium in its roots and fronds, enabling phytoremediation of polluted waters. Studies from the Cochin University of Science and Technology show dried plants contain 2.8 g/kg potassium, with removal rates of 50-90% within 15-30 days, dependent on initial potassium levels, growth period, environment, and biomass.",
    },
    {
      text: "Lead _Salvinia molesta demonstrates significant lead (Pb) removal capabilities in polluted water. Studies in Patna,India, reported 85% Pb accumulation, and a Tamil Nadu study documented a 35.3% reduction in Pb from industrial effluent (2.974 ppm to 1.924 ppm). A study from the Department of Biological Sciences, Faculty of Science, Ahmadu Bello University, Zaria, Nigeria, observed increasing Pb uptake over 18 days, reaching 0.087% of dry weight without visible plant damage, suggesting a unique stress response. These findings highlight Salvinia molesta's potential for Pb phytoremediation, even at varying initial concentrations.",
    },
    {
      text: "Mercury_A study conducted by the Ganga Devi Mahila College (Magadh University), Kankarbagh in Patna, India, further explored Salvinia molesta's phytoremediation potential by assessing its ability to remove mercury (Hg) from polluted water. The research indicated that when exposed to a 100% concentration of Hg in the experimental solution, Salvinia molesta accumulated up to 74% of the mercury in 15 days within its plant tissues.",
    },
    {
      text: "Copper_Salvinia molesta effectively removes copper (Cu) from polluted environments. Studies show it accumulates Cu without visible damage, even at high concentrations. A University of Vellore, India, study revealed an 86.4% increase of Cu within plant tissues over 15 days, while a study from University of Kelaniya, Srilanka, demonstrated a 32.6% Cu reduction in sewage sludge over 28 days. These findings confirm Salvinia molesta's capacity for both Cu bioaccumulation and removal, making it a promising phytoremediation agent.",
    },
    {
      text: "Cadmium_Salvinia molesta demonstrates cadmium (Cd) removal capabilities, though its tolerance varies with concentration. Pondicherry University research found survival at 1 ppm Cd for 16 days, but limited growth at higher concentrations (10 ppm for a week, 100 ppm for 5 days). A Vellore Institute of Technology study showed a 92.83% Cd reduction from industrial effluent, decreasing from 0.251 ppm to 0.018 ppm. This indicates effective Cd absorption, particularly at lower concentrations, but also highlights Salvinia molesta's sensitivity to elevated Cd levels.",
    },
    {
      text: "Chromium_Salvinia molesta exhibits varying chromium (Cr) tolerance. Pondicherry University studies showed healthy growth for 45 days at 1 ppm Cr, 25 days at 10 ppm, but immediate decay at 100 ppm. A Vellore Institute of Technology study demonstrated a 47.95% Cr reduction from industrial effluent, decreasing from 2.021 ppm to 1.052 ppm. This indicates effective Cr removal at lower concentrations, but highlights sensitivity to higher Cr levels.",
    },
    {
      text: "Zinc_Salvinia molesta demonstrates a strong capacity for zinc (Zn) accumulation and removal. Experiments show it concentrates Zinc in dry tissues 10,000-fold compared to water, indicating purification potential. Studies in Loyola College, Tamil Nadu confirm significant Zn reduction in wastewater after 10 days. Research done by  Centre for Water Resources Development & Management, Kunnamangalam, Kerala published in Resources and Conservation further highlights its efficiency, with 50% Zn removal in 15 days and 90% in 30 days, showcasing its ability to effectively absorb and cleanse Zn from contaminated water.",
    },
    {
      text: "Other heavy metals_Salvinia molesta demonstrates effective manganese (Mn) and iron (Fe) accumulation. A 2016 VIT University study revealed Salvinia molesta concentrates Mn in dry tissues five-fold compared to water, using Atomic Absorption Spectrophotometry. Additionally, University of Kelaniy, Sri Lanaka, research showed a 26.6% Fe reduction in sewage sludge over 28 days. These findings, combined with its high growth rate and metal tolerance, solidify Salvinia molesta as a potent heavy metal hyperaccumulator, suitable for phytoremediation.",
    },
    {
      text: "Nickel_Salvinia molesta demonstrates effective manganese (Mn) and iron (Fe) accumulation. A 2016 VIT University study revealed Salvinia molesta concentrates Mn in dry tissues five-fold compared to water, using Atomic Absorption Spectrophotometry. Additionally, University of Kelaniy, Sri Lanaka, research showed a 26.6% Fe reduction in sewage sludge over 28 days. These findings, combined with its high growth rate and metal tolerance, solidify Salvinia molesta as a potent heavy metal hyperaccumulator, suitable for phytoremediation.",
    },
    {
      text: "Micronutrients_Salvinia molesta exhibits strong nitrogen (N) and phosphorus (P) phytoremediation capabilities. Studies show N content ranges from 0.6% to 4.0% of dry weight, with uptake rates up to 8 mg per g of dry weight/day, or 6,000 kg of nitrogen per hectare/year. Australian sewage lagoons recorded 1,580 kg per hectare/year removal. While S. molesta phosphorus uptake data is limited, Salvinia minima and Salvinia auriculata studies indicate phosphorus concentration enhances growth and uptake, respectively, suggesting S. molesta's potential to combat eutrophication.",
    },
  ];
  const plantUses = {
    plantName: rightpanelcontent[0].plantNameSplit, // Define plant name once
    sections: [
      {
        id: "nutritional",
        title: "NUTRITIONAL",
        flavourtext:
          "Salvinia molesta is not suitable for human consumption due to its poor nutritional value and potential toxicity.",
        items: [
          {
            header: "The edibility rating for Salvinia molesta is unavailable.",
            text: "Its nutritional value is poor, lacking significant macronutrients like carbohydrates, proteins, and fats. While containing minerals, it poses toxicity risks due to heavy metal accumulation from its phytoremediation abilities. High lignin and tannin content interfere with nutrient absorption. Furthermore, aquatic environments expose it to microbial contamination. Therefore, Salvinia molesta is deemed unsuitable for human consumption, and its primary applications lie in environmental remediation, animal feed research, and biomass production.",
          },
        ],
      },
      {
        id: "medicine",
        title: "MEDICINE",
        flavourtext:
          "Salvinia molesta exhibits promising antibacterial properties against certain harmful bacteria.", // Common flavour text for medicine group
        items: [
          {
            header: "Antimicrobial",
            text: "A 2014 Indian study from International Journal of PharmTech Research revealed Salvinia molestas antibacterial properties were attributed to its secondary metabolites (product of metabolism). Methanol and chloroform extracts demonstrated 7-15% antimicrobial activity against Pseudomonas aeruginosa, a bacterium responsible for various infections, including urinary tract infections, respiratory infections and other infections, and also showed excellent potential against Aeromonas hydrophila, bacteria that causes gastroenteritis or infectious diarrhea which is the inflammation of the stomach and small intestine.",
          },
          {
            header: "Respiratory",
            text: "Salvinia molesta roots are used to address respiratory issues such as cough, phlegm, and inflammation. Traditional Chinese medicine utilizes a decoction to address such ailments. Prepared by boiling 10g of the dried roots in 500ml of water for 15-20 minutes, this remedy is sometimes enhanced with ginger for increased anti-inflammatory effects and honey for soothing properties. The strained, warm liquid is then consumed twice daily.",
          },
          {
            header: "Dermatitis",
            text: "In Malay and Indonesian traditional medicine, Salvinia molesta leaves offer a natural remedy. Fresh leaves are washed, crushed into a paste, and sometimes mixed with coconut oil or turmeric for enhanced effects. This paste is applied to affected areas for 15-30 minutes, then rinsed. Twice-daily application aims to reduce redness, itching, and inflammation, promoting skin healing. This traditional use reflects the plants potential soothing and antimicrobial properties.",
          },
          {
            header: "Anti-cancer activity",
            text: "A 2013 study at Stephen F. Austin State University found that Salvinia molesta extracts, specifically abietane diterpenes, could selectively stop cancer cell growth. These compounds were toxic to tumor cells but left healthy cells unharmed, showing potential for targeted cancer treatment.",
          },
          {
            header: "Wound healing",
            text: "A 2015 IIT Varanasi study published in the Journal of Photochemistry and Photobiology B: Biology demonstrated the green synthesis of silver nanoparticles using Salvinia molesta extract. This eco-friendly method converts silver ions into nanoparticles, offering potential applications in wound healing, antibacterial coatings, and drug delivery.",
          },
          {
            header: "Antioxidant", // Corrected typo
            text: "A 2014 CSIR (Council of Scientific and Industrial Research) study, documented in Philippine Medicinal Plants, revealed Salvinia molesta extracts (acetone/methanol) possess high antioxidant activity due to phenolic compounds, primarily naringenin and myricetin.This antioxidant capacity may combat oxidative stress, inflammation, and chronic diseases, potentially supporting liver health, metabolism, neuroprotection, and cardiovascular function.",
          },
        ],
      },
      {
        id: "additional",
        title: "ADDITIONAL",
        flavourtext:
          "Salvinia molesta has various other uses beyond medicinal applications.", // Added a generic flavourtext for 'additional'
        items: [
          {
            header: "Paper industry raw material",
            text: "A study from the Bulletin of the National Institute of Ecology, India, suggests S. molesta can be processed into low-grade paper products like kraft, newsprint, and tissue. It can be utilized alone or in conjunction with agricultural byproducts such as rice straw or waste textile cuttings, offering a sustainable alternative to traditional pulp sources.",
          },
          {
            header: "Supplementary animal feed", // Corrected typo
            text: "While not suitable as a sole feed source due to its high crude ash and tannin content, which can hinder digestibility, S. molesta can supplement the diets of various animals, including ducks, pigs, geese, and fish. It provides a source of nutrients and can be particularly useful in regions with limited feed resources.",
          },
          {
            header: "Biofuel Production via Anaerobic Digestion",
            text: "Research from the Indian Institutes of Technology (IIT) and Indian Agricultural Research Institute (IARI) demonstrates the potential for S. molesta to generate biogas through anaerobic digestion, yielding methane, a valuable energy source. Combining it with other aquatic plants like Eichhornia crassipes can further enhance biogas production.",
          },
          {
            header: "Ornamental Horticulture and Invasive Spread", // Removed duplicate entry
            text: "Its aesthetic qualities have made S. molesta popular in botanical gardens and aquariums. However, this widespread use has inadvertently contributed to its classification as an invasive species in many regions",
          },
          {
            header: "Agricultural Fertilizer and Soil Amendment",
            text: "S. molesta can be composted or used as mulch, providing a nutrient-rich soil amendment. Its use as mulch is particularly beneficial in dry regions and for citrus crops, enhancing soil fertility and moisture retention.",
          },
          {
            header: "Aquaculture Enhancement and Fish Feed Supplement",
            text: "In aquaculture, S. molesta can serve as a partial feed source for fish species like Nile tilapia, potentially improving growth performance. It also fosters the growth of invertebrate larvae, a valuable food source for prawns and fish.",
          },
          {
            header: "Ecological Control via Biological Agents",
            text: "The introduction of specific weevil species, natural predators of S. molesta, offers a biological control method to manage its rapid growth and prevent ecological imbalances. This approach helps maintain biodiversity and ecosystem health.",
          },
        ],
      },
    ],
  };
  // Add state to track dragging
  const [isDragging, setIsDragging] = useState(false);

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return;
    // }
    setState(open);
  };
  // Central function to update slider position and related effects
  const updateSliderPosition = (newPosition) => {
    const clampedPosition = Math.max(0, Math.min(100, newPosition));

    document.documentElement.style.setProperty(
      "--slider-position",
      `${clampedPosition}%`
    );
    setSliderPosition(clampedPosition);

    // First, clear all region classes to avoid conflicts
    document.body.classList.remove(
      "sound-left-region",
      "sound-center-region",
      "sound-right-region"
    );

    // Add appropriate region class based on position
    if (clampedPosition < 25) {
      document.body.classList.add("sound-left-region");
    } else if (clampedPosition >= 95) {
      document.body.classList.add("sound-right-region");
    } else {
      document.body.classList.add("sound-center-region");
    }

    // Panel active classes control which content is shown
    if (clampedPosition < 50) {
      // White panel is active (right side content)
      document.body.classList.add("white-panel-active");
      document.body.classList.remove("black-panel-active");
    } else {
      // Black panel is active (left side content)
      document.body.classList.add("black-panel-active");
      document.body.classList.remove("white-panel-active");
    }

    // These other classes are used for specific positioning
    document.body.classList.toggle("right-panel-active", clampedPosition < 3);

    // Remove sound-panel-active class as we'll control sound button color directly
    document.body.classList.remove("sound-panel-active");

    // Calculate rotation based on slider position
    const newRotation = (clampedPosition / 100) * 360;
    setRotation(newRotation);
    document.documentElement.style.setProperty(
      "--rotation",
      `${newRotation}deg`
    );
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    lastPositionRef.current = sliderPosition; // Ensure ref is synced on initial click
    // Optional: Could temporarily disable transitions during drag if needed for performance
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = document.getElementById("slider-container");
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
    const snapLeft = 0;
    const snapCenter = 50;
    const snapRight = 100; // Keep the original 99% snap point
    let snapTarget;

    if (currentPosition <= thresholdLeft) {
      snapTarget = snapLeft;
    } else if (currentPosition > thresholdRight) {
      snapTarget = snapRight;
    } else {
      snapTarget = snapCenter;
    }
    // --- End Snap Logic ---

    // Update to the snapped position using the original function
    updateSliderPosition(snapTarget);
  };

  // Function to update container height based on panel heights
  const updateContainerHeight = () => {
    console.log("Attempting to update container height...");

    // Ensure refs are available
    if (!leftPanelRef.current || !rightPanelRef.current) {
      console.log("Height update skipped: Panel refs not ready");
      return;
    }

    // Force layout calculations with getBoundingClientRect()
    const leftRect = leftPanelRef.current.getBoundingClientRect();
    const rightRect = rightPanelRef.current.getBoundingClientRect();

    // Use the height from getBoundingClientRect instead of scrollHeight
    const leftPanelHeight = leftRect.height;
    const rightPanelHeight = rightRect.height;

    console.log(
      `Left panel height: ${leftPanelHeight}px, Right panel height: ${rightPanelHeight}px`
    );

    // Calculate max height with a minimum threshold
    const maxHeight = Math.max(
      leftPanelHeight,
      rightPanelHeight,
      window.innerHeight
    );
    const finalHeight = maxHeight > 100 ? `${maxHeight}px` : "100vh";

    console.log(`Setting container height to: ${finalHeight}`);
    setContainerHeight(finalHeight);

    // Force slider-container to update as well
    if (sliderContainerRef.current) {
      sliderContainerRef.current.style.height = finalHeight;
    }
    // Directly update slider-bar height using its ref
    if (sliderBarRef.current) {
      sliderBarRef.current.style.height = finalHeight;
      console.log(`Slider bar height set directly to ${finalHeight}`);
    }
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
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    // Clean up on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    // Set the initial rotation CSS variable directly on mount
    document.documentElement.style.setProperty("--rotation", `180deg`);
    // Add slider transition variable for dynamic control
    document.documentElement.style.setProperty(
      "--slider-transition",
      "left 0.3s ease-in-out"
    );

    // Clean up on unmount
    return () => {};
  }, []); // Initial setup effect, height update logic moved

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is currently intersecting
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        // If an intersecting entry is found, update the active section
        if (intersectingEntry) {
          setActiveSection(intersectingEntry.target.id);
        }
        // Optional: If no entry is intersecting, you might want to clear
        // the active section or keep the last active one, depending on desired UX.
        // Example: else if (entries.some(entry => !entry.isIntersecting)) {
        //   // Logic if elements are leaving viewport but none are entering
        // }
      },
      {
        // Keep the lower threshold
        threshold: 0.1,
        root: null,
      }
    );

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

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Replace the current phyto section scroll effect with this updated code for instant transition
  useEffect(() => {
    if (activeSection === "phytoremediation") {
      const section = document.getElementById("phytoremediation");
      if (!section) return;

      // Create the transition flash element only
      const flash = document.createElement("div");
      flash.className = "transition-flash";
      document.body.appendChild(flash);

      // Add styles with minimal transition time
      const style = document.createElement("style");
      style.textContent = `
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
        transition: opacity 0.05s; /* Ultra-fast transition */
      }
      
      .transition-flash.active {
        opacity: 0.7;
      }
      
      /* Hide the indicator entirely since transition will be instant */
      .phyto-scroll-indicator {
        display: none;
      }
      
      /* Add style for the slider bar transition */
      .slider-bar {
        transition: var(--slider-transition);
      }
    `;
      document.head.appendChild(style);

      let isTransitioning = false;

      const handleScroll = () => {
        if (isTransitioning) return;

        const rect = section.getBoundingClientRect();

        // Trigger transition as soon as we're near the bottom
        const distanceToBottom = rect.bottom - window.innerHeight;
        if (distanceToBottom < 50) {
          triggerTransition();
        }
      };

      const handleWheel = (e) => {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }

        const rect = section.getBoundingClientRect();
        const distanceToBottom = rect.bottom - window.innerHeight;

        // Immediately trigger on any downward scroll near bottom
        if (e.deltaY > 0 && distanceToBottom < 100) {
          triggerTransition();
          e.preventDefault();
        }
      };

      const handleTouchMove = (e) => {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }

        const rect = section.getBoundingClientRect();
        const distanceToBottom = rect.bottom - window.innerHeight;

        // Immediately trigger when near bottom
        if (distanceToBottom < 100) {
          triggerTransition();
          e.preventDefault();
        }
      };

      const triggerTransition = () => {
        if (isTransitioning) return;
        isTransitioning = true;

        // Skip the flash animation delay
        handleNavClick("plant-name");

        // Reset state after minimal delay
        setTimeout(() => {
          flash.classList.remove("active");
          isTransitioning = false;
        }, 150);
      };

      // Add simplified event listeners
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        // Clean up
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchmove", handleTouchMove);
        if (style.parentNode) style.remove();
        if (flash.parentNode) flash.remove();
      };
    }
  }, [activeSection]);

  // Add ResizeObserver implementation in a useEffect
  useEffect(() => {
    console.log("Setting up ResizeObserver...");

    // Clean up any existing observer
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    // Create a new ResizeObserver
    resizeObserverRef.current = new ResizeObserver((entries) => {
      console.log("ResizeObserver detected size change");
      // Use a short timeout to ensure all layout calculations are complete
      setTimeout(updateContainerHeight, 100);
    });

    // Observe both panels for size changes
    if (leftPanelRef.current) {
      resizeObserverRef.current.observe(leftPanelRef.current);
    }

    if (rightPanelRef.current) {
      resizeObserverRef.current.observe(rightPanelRef.current);
    }

    // Also attach window resize listener as a fallback
    const handleWindowResize = () => {
      // Define the handler to remove later
      console.log("Window resize detected");
      setTimeout(updateContainerHeight, 100);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      // Clean up
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener("resize", handleWindowResize); // Remove the correct handler
    };
  }, [leftPanelLoaded, rightPanelLoaded]); // Reinitialize when panel load status changes

  // Add CSS override to ensure our height settings take precedence
  useEffect(() => {
    // Add style tag to override any conflicting CSS
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .slider-container {
        min-height: ${containerHeight} !important;
        height: ${containerHeight} !important;
        overflow: visible !important;
      }

      .slider-bar {
        height: ${containerHeight} !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [containerHeight]); // Update when containerHeight changes

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      // Give the browser a moment to finish layout calculations
      requestAnimationFrame(() => {
        // Force a recalculation of panel dimensions
        if (leftPanelRef.current && rightPanelRef.current) {
          const leftPanelHeight = leftPanelRef.current.scrollHeight;
          const rightPanelHeight = rightPanelRef.current.scrollHeight;
          const maxHeight = Math.max(leftPanelHeight, rightPanelHeight);
          const finalHeight = maxHeight > 50 ? `${maxHeight}px` : "78vw";
          setContainerHeight(finalHeight);
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (sectionId) => {
    console.log("DDSADSDADS");
    const section = document.getElementById(sectionId);
    if (!section) return;
    setState(false);
    // Mobile-specific behavior
    // if (isMobile) {
    //   section.scrollIntoView({ behavior: "smooth", block: "start" }); // Changed to smooth
    //   setMenuOpen(false);
    //   return;
    // }

    // Determine which panel the section belongs to
    const isInRightPanel = section.closest(".white-container") !== null;
    const targetSliderPos = isInRightPanel ? 0 : 100;

    // Set smooth transition for slider
    document.documentElement.style.setProperty(
      "--slider-transition",
      "left 0.5s ease-in-out"
    );

    // Update slider position with smooth transition
    updateSliderPosition(targetSliderPos);
    lastPositionRef.current = targetSliderPos;

    // Smooth scroll to section

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Replace the scroll-based combined section detection with Intersection Observer
  useEffect(() => {
    // Skip if the ref isn't available
    if (!document.querySelector(".combined-section")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if combined section is intersecting
        const isIntersecting = entries[0]?.isIntersecting || false;

        // Add/remove class based on visibility
        if (isIntersecting) {
          document.body.classList.add("viewing-combined-section");
        } else {
          document.body.classList.remove("viewing-combined-section");
        }
      },
      {
        // Lower threshold means it triggers earlier when scrolling down
        threshold: 0.1,
      }
    );

    // Start observing the combined section
    observer.observe(document.querySelector(".combined-section"));

    return () => observer.disconnect();
  }, []);

  // Update the CSS rules for sound button color management
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      /* Default sound button color (white for dark backgrounds) */
      .sound-icon span {
        background-color: white;
        transition: background-color 0.3s ease;
      }
      
      /* SLIDER VIEW (not scrolled to combined section) */
      
      /* Case 1: Left region (~1%) or Center region (50/50) - Sound button BLACK */
      body:not(.viewing-combined-section).sound-left-region .sound-icon span,
      body:not(.viewing-combined-section).sound-center-region .sound-icon span {
        background-color: black !important;
      }
      
      /* Case 2: Right region (~99%) - Sound button WHITE */
      body:not(.viewing-combined-section).sound-right-region .sound-icon span {
        background-color: white !important;
      }
      
      /* COMBINED SECTION VIEW (scrolled down) */
      
      /* Case 3: White panel active - Sound button BLACK */
      body.viewing-combined-section.white-panel-active .sound-icon span {
        background-color: black !important;
      }
      
      /* Case 4: Black panel active - Sound button WHITE */
      body.viewing-combined-section.black-panel-active .sound-icon span {
        background-color: white !important;
      }
      
      /* SPECIAL CASE: Center region (50/50) in combined section - force WHITE */
      body.viewing-combined-section.sound-center-region .sound-icon span {
        background-color: white !important;
      }
      
      /* MENU OPEN OVERRIDE - Always WHITE */
      .nav-menu.open ~ .sound-button .sound-icon span,
      body.nav-menu-open .sound-icon span {
        background-color: white !important;
        z-index: 100;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      if (styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  // Add this effect after your other useEffects
  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;

    const navBar = navBarRef.current;
    const navBarContainer = navBar?.parentElement;

    if (!navBar || !navBarContainer) return;

    // Check if native sticky is working by checking position after scroll
    // We'll use this as a backup in case CSS sticky fails
    const checkStickySupport = () => {
      // If the element is out of view, getBoundingClientRect might not work right
      // So we'll use a more reliable check based on offsetTop
      const containerRect = navBarContainer.getBoundingClientRect();
      const navbarTop = navBar.getBoundingClientRect().top;

      // If navbar is not sticking when it should be...
      if (containerRect.top < 0 && navbarTop !== 20) {
        // Native sticky isn't working, apply manual positioning
        console.log("Sticky positioning not working, applying fallback...");

        // Enable fallback mode
        enableFallbackMode();
      } else {
        // Native sticky is working fine
        disableFallbackMode();
      }
    };

    const enableFallbackMode = () => {
      // Don't re-apply if already in fallback mode
      if (navBar.classList.contains("using-fallback")) return;

      navBar.classList.add("using-fallback");

      // Apply fixed positioning
      navBar.style.position = "fixed";
      navBar.style.top = "20px";
      navBar.style.width = `${navBarContainer.offsetWidth}px`;

      // Add placeholder to prevent layout jump
      const placeholder = document.createElement("div");
      placeholder.className = "nav-placeholder";
      placeholder.style.height = `${navBar.offsetHeight}px`;
      placeholder.style.width = `${navBar.offsetWidth}px`;
      navBarContainer.appendChild(placeholder);
    };

    const disableFallbackMode = () => {
      if (!navBar.classList.contains("using-fallback")) return;

      navBar.classList.remove("using-fallback");

      // Restore normal positioning
      navBar.style.position = "";
      navBar.style.top = "";
      navBar.style.width = "";

      // Remove placeholder
      const placeholder = navBarContainer.querySelector(".nav-placeholder");
      if (placeholder) {
        navBarContainer.removeChild(placeholder);
      }
    };

    // Update positioning on scroll and resize
    window.addEventListener("scroll", checkStickySupport);
    window.addEventListener("resize", checkStickySupport);

    // Initial check
    setTimeout(checkStickySupport, 100);

    return () => {
      window.removeEventListener("scroll", checkStickySupport);
      window.removeEventListener("resize", checkStickySupport);
    };
  }, [isMobile]);
  const options = [
    { id: "about-pollutant", label: "Pollutant name" },
    { id: "sound-frequency", label: "Sound frequency" },
    { id: "effect-on-health", label: "Effect on health" },
    { id: "case-study", label: "Case study" },
    {
      id: "phytoremediation",
      label: "Phytoremediation of the Representative Pollutant",
    },
  ];
  const option = [
    { id: "plant-name", label: `Plant Common ` },
    {
      id: "common-names",
      label: `Common names of ${rightpanelcontent[0].plantNameSplit}`,
    },
    {
      id: "plant-habitat",
      label: `${rightpanelcontent[0].plantNameSplit} s Habitat`,
    },
    { id: "origin", label: "Origin and Geographical Distribution" },
    {
      id: "phyto-capacity",
      label: ` Phytoremediation capacity of
                  ${rightpanelcontent[0].plantNameSplit}`,
    },
    {
      id: "uses-of-plant",
      label: `Uses of ${rightpanelcontent[0].plantNameSplit}`,
    },

  ];

  return (
    <>
      <SoundToggle
        padNumber={leftpanelcontent[0].pollutantNumber}
        sliderPosition={sliderPosition}
        panelMode={sliderPosition < 50 ? "white" : "black"}
      />

      <div
        id="slider-container"
        className="slider-container"
        ref={sliderContainerRef}
        style={{ height: containerHeight }}
      >
        <div ref={leftPanelRef}>
          <LeftPanel
            sections={leftpanelcontent}
            onLoad={() => setLeftPanelLoaded(true)}
            onNavigate={handleNavClick}
          />
        </div>
        <div ref={rightPanelRef}>
          <RightPanel
            sections={rightpanelcontent}
            onLoad={() => setRightPanelLoaded(true)}
            onNavigate={handleNavClick}
          />
        </div>
        <div
          ref={sliderBarRef}
          className="slider-bar"
          style={{
            left: `${sliderPosition}%`, // Use state directly for slider position
            height: containerHeight,
            minHeight: "100%",
            position: "absolute",
            top: 0,
          }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="slider-image-container"
            style={{ position: "relative", left: "-4px" }}
          >
            <img src="slider.png" alt="Slider" className="slider-image" />
          </div>
        </div>
      </div>
      <div className="combined-section">
        <div className="nav-bar-container">
          <div className="nav-bar" ref={navBarRef}>
            {isMobile && (
              <div
                className="mobile-menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </div>
            )}
            <div
              className={`nav-items-container ${isMobile ? "mobile" : ""} ${
                isMobile && menuOpen ? "mobile-active" : ""
              }`}
            >
              <div
                className={`text-wrapper`}
                onClick={() => handleNavClick("about-pollutant")}
              >
                <span>{leftpanelcontent[0].pollutantName}</span>
              </div>

              <div
                className={`div`}
                onClick={() => handleNavClick("plant-name")}
              >
                <span>{rightpanelcontent[0].plantNameSplit}</span>
              </div>

              <div
                className={`text-wrapper-2`}
                onClick={() => handleNavClick("sound-frequency")}
              >
                <span>Sound frequency</span>
              </div>

              <div
                className={`text-wrapper-3`}
                onClick={() => handleNavClick("common-names")}
              >
                <span>
                  Common names of {rightpanelcontent[0].plantNameSplit}
                </span>
              </div>

              <div
                className={`text-wrapper-4`}
                onClick={() => handleNavClick("plant-habitat")}
              >
                <span>{rightpanelcontent[0].plantNameSplit}'s Habitat</span>
              </div>

              <div
                className={`text-wrapper-5`}
                onClick={() => handleNavClick("origin")}
              >
                <span>Origin and Geographical Distribution</span>
              </div>

              <p
                className={`p`}
                onClick={() => handleNavClick("phyto-capacity")}
              >
                <span>
                  Phytoremediation capacity of{" "}
                  {rightpanelcontent[0].plantNameSplit}
                </span>
              </p>

              <div
                className={`text-wrapper-6`}
                onClick={() => handleNavClick("uses-of-plant")}
              >
                <span>Uses of {rightpanelcontent[0].plantNameSplit}</span>
              </div>

              <div
                className={`text-wrapper-7`}
                onClick={() => handleNavClick("references")}
              >
                <span>Bibliography</span>
              </div>

              <div
                className={`text-wrapper-8`}
                onClick={() => handleNavClick("effect-on-health")}
              >
                <span>Effect on health</span>
              </div>

              <div
                className={`text-wrapper-9`}
                onClick={() => handleNavClick("case-study")}
              >
                <span>Case study</span>
              </div>

              <p
                className={`text-wrapper-10`}
                onClick={() => handleNavClick("phytoremediation")}
              >
                <span>
                  Phytoremediation of {leftpanelcontent[0].pollutantName}
                </span>
              </p>
            </div>
            <div className="overlap-group">
              <div
                className={`ellipse ${
                  activeSection === "about-pollutant" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-2 ${
                  activeSection === "sound-frequency" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-3 ${
                  activeSection === "effect-on-health" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-4 ${
                  activeSection === "case-study" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-5 ${
                  activeSection === "phytoremediation" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-6 ${
                  activeSection === "plant-name" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-7 ${
                  activeSection === "common-names" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-8 ${
                  activeSection === "plant-habitat" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-9 ${
                  activeSection === "origin" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-10 ${
                  activeSection === "phyto-capacity" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-11 ${
                  activeSection === "uses-of-plant" ? "active" : ""
                }`}
              />
              <div
                className={`ellipse-12 ${
                  activeSection === "references" ? "active" : ""
                }`}
              />
            </div>
          </div>
        </div>

        <div className="content-sections">
          <div>
            {!state && (
              <div
                className="mobile-tab-only"
                style={{
                  position: "fixed",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 1300,
                }}
              >
                <div
                  className="toggleDrawerArrowwhite toggleDrawerArrowblack"
                  onClick={toggleDrawer("right", true)}
                >
                  <img src="./leftarrow.png" className="arrowblack" />
                  <img src="./leftarrowblack.png" className="arrowwhite" />
                </div>
              </div>
            )}
          </div>

          <div className="bottom-section1" id="about-pollutant">
            <AboutPollutantSection
              sections={aboutpollutantcontent}
              wasteTypeIcon={wasteTypeData.atomImage}
            />
          </div>
          <div className="sound-frequency-section" id="sound-frequency">
            <SoundFrequency sections={sinewavefreq} />
          </div>
          <div className="effect-on-health-section" id="effect-on-health">
            <Box sections={effectonhealthcontent} />
            {/* * sizing */}
          </div>
          <div className="bottom-section3" id="case-study">
            <CaseStudies sections={casestudiescontent} /> {/* * text overlap */}
          </div>
          <div className="bottom-section4" id="phytoremediation">
            <Phyto
              sections={phytocontent}
              pollutantName={leftpanelcontent[0].pollutantName}
            />{" "}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="down_arrowstart">
                {/* <img src={'../public/down-arrow.svg'}/> */}
                <div
                  style={{
                    background: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0px 10px",
                  }}
                  onClick={() => {
                    handleNavClick("plant-habitat");
                  }}
                >
                  <p className="bibliograhy" style={{ color: "#000" }}>
                    BIBLIOGRAHY
                  </p>
                </div>
              </div>
            </div>
            {/* * time period overlap */}
          </div>
          <div className="white-container">
            <div className="bottom-section5" id="plant-name">
              <div className="content-container">
                <AboutPlant
                  sections={aboutplantcontent}
                  wasteTypeIcon={wasteTypeData.atomImage}
                />
              </div>
            </div>
            <div className="bottom-section6" id="common-names">
              <CommonNames sections={commonname} />
            </div>
            <div className="bottom-section7" id="plant-habitat">
              <PlantHabitat sections={habitat} />
            </div>
            <div className="bottom-section8" id="origin">
              <Origin sections={geographicaldistribution} />
            </div>
            <div className="bottom-section9" id="phyto-capacity">
              <PhytoCapacity sections={sectionphyto} />
            </div>
            <div className="bottom-section10" id="uses-of-plant">
              <UsesOfPlant sectionsData={plantUses} />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{
          className: "customDrawer --blackmodel",
        }}
      >
        <div className="timeline-drawer">
          <div className="timeline-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                paddingRight: "55px",
                marginBottom: "20px",
              }}
            >
              <span className={`flex-1 `} style={{ fontSize: "14px" }}>
                &#10100;Split Page&#125;
              </span>
              <span
                className="ml-4 bg-white"
                style={{ background: "#fff", zIndex: 99 }}
              >
                ◯
              </span>
            </div>
            <ul
              style={{
                listStyleType: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                padding: 0,
                gap: "90px",
                paddingRight: "85px",
              }}
            >
              {options.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === options.length - 1;
                return (
                  <li
                    key={idx}
                    onClick={() => handleNavClick(item?.id)}
                    className="flex items-center justify-between w-full max-w-xs"
                    style={{
                      width: "100%",
                      alignItems: "baseline",
                      gap: idx !== 0 ? "70px" : "10px",
                      display: "flex",
                    }}
                  >
                    <span
                      className={`flex-1 `}
                      style={{
                        fontSize: idx == 0 ? "24px" : "14px",
                        width: idx !== 0 ? "104px" : "",
                        textAlign: "end",
                        transform:
                          idx !== 0 && !isLast
                            ? "translateX(62px)"
                            : isLast
                            ? "translateX(49px)"
                            : "none",
                      }}
                    >
                      {item.label}
                    </span>
                    <span className="ml-4  --blackviews">◯</span>
                  </li>
                );
              })}
            </ul>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "9px",
                gap: "20px",
                marginBottom: "20px",
                paddingRight: "55px",
              }}
            >
              <span className="ml-4">◯</span>

              <span className={`flex-1 `} style={{ fontSize: "14px" }}>
                Bibliography
              </span>
            </div>

            {/* Vertical line */}
            <div className="timeline-line" />
          </div>

          <div className="close-button" onClick={toggleDrawer(false)}>
            <p>Close</p>
          </div>
        </div>
        <div className="timelinewhite-drawer">
          <div className="timeline-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                // paddingRight: "55px",
                marginBottom: "20px",
                paddingRight: "4px",
              }}
            >
              <span className={`flex-1 `} style={{ fontSize: "14px" }}>
                &#10100;Split Page&#125;
              </span>
              <span className="ml-4 --VIEWSSS">◯</span>
            </div>
            <ul
              style={{
                listStyleType: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                padding: 0,
                gap: "90px",
                padding: "0px",
                transform: "translateX(85px)",
                background: "#fff0",
                color: "#fff",
                zIndex: 9,
                // opacity:0.7
                // paddingRight: "85px",
                // transform:"translateX(10)"
              }}
            >
              {option.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === option.length - 1;
                return (
                  <li
                    key={idx}
                    onClick={() => handleNavClick(item?.id)}
                    className="flex items-center justify-between w-full max-w-xs"
                    style={{
                      width: "100%",
                      alignItems: "baseline",
                      gap: idx !== 0 ? "9px" : "10px",
                      display: "flex",
                      background: "#000",
                      color: "#fff",
                      zIndex: 99,
                    }}
                  >
                    <p
                      className="ml-4"
                      style={{ background: "#000", zIndex: 99 }}
                    >
                      ◯
                    </p>

                    <span
                      className={`flex-1 `}
                      style={{
                        fontSize: idx == 0 ? "24px" : "14px",
                        width: idx !== 0 ? "104px" : "",
                        // textAlign: "end",
                      }}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "9px",
                gap: "20px",
                paddingRight: "14px",
                marginBottom: "20px",
              }}
            >
              <span className="ml-4">◯</span>

              <span className={`flex-1 `} style={{ fontSize: "14px" }}>
                Bibliography
              </span>
            </div>

            {/* Vertical line */}
            <div className="timeline-line" />
          </div>

          <div className="close-button" onClick={toggleDrawer(false)}>
            <p>Close</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default PollutantPage;
