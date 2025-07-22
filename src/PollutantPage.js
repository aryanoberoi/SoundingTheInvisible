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
import Pollutantburger from "./Pollutantburger.png"; // Sound button
import { useParams } from "react-router-dom";
import { Drawer, styled } from "@mui/material";
import MobileRightPanel from "./PollutantPage/MobileRightPanel";
import MobileLeftPanel from "./PollutantPage/MobileLeftPanel";
import { KnowMoreButton } from "./PollutantPage/Knowmorebutton";
import SineWaveVisualizer from "./PollutantPage/sinwave";
import { PlantInfoSection } from "./PollutantPage/PlantInfoSection";
import tempIcon from "./PollutantPage/temp.png";
import humidityIcon from "./PollutantPage/humidity.png";
import soilIcon from "./PollutantPage/soil.png";
import areaIcon from "./PollutantPage/area.png";
import fb from "./facebook-f-brands.png";
import fbblack from "./facebook-f-brandsblack.png";
import In from "./instagram-brands.png";
import Inblack from "./instagram-brandsblack.png";
import tw from "./x-twitter-brands.png";
import twblack from "./x-twitter-brandsblack.png";
import sh from "./share-from-square-regular.png";
import shblack from "./share-from-square-regularblack.png";
import back from "./back.png";
import backwhite from "./backwhite.png";
import split_img from "./split_img.png";
import PreventPullToRefresh from "./PreventPullToRefresh";
import DownArrow from "./PollutantPage/down-arrow.svg";

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
  const [containerHeight, setContainerHeight] = useState("0vh");
  const [leftPanelLoaded, setLeftPanelLoaded] = useState(false); // Track left panel load
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false); // Track right panel load
  const [state, setState] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSplit, setIsSplit] = useState(true);
  const [isSplits, setIsSplits] = useState("slider-container");

  // Add a resize observer ref
  const resizeObserverRef = useRef(null);

  // Refs for panels to measure their heights
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const sliderBarRef = useRef(null); // Add this new ref
  const lastPositionRef = useRef(sliderPosition); // Add ref to track latest position
  const navBarRef = useRef(null); // New ref for implementing fallback sticky behavior

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

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
  // Helper function to return "Work in Progress" if value is empty, null, or undefined
  const wip = (val, fallback = "Work in Progress") =>
    val === undefined ||
      val === null ||
      (typeof val === "string" && val.trim() === "")
      ? fallback
      : val;

  const dataContext = {
    pollutant: {
      name: wip(matchedRow.Pollutantname_split),
      image: wip(matchedRow.image_split_pollutant),
      description: wip(matchedRow.pollutant_description_split),
      wasteType: wip(wasteTypeData.typeOfWaste),
      atomImage: wip(wasteTypeData.atomImage),
      effects: {
        summary: wip(matchedRow.effects_on_human_Health_description_split),
        details: [
          wip(matchedRow.healtheffects_1),
          wip(matchedRow.healtheffects_2),
          ...Array(9)
            .fill(0)
            .map((_, i) => wip(matchedRow[`healtheffects_${i + 3}`]))
            .filter(Boolean),
        ].filter((t) => t && t !== "Work in Progress"),
      },
      sources: wip(matchedRow.sources_venice_Description_split),
      soundFrequency: {
        enthalpy: wip(matchedRow.Enthalpy_),
        frequency: wip(matchedRow.Sound_Frequency),
        wave: wip(matchedRow.SineWaveVisualizer_frequency_audiblefrequency),
      },
      caseStudies: {
        venice: wip(matchedRow.CaseStudies_venice_lagoon),
        area: wip(matchedRow.CaseStudies_area),
      },
      phytoSpecies: Array(6)
        .fill(0)
        .map((_, i) => ({
          medium: wip(matchedRow[`Phyto_Species${i + 1}_medium`]),
          timePeriod: wip(matchedRow[`Phyto_Species${i + 1}_timePeriod`]),
          remediation: wip(matchedRow[`Phyto_Species${i + 1}_remediation`]),
        }))
        .filter(
          (item) =>
            (item.medium && item.medium !== "Work in Progress") ||
            (item.timePeriod && item.timePeriod !== "Work in Progress") ||
            (item.remediation && item.remediation !== "Work in Progress")
        ),
      about: {
        description: wip(matchedRow.AboutPollutantSection_description),
        image: wip(matchedRow.AboutPollutantSection_image),
      },
    },

    plant: {
      name: wip(matchedRow.plantName_Split),
      latinName: wip(matchedRow.plant_name),
      image: wip(matchedRow.image_split_plant),
      details: wip(matchedRow.split_plant_details),
      wetlandDescription: wip(matchedRow.plantData_WetlandDescription_split),
      phytoCapacity: wip(matchedRow.phytoremediation_capacity_split),
      habitat: {
        temperature: wip(matchedRow.PlantHabitat_temperature),
        humidity: wip(matchedRow.PlantHabitat_humidity_moisture),
        soil: wip(matchedRow.PlantHabitat_soil),
        ph: wip(matchedRow.PlantHabitat_pH),
        details: Array(5)
          .fill(0)
          .map((_, i) => ({
            title: wip(matchedRow[`PlantHabitat_title${i + 1}`]),
            content: wip(matchedRow[`PlantHabitat_content${i + 1}`]),
          }))
          .filter(
            (item) =>
              (item.title && item.title !== "Work in Progress") ||
              (item.content && item.content !== "Work in Progress")
          ),
      },
      about: {
        description: wip(matchedRow.AboutPlant_description),
        status: wip(matchedRow.AboutPlant_WetlandStatus),
        image: wip(matchedRow.Image_About_atom_compound),
      },
      commonNames: Array(19)
        .fill(0)
        .map((_, i) => wip(matchedRow[`CommonNames_content${i}`]))
        .filter((val) => val && val !== "Work in Progress"),
      geographicalDistribution: wip(matchedRow.Geographicaldistribution_text),
      phytoCapacityDetails: {
        description: wip(matchedRow.PhytoCapacity_description),
        paragraphs: Array(11)
          .fill(0)
          .map((_, i) => wip(matchedRow[`PhytoCapacity_contentPara${i + 1}`]))
          .filter((val) => val && val !== "Work in Progress"),
      },
    },
  };

  // Update the leftpanelcontent to use the new dataContext
  const leftpanelcontent = [
    {
      pollutantimagedesktop: matchedRow.desktop_pollutant_image,
      pollutantimagemobile: matchedRow.mobile_pollutant_image,
      maskedimagemobile: matchedRow.Pollutants_mobile_masked,
      tankNumber: matchedRow.type_of_waste,
      pollutantNumber: wip(matchedRow.Number),
      pollutantName:
        wip(matchedRow.Pollutantname_split) ||
        wip(matchedRow.id) ||
        "Work in Progress",
      typeOfWaste: wip(wasteTypeData.typeOfWaste),
      atomImage: wip(wasteTypeData.atomImage),
      pollutantDescription: wip(matchedRow.pollutant_description_split),
      effect: wip(matchedRow.effects_on_human_Health_description_split),
      sources: wip(matchedRow.sources_venice_Description_split),
    },
  ];

  // Update the rightpanelcontent to use the new dataContext ok
  const rightpanelcontent = [
    {
      plantimagemobile: matchedRow.mobile_plant_image,
      plantimagedesktop: matchedRow.desktop_plant_image,
      maskedimagemobile: matchedRow.Plants_mobile_masked,
      plantNameSplit: wip(dataContext.plant.name),
      wetlandDescription: wip(dataContext.plant.wetlandDescription),
      phytoCapacity: wip(dataContext.plant.phytoCapacity),
      temperature: wip(dataContext.plant.habitat.temperature),
      humidity: wip(dataContext.plant.habitat.humidity),
      soil: wip(dataContext.plant.habitat.soil),
      ph: wip(dataContext.plant.habitat.ph),
      imgUrl: wip(dataContext.plant.image),
      plantName: wip(dataContext.plant.latinName),
      plantDetails: wip(dataContext.plant.details),
    },
  ];

  // Check if we have an image from the database, otherwise try to determine one based on pollutant type
  const pollutantImage =
    wip(matchedRow.AboutPollutantSection_image, null) ||
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
        wip(dataContext.pollutant.about.description) ||
        `About ${wip(pollutantNameRaw)}`,
      image: wip(dataContext.pollutant.about.image),
    },
  ];

  // Debug log to verify image path
  console.log(
    `Using pollutant image: ${pollutantImage} for ${pollutantNameRaw}`
  );

  // Update sinewavefreq to use the new dataContext
  const sinewavefreq = [
    {
      pollutantName: wip(dataContext.pollutant.name),
      enthalpy: wip(dataContext.pollutant.soundFrequency.enthalpy),
      soundfrequency: wip(dataContext.pollutant.soundFrequency.wave),
      wavefrequency: wip(dataContext.pollutant.soundFrequency.frequency),
    },
  ];

  // Update effectonhealthcontent to use the new dataContext
  const effectonhealthcontent = dataContext.pollutant.effects.details.length
    ? dataContext.pollutant.effects.details.map((text) => ({
      text: wip(text),
    }))
    : [{ text: "Work in Progress" }];

  // Update casestudiescontent to use the new dataContext
  const casestudiescontent = [
    { text: wip(dataContext.pollutant.caseStudies.venice) },
    { text: wip(dataContext.pollutant.caseStudies.area) },
  ];

  // Update phytocontent to use the new dataContext
  const phytocontent =
    dataContext.pollutant.phytoSpecies.length > 0
      ? dataContext.pollutant.phytoSpecies
      : [{ medium: "Work in Progress", timePeriod: "", remediation: "" }];

  // Update aboutplantcontent to use the new dataContext
  const aboutplantcontent = [
    {
      plant_name: wip(dataContext.plant.name),
      description: wip(dataContext.plant.about.description),
      status: wip(dataContext.plant.about.status),
      peephole: wip(dataContext.plant.about.image),
    },
  ];

  // Update commonname to use the new dataContext
  const commonname = [
    { plantName: wip(dataContext.plant.name) },
    ...(dataContext.plant.commonNames.length
      ? dataContext.plant.commonNames.map((text) => ({ text: wip(text) }))
      : [{ text: "Work in Progress" }]),
  ];

  // Update habitat to use the new dataContext
  const habitat = [
    { plantName: wip(dataContext.plant.name) },
    ...(dataContext.plant.habitat.details.length
      ? dataContext.plant.habitat.details
      : [{ title: "Work in Progress", content: "" }]),
  ];

  // Update geographicaldistribution to use the new dataContext
  const geographicaldistribution = [
    { text: wip(dataContext.plant.geographicalDistribution) },
  ];

  // Update sectionphyto to use the new dataContext
  const sectionphyto = [
    {
      type: "intro",
      text: wip(dataContext.plant.phytoCapacityDetails.description),
    },
    { plantName: wip(dataContext.plant.name) },
    ...(dataContext.plant.phytoCapacityDetails.paragraphs.length
      ? dataContext.plant.phytoCapacityDetails.paragraphs.map((text) => ({
        text: wip(text),
      }))
      : [{ text: "Work in Progress" }]),
  ];

  // More efficient structure for plant uses
  const plantUses = {
    plantName: wip(dataContext.plant.name),
    bibliography: wip(matchedRow.Bibliography),
    sections: [
      {
        id: "nutritional",
        title: "NUTRITIONAL",
        flavourtext: wip(matchedRow.Nutritional_flavourtext),
        items: Array(10)
          .fill(0)
          .map((_, i) => ({
            header: wip(matchedRow[`UsesOfPlant_nutritional_title${i + 1}`]),
            text: wip(
              matchedRow[`UsesOfPlant_nutritional_description${i + 1}`]
            ),
          }))
          .filter((item) => item.text && item.text !== "Work in Progress"),
      },
      {
        id: "medicine",
        title: "MEDICINE",
        flavourtext: wip(matchedRow.UsesOfPlant_medicinal_flavourtext),
        items: Array(10)
          .fill(0)
          .map((_, i) => ({
            header: wip(matchedRow[`UsesOfPlant_title${i + 1}`]),
            text: wip(matchedRow[`UsesOfPlant_description${i + 1}`]),
          }))
          .filter((item) => item.text && item.text !== "Work in Progress"),
      },
      {
        id: "additional",
        title: "ADDITIONAL",
        items: Array(11)
          .fill(0)
          .map((_, i) => ({
            header: wip(matchedRow[`Add_UsesOfPlant_title${i + 1}`]),
            text: wip(matchedRow[`Add_UsesOfPlant_description${i + 1}`]),
          }))
          .filter((item) => item.text && item.text !== "Work in Progress"),
      },
    ],
  };

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  useEffect(() => {
    // Set the initial rotation CSS variable directly on mount
    document.documentElement.style.setProperty("--rotation", `180deg`);
    // Add slider transition variable for dynamic control
    document.documentElement.style.setProperty(
      "--slider-transition",
      "left 0.3s ease-in-out"
    );

    // Clean up on unmount
    return () => { };
  }, [isMobileView]); // Initial setup effect, height update logic moved

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is currently intersecting
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        // If an intersecting entry is found, update the active section
        if (intersectingEntry) {
          setActiveSection(intersectingEntry.target.id);
        }
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

  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = (newPosition) => {
    // const clampedPosition = Math.max(0, Math.min(100, newPosition));
    const clampedPosition = Math.max(
      isMobileView ? 20 : 0,
      Math.min(100, newPosition)
    );
    console.log("clampedPosition", clampedPosition, newPosition, newPosition !== null);
    document.documentElement.style.setProperty(
      "--slider-position",
      `${clampedPosition}%`
    );
    if (isMobileView && newPosition == 0) {
      console.log("newPosition");
      const newRotations = newPosition == 0 ? 18 : 90; // Or a calculated value
      document
        .querySelector(".slider-image-container")
        ?.style.setProperty("transform", `rotate(${newRotations}deg)`);
    }
    setSliderPosition(clampedPosition);

    document.body.classList.remove(
      "sound-top-region",
      "sound-middle-region",
      "sound-bottom-region"
    );

    if (clampedPosition < 25) {
      document.body.classList.add("sound-top-region");
    } else if (clampedPosition >= 95) {
      document.body.classList.add("sound-bottom-region");
    } else {
      document.body.classList.add("sound-middle-region");
    }

    if (clampedPosition < 50) {
      document.body.classList.add("white-panel-active");
      document.body.classList.remove("black-panel-active");
    } else {
      document.body.classList.add("black-panel-active");
      document.body.classList.remove("white-panel-active");
    }

    document.body.classList.toggle(
      "bottom-panel-active",
      clampedPosition >= 97
    );
    document.body.classList.remove("sound-panel-active");

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
    lastPositionRef.current = sliderPosition;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = document.getElementById("slider-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let newPosition = ((e.clientY - rect.top) / rect.height) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));

    updateSliderPosition(newPosition);
    lastPositionRef.current = newPosition;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const currentPosition = lastPositionRef.current;
    const thresholdTop = 25;
    const thresholdBottom = 75;
    const snapTop = 0;
    const snapMiddle = 50;
    const snapBottom = 100;

    let snapTarget;
    if (currentPosition <= thresholdTop) {
      snapTarget = snapTop;
    } else if (currentPosition > thresholdBottom) {
      snapTarget = snapBottom;
    } else {
      snapTarget = snapMiddle;
    }

    updateSliderPosition(snapTarget);
  };

  const updateContainerHeight = () => {
    if (!leftPanelRef.current || !rightPanelRef.current) return;

    const leftRect = leftPanelRef.current.getBoundingClientRect();
    const rightRect = rightPanelRef.current.getBoundingClientRect();

    const leftPanelHeight = leftRect.height;
    const rightPanelHeight = rightRect.height;

    const maxHeight = Math.max(
      leftPanelHeight,
      rightPanelHeight,
      window.innerHeight
    );
    const finalHeight = maxHeight > 100 ? `${maxHeight}px` : "100vh";

    setContainerHeight(finalHeight);

    if (sliderContainerRef.current) {
      sliderContainerRef.current.style.height = finalHeight;
    }

    if (sliderBarRef.current) {
      sliderBarRef.current.style.height = finalHeight;
    }
  };

  useEffect(() => {
    if (leftPanelLoaded && rightPanelLoaded) {
      requestAnimationFrame(() => {
        setTimeout(updateContainerHeight, 100);
      });
    }
  }, [leftPanelLoaded, rightPanelLoaded]);

  // Mobile VIew
  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const container = document.getElementById("slider-container");
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let newPosition;
    console.log("clientY", clientY, "rect.top", rect.top);
    if (isMobileView) {
      // Vertical dragging
      // const adjustedTop = rect.top === 0 ? 15 : rect.top;
      // newPosition = ((clientY - adjustedTop) / rect.height) * 100;
      const adjustedTop = rect.top <= 0 ? 15 : rect.top;
      const diffY = clientY - adjustedTop;
      const safeDiffY = Math.max(0, diffY); // Prevent negative drag
      newPosition = (safeDiffY / rect.height) * 100;
    } else {
      // Horizontal dragging
      newPosition = ((clientX - rect.left) / rect.width) * 100;
    }
    console.log("newPosition", newPosition);
    newPosition = Math.max(0, Math.min(100, newPosition));
    updateSliderPosition(newPosition);
    lastPositionRef.current = newPosition;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handlePointerUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const currentPosition = lastPositionRef.current;

      const thresholdLow = 25;
      const thresholdHigh = 75;
      let snapTarget;
      if (currentPosition <= thresholdLow) {
        snapTarget = 0;
      } else if (currentPosition > thresholdHigh) {
        snapTarget = 100;
      } else {
        snapTarget = window.innerWidth <= 768 ? 50 : 50;
      }
      updateSliderPosition(snapTarget);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchmove", handlePointerMove, {
        passive: false,
      });
      window.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, isMobileView]);
  const handleStartDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    lastPositionRef.current = sliderPosition;
  };
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
    console.log("DDSADSDADS", sectionId);

    // Only affect isSplit on mobile
    if (isMobileView) {
      setIsSplit(sectionId == "slider-container" ? true : false);
    }
    setIsSplits(sectionId);
    const section = document.getElementById(sectionId);
    if (!section) return;
    setState(false);

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

    // Scroll to section
    section.scrollIntoView({
      behavior: "auto",
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

  const option = [
    { id: "plant-name", label: rightpanelcontent[0].plantNameSplit },
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
  console.log("isMobileView", isMobileView);

  if (leftpanelcontent.length === 0) return null;

  const {
    pollutantName = "Pollutant Name",
    pollutantDescription = "",
    effect = "",
    sources = "",
    atomImage = "",
    typeOfWaste = "",
  } = leftpanelcontent[0];

  // Process health effects into titles
  const healthEffectsTitles = effect.split("_");
  console.log("rightpanelcontent", rightpanelcontent);

  const {
    wetlandDescription = "",
    phytoCapacity = "",
    temperature = "",
    humidity = "",
    soil = "",
    ph = "",
    imgUrl = "",
    plantName = "",
    plantDetails = "",
  } = rightpanelcontent[0] || {};

  const habitatIcons = [tempIcon, humidityIcon, soilIcon, areaIcon];

  const plantData = [
    {
      title: "Wetland status:",
      description: wetlandDescription,
    },
    {
      title: `Phytoremediation capacity of ${plantName}:`,
      description: phytoCapacity.split("_").join("\n"),
    },
    {
      title: `${plantName}'s Habitat:`,
      description: [
        `Temperature: ${temperature}`,
        `Humidity: ${humidity}`,
        `Soil: ${soil}`,
        `PH Value: ${ph}`,
      ].join("\n"),
    },
  ];

  const getNavPollutantName = (name) => {
    console.log("original name for navbar", name);
    if (name === "Butylated Hydroxytoluene (BHT)") return "BHT";
    if (name.toLowerCase === "activated sludge (wastewater)")
      return "Waste Water";
    return name;
  };

  // Add computed variable here
  const navPollutantName = getNavPollutantName(
    leftpanelcontent[0]?.pollutantName || ""
  );

  const options = [
    // { id: "about-pollutant", label: "{Split Page}" },
    {
      id: "about-pollutant",
      label: leftpanelcontent[0].pollutantName,
    },
    { id: "sound-frequency", label: "Sound frequency" },
    { id: "effect-on-health", label: "Effect on health" },
    { id: "case-study", label: "Case study" },
    {
      id: "phytoremediation",
      label: "Phytoremediation of the Representative Pollutant",
    },
  ];

  return (
    <>
      <SoundToggle
        padNumber={leftpanelcontent[0].pollutantNumber}
        tankNumber={typeOfWaste}
        sliderPosition={sliderPosition}
        panelMode={sliderPosition < 50 ? "white" : "black"}
        sendPostRequest={true}
      />

      {!isMobileView ? (
        <>
          <div>
            <PreventPullToRefresh>
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
                    pollutantName={leftpanelcontent[0].pollutantName}
                    onLoad={() => setRightPanelLoaded(true)}
                    onNavigate={handleNavClick}
                  />
                </div>

                <div
                  ref={sliderBarRef}
                  className="slider-bar"
                  style={{
                    left: `${sliderPosition - 1.4}%`,
                    transform: "translateX(0%)",
                    position: "absolute",
                    transition: isDragging ? "none" : "all 0.3s ease-in-out",
                    height: containerHeight,
                    width: "45px",
                    zIndex: 9999,
                    cursor: "grab",
                  }}
                  onMouseDown={handleStartDrag}
                  onTouchStart={handleStartDrag}
                >
                  <div
                    className="slider-image-container"
                    style={{ position: "relative", top: "0px" }}
                  >
                    <img
                      src="slider.png"
                      alt="Slider"
                      className="slider-image"
                    />
                  </div>
                </div>
              </div>
            </PreventPullToRefresh>
          </div>
          <div className="combined-section" style={{ padding: "0px 10px" }}>
            <div className="nav-bar-container">
              <div className="nav-bar" ref={navBarRef}>
                <div
                  className={`nav-items-container ${isMobile ? "mobile" : ""} ${isMobile && menuOpen ? "mobile-active" : ""
                    }`}
                >
                  <div
                    className={`text-wrapper`}
                    onClick={() => handleNavClick("about-pollutant")}
                  >
                    <span>{navPollutantName}</span>
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
                    <span>Sound Frequency of {navPollutantName}</span>
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
                    <span>References</span>
                  </div>

                  <div
                    className={`text-wrapper-8`}
                    onClick={() => handleNavClick("effect-on-health")}
                  >
                    <span>Effects of {navPollutantName} on Health</span>
                  </div>

                  <div
                    className={`text-wrapper-9`}
                    onClick={() => handleNavClick("case-study")}
                  >
                    <span>Case Study of {navPollutantName}'s Pollution</span>
                  </div>

                  <p
                    className={`text-wrapper-10`}
                    onClick={() => handleNavClick("phytoremediation")}
                  >
                    <span>Plants Remediating {navPollutantName}</span>
                  </p>
                </div>
                <div className="overlap-group">
                  <div
                    className={`ellipse-0 ${activeSection === "overview" ? "active" : ""
                      }`}
                    onClick={() => {
                      console.log("Clicked ellipse - returning to top");

                      if (isMobileView) {
                        setIsSplit(true);
                      }

                      const topElement =
                        document.getElementById("slider-container");
                      if (topElement) {
                        topElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_3499_236" fill="white">
                        <path d="M10 0.59155C7.61305 0.591551 5.32387 1.53976 3.63604 3.22759C1.94821 4.91542 1 7.2046 1 9.59155C1 11.9785 1.94821 14.2677 3.63604 15.9555C5.32386 17.6433 7.61305 18.5916 10 18.5916L10 9.59155L10 0.59155Z" />
                      </mask>
                      <path
                        d="M10 0.59155C7.61305 0.591551 5.32387 1.53976 3.63604 3.22759C1.94821 4.91542 1 7.2046 1 9.59155C1 11.9785 1.94821 14.2677 3.63604 15.9555C5.32386 17.6433 7.61305 18.5916 10 18.5916L10 9.59155L10 0.59155Z"
                        fill="black"
                        stroke="white"
                        strokeWidth="2"
                        mask="url(#path-1-inside-1_3499_236)"
                      />
                      <path
                        d="M10 18.5916C12.387 18.5916 14.6761 17.6433 16.364 15.9555C18.0518 14.2677 19 11.9785 19 9.59155C19 7.20461 18.0518 4.91542 16.364 3.22759C14.6761 1.53977 12.387 0.591554 10 0.591553L10 9.59155L10 18.5916Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div
                    className={`ellipse ${activeSection === "about-pollutant" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("about-pollutant")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-2 ${activeSection === "sound-frequency" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("sound-frequency")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-3 ${activeSection === "effect-on-health" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("effect-on-health")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-4 ${activeSection === "case-study" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("case-study")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-5 ${activeSection === "phytoremediation" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("phytoremediation")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-6 ${activeSection === "plant-name" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("plant-name")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-7 ${activeSection === "common-names" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("common-names")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-8 ${activeSection === "plant-habitat" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("plant-habitat")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-9 ${activeSection === "origin" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("origin")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-10 ${activeSection === "phyto-capacity" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("phyto-capacity")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-11 ${activeSection === "uses-of-plant" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("uses-of-plant")}
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    className={`ellipse-12 ${activeSection === "references" ? "active" : ""
                      }`}
                    onClick={() => handleNavClick("references")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div>
              {!state && (
                <div
                  className="mobile-tab-only"
                  style={{
                    position: "fixed",
                    top: "88%",
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
            {window.innerWidth <= 768 ? (
              <>
                {!isSplit ? (
                  <div className="content-sections">
                    <div
                      style={{ padding: "35px 0px 0px 7px" }}
                      onClick={() => setIsSplit(true)}
                    >
                      <img src={sliderPosition == 20 ? backwhite : back} />
                    </div>
                    <div className="bottom-section1" id="about-pollutant">
                      {/* <div
                        style={{ padding: "35px 0px 0px 7px" }}
                        onClick={() => setIsSplit(true)}
                      >
                        <img src={backwhite} />
                      </div> */}
                      <AboutPollutantSection
                        sections={aboutpollutantcontent}
                        wasteTypeIcon={wasteTypeData.atomImage}
                      />
                      {/* common names */}
                      <CommonNames sections={commonname} />
                    </div>
                    <div
                      className="sound-frequency-section"
                      id="sound-frequency"
                    >
                      <SoundFrequency sections={sinewavefreq} />
                    </div>
                    <div
                      className="effect-on-health-section"
                      id="effect-on-health"
                    >
                      <Box
                        sections={effectonhealthcontent}
                        pollutantName={leftpanelcontent[0].pollutantName}
                      />
                    </div>
                    <div className="bottom-section3" id="case-study">
                      <CaseStudies
                        sections={casestudiescontent}
                        pollutantName={leftpanelcontent[0].pollutantName}
                      />
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
                            <p
                              className="bibliograhy"
                              style={{ color: "#000" }}
                            >
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
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div className="content-sections">
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
                  <Box
                    sections={effectonhealthcontent}
                    pollutantName={leftpanelcontent[0].pollutantName}
                  />
                </div>
                <div className="bottom-section3" id="case-study">
                  <CaseStudies
                    sections={casestudiescontent}
                    pollutantName={leftpanelcontent[0].pollutantName}
                  />
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
                  {/* <div
                    style={{ padding: "35px 0px 0px 7px" }}
                    onClick={() => setIsSplit(true)}
                  >
                    <img src={backwhite} />
                  </div> */}
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
            )}
          </div>
        </>
      ) : (
        <>
          {isSplit ? (
            <>
              <div>
                {sliderPosition !== 20 && sliderPosition !== 100 ? (
                  <PreventPullToRefresh>
                    <div
                      id="slider-container"
                      className="slider-container"
                      ref={sliderContainerRef}
                      style={{ height: containerHeight }}
                    >
                      <div ref={leftPanelRef}>
                        {window.innerWidth <= 768 ? (
                          <MobileLeftPanel
                            sections={leftpanelcontent}
                            onLoad={() => setLeftPanelLoaded(true)}
                            onNavigate={handleNavClick}
                            view={sliderPosition == 20}
                          />
                        ) : (
                          <LeftPanel
                            sections={leftpanelcontent}
                            onLoad={() => setLeftPanelLoaded(true)}
                            onNavigate={handleNavClick}
                          />
                        )}
                      </div>
                      <div ref={rightPanelRef}>
                        {window.innerWidth <= 768 ? (
                          <MobileRightPanel
                            sections={rightpanelcontent}
                            pollutantName={leftpanelcontent[0].pollutantName}
                            onLoad={() => setRightPanelLoaded(true)}
                            onNavigate={handleNavClick}
                            view={sliderPosition == 20}
                          />
                        ) : (
                          <RightPanel
                            sections={rightpanelcontent}
                            pollutantName={leftpanelcontent[0].pollutantName}
                            onLoad={() => setRightPanelLoaded(true)}
                            onNavigate={handleNavClick}
                          />
                        )}
                      </div>

                      <div
                        ref={sliderBarRef}
                        className="slider-bar"
                        style={{
                          ...(isMobileView
                            ? {
                              top: `${sliderPosition}%`,
                              transform: "translateY(-50%)",
                              left: "46%",
                            }
                            : {
                              left: `${sliderPosition}%`,
                              transform: "translateX(0%)",
                            }),
                          position: "absolute",
                          transition: isDragging
                            ? "none"
                            : "all 0.3s ease-in-out",
                          height: isMobileView ? "32px" : containerHeight,
                          width: isMobileView ? "10%" : "42px",
                          zIndex: 10,
                          cursor: "grab",
                        }}
                        onMouseDown={handleStartDrag}
                        onTouchStart={handleStartDrag}
                      >
                        <div
                          className="slider-image-container"
                          style={{
                            position: "relative",
                            top: "0px",
                            zIndex: 9999,
                          }}
                        >
                          <img
                            src="slider.png"
                            alt="Slider"
                            className="slider-image"
                            style={{ zIndex: 999 }}
                          />
                        </div>
                      </div>
                    </div>
                  </PreventPullToRefresh>
                ) : (
                  <div
                    id="slider-container"
                    className="slider-container"
                    ref={sliderContainerRef}
                    style={{ height: containerHeight }}
                  >
                    <div ref={leftPanelRef}>
                      {window.innerWidth <= 768 ? (
                        <MobileLeftPanel
                          sections={leftpanelcontent}
                          onLoad={() => setLeftPanelLoaded(true)}
                          onNavigate={handleNavClick}
                          view={sliderPosition == 20}
                        />
                      ) : (
                        <LeftPanel
                          sections={leftpanelcontent}
                          onLoad={() => setLeftPanelLoaded(true)}
                          onNavigate={handleNavClick}
                        />
                      )}
                    </div>
                    <div ref={rightPanelRef}>
                      {window.innerWidth <= 768 ? (
                        <MobileRightPanel
                          sections={rightpanelcontent}
                          pollutantName={leftpanelcontent[0].pollutantName}
                          onLoad={() => setRightPanelLoaded(true)}
                          onNavigate={handleNavClick}
                          view={sliderPosition == 20}
                        />
                      ) : (
                        <RightPanel
                          sections={rightpanelcontent}
                          pollutantName={leftpanelcontent[0].pollutantName}
                          onLoad={() => setRightPanelLoaded(true)}
                          onNavigate={handleNavClick}
                        />
                      )}
                    </div>

                    <div
                      ref={sliderBarRef}
                      className="slider-bar"
                      style={{
                        ...(isMobileView
                          ? {
                            top: `${sliderPosition}%`,
                            transform: "translateY(-49.1%)",
                            left: "46%",
                          }
                          : {
                            left: `${sliderPosition}%`,
                            transform: "translateX(0%)",
                          }),
                        position: "absolute",
                        transition: isDragging
                          ? "none"
                          : "all 0.3s ease-in-out",
                        height: isMobileView ? "32px" : containerHeight,
                        width: isMobileView ? "10%" : "42px",
                        zIndex: 10,
                        cursor: "grab",
                      }}
                      onMouseDown={handleStartDrag}
                      onTouchStart={handleStartDrag}
                    >
                      <div
                        className="slider-image-container"
                        style={{
                          position: "relative",
                          top: "0px",
                          zIndex: 9999,
                        }}
                      >
                        <img
                          src="slidermobile.png"
                          alt="Slider"
                          className="slider-image"
                          style={{ zIndex: 999 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* </ConditionalWrapper> */}
              </div>
              {isMobileView ? (
                <>
                  {sliderPosition == 100 ? (
                    <div className="container" style={{ zIndex: -9999 }}>
                      <div className="row" style={{ marginTop: "3em", marginLeft: "1em" }}>
                        <div className="col-lg-12">
                          <div style={{ width: "40px", height: "40px" }}>
                            <img
                              src={Pollutantburger}
                              alt="pollutant"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "13px",
                              fontWeight: "100",
                              marginTop: "12px",
                              fontFamily: "clash grotesk",
                              lineHeight: "100%",
                              letterSpacing: "0.2px",
                              opacity: "0.9",
                            }}
                          >
                            Pollutant
                          </p>
                          <h1
                            style={{
                              color: "#fff",
                              fontSize: "32px",
                              fontWeight: "300",
                              marginTop: "-2px",
                            }}
                          >
                            {pollutantName}
                          </h1>
                          <div
                            className="description"
                            style={{ width: "100%" }}
                          >
                            {pollutantDescription}
                          </div>
                          <div
                            className="sectionTitleLeftPanel"
                            style={{ color: "#fff", textAlign: "left", marginTop: "32px", marginBottom: "12px" }}
                          >
                            Effects of {pollutantName} on human health:
                          </div>
                          <div
                            className="titleList"
                            style={{ color: "#fff", textAlign: "left", fontSize: "18px" }}
                          >
                            {healthEffectsTitles.map((title, index) => (
                              <div
                                key={index}
                                className="titleEntry"
                                style={{ color: "#fff", textAlign: "left" }}
                              >
                                <div className="bulletcircle" />
                                <span
                                  className="titleTextSC"
                                  style={{ color: "#fff", textAlign: "left" }}
                                >
                                  {title}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div
                            className="sectionTitleLeftPanel"
                            style={{
                              paddingBottom: "20px",
                              color: "#fff",
                              textAlign: "left",
                            }}
                          >
                            Sound Frequency of {pollutantName}
                            <br />
                          </div>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "260px",
                              height: "50px",
                              overflow: "hidden",
                            }}
                          >
                            <SineWaveVisualizer />
                          </div>
                          <div
                            className="sourcesTitle"
                            style={{
                              color: "#fff",
                              textAlign: "left",
                              margin: 0,
                              marginTop: "55px",
                              marginBottom: "12px"
                            }}
                          >
                            Sources of {pollutantName} In Venice Lagoon:
                          </div>
                          <div
                            className="sourcesDescription"
                            style={{
                              color: "#fff",
                              textAlign: "left",
                              marginTop: "12px",
                              marginBottom: "12px",
                              width: "100%",
                            }}
                          >
                            {sources}
                          </div>
                        </div>
                        <div
                          className="col-lg-12 pb-5 mb-5"
                          style={{ marginBottom: "20px", marginTop: "133px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: "20px",
                              marginTop: "30px",
                              marginBottom: "20px"
                            }}
                          >
                            <img
                              src={fb}
                              alt="Pollutant visual"
                              style={{ width: "15px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={In}
                              alt="Pollutant visual"
                              style={{ width: "21px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={tw}
                              alt="Pollutant visual"
                              style={{ width: "24px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={sh}
                              alt="Pollutant visual"
                              style={{ width: "27px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                          </div>
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "14px",
                              fontWeight: "378",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "4px"
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: "27px",
                                width: "32px",
                                textAlign: "center"
                              }}
                            >
                              &#169;
                            </span>

                            <b style={{ fontWeight: "300" }}>NANDITA KUMAR</b>

                            <span
                              style={{
                                fontWeight: "100",
                                color: "rgba(255, 255, 255, 0.5)" // light gray for soft look
                              }}
                            >
                              2025
                            </span>
                          </p>

                        </div>
                      </div>
                    </div>
                  ) : sliderPosition == 20 ? (
                    <div
                      className=""
                      style={{
                        background: "#fff",
                        padding: "5%",
                        marginTop: "-20px",
                      }}
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <p style={{
                            margin: "60px 0 2px 0",
                            fontFamily: "Clash Grotesk",
                            fontSize: "13px",
                            fontWeight: "400",

                          }}>
                            Plant</p>
                          <h3
                            style={{
                              color: "#000",
                              fontFamily: "Nippo",
                              fontSize: "32px",
                              fontStyle: "normal",
                              fontWeight: "300",
                              // lineHeight: "normal",
                              letterSpacing: "0.96px",
                              margin: "0px 0px 2px 0px",
                              padding: 0,
                            }}
                          >
                            {rightpanelcontent[0].plantName}
                          </h3>
                          <p style={{
                            fontSize: "13px",
                            fontFamily: "Clash Grotesk",
                            fontWeight: "400",
                            margin: "0 0 20px 0"
                          }}>
                            Remediation of {rightpanelcontent[0].plantName}</p>
                          <p
                            style={{
                              color: "#000",
                              fontFamily: "Chivo Mono",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: "400",
                              lineHeight: "165.091%",
                              marginBottom: "32px"
                            }}
                          >
                            {rightpanelcontent[0].plantDetails}
                          </p>
                        </div>
                        <div className="col-lg-12">
                          <aside className="sidebar">
                            {plantData.map((section, index) => {
                              if (index >= 1) {
                                let targetId = "";
                                if (index === 1) {
                                  targetId = "phyto-capacity";
                                } else if (index === 2) {
                                  targetId = "plant-habitat";
                                }

                                return (
                                  <div style={{ marginBottom: "32px" }} key={index}>
                                    <div style={{
                                      marginTop: "0px",
                                      fontSize: "18px",
                                      fontFamily: "Nippo-regular",
                                      marginBottom: "12px"
                                    }}
                                      className="sectionTitle">
                                      {section.title}
                                    </div>
                                    <div className="titleListRightPanel">
                                      {index === 1 ? (
                                        <ul>
                                          {section.description
                                            .split("\n")
                                            .map((line, lineIndex) => (
                                              <li
                                                key={lineIndex}
                                                className="titleListRightPanel"
                                              >
                                                {line}
                                              </li>
                                            ))}
                                        </ul>
                                      ) : (
                                        section.description
                                          .split("\n")
                                          .map((line, lineIndex) => (
                                            <div
                                              key={lineIndex}
                                              className="titleEntry --bullet-points"
                                            >
                                              <div className="rightPanel-bullet">
                                                <img
                                                  src={habitatIcons[lineIndex]}
                                                  alt={`icon-${lineIndex}`}
                                                  style={{
                                                    width: "31.4px",
                                                    height: "21.43px%",
                                                    objectFit: "contain",
                                                  }}
                                                />
                                              </div>
                                              <span style={{ marginBottom: "8px", paddingTop: "7px" }} className="titleTextRightPanel">
                                                {line}
                                              </span>
                                            </div>
                                          ))
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <PlantInfoSection
                                  key={index}
                                  title={section.title}
                                  description={section.description}
                                  showKnowMore={false}
                                />
                              );
                            })}
                          </aside>
                        </div>
                        <div
                          className="col-lg-12 pb-5 mb-5"
                          style={{ marginBottom: "25px", marginTop: "72px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: 20,
                              marginTop: 20,
                            }}
                          >
                            <img
                              src={fbblack}
                              alt="Pollutant visual"
                              style={{ width: "15px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={Inblack}
                              alt="Pollutant visual"
                              style={{ width: "21px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={twblack}
                              alt="Pollutant visual"
                              style={{ width: "24px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={shblack}
                              alt="Pollutant visual"
                              style={{ width: "27px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                          </div>
                          <p
                            style={{
                              color: "#000",
                              fontSize: "14px",
                              fontWeight: "378",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "4px"
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: "24px",
                                width: "18px",
                                textAlign: "center"
                              }}
                            >
                              &#169;
                            </span>

                            <b style={{ fontWeight: "378" }}>NANDITA KUMAR</b>

                            <span style={{ color: "rgba(0,0,0,0.8)", fontWeight: "340" }}>
                              2025
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          {isMobile ? (
            <></>
          ) : (
            <div className="combined-section" style={{ padding: "0px 10px" }}>
              <div className="nav-bar-container">
                <div className="nav-bar" ref={navBarRef}>
                  <div
                    className={`nav-items-container ${isMobile ? "mobile" : ""
                      } ${isMobile && menuOpen ? "mobile-active" : ""}`}
                  >
                    {/* <div 
                    className="text-wrapper-combined"
                    onClick={() => handleNavClick("overview")}
                  >
                    <span>{leftpanelcontent[0].pollutantName} + {rightpanelcontent[0].plantNameSplit}</span>
                  </div> */}
                    <div
                      className={`text-wrapper`}
                      onClick={() => handleNavClick("about-pollutant")}
                    >
                      <span>{navPollutantName}</span>
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
                      <span>Sound Frequency of {navPollutantName}</span>
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
                      <span>
                        {rightpanelcontent[0].plantNameSplit}'s Habitat
                      </span>
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
                      <span>References</span>
                    </div>

                    <div
                      className={`text-wrapper-8`}
                      onClick={() => handleNavClick("effect-on-health")}
                    >
                      <span>Effects of {navPollutantName} on Health</span>
                    </div>

                    <div
                      className={`text-wrapper-9`}
                      onClick={() => handleNavClick("case-study")}
                    >
                      <span>Case Study of {navPollutantName}'s Pollution</span>
                    </div>

                    <p
                      className={`text-wrapper-10`}
                      onClick={() => handleNavClick("phytoremediation")}
                    >
                      <span>Plants Remediating {navPollutantName}</span>
                    </p>
                  </div>
                  <div className="overlap-group">
                    <div
                      className={`ellipse-0 ${activeSection === "overview" ? "active" : ""
                        }`}
                      onClick={() => {
                        console.log("Clicked ellipse - returning to top");

                        if (isMobileView) {
                          setIsSplit(true);
                        }

                        const topElement =
                          document.getElementById("slider-container");
                        if (topElement) {
                          topElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        } else {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask id="path-1-inside-1_3499_236" fill="white">
                          <path d="M10 0.59155C7.61305 0.591551 5.32387 1.53976 3.63604 3.22759C1.94821 4.91542 1 7.2046 1 9.59155C1 11.9785 1.94821 14.2677 3.63604 15.9555C5.32386 17.6433 7.61305 18.5916 10 18.5916L10 9.59155L10 0.59155Z" />
                        </mask>
                        <path
                          d="M10 0.59155C7.61305 0.591551 5.32387 1.53976 3.63604 3.22759C1.94821 4.91542 1 7.2046 1 9.59155C1 11.9785 1.94821 14.2677 3.63604 15.9555C5.32386 17.6433 7.61305 18.5916 10 18.5916L10 9.59155L10 0.59155Z"
                          fill="black"
                          stroke="white"
                          strokeWidth="2"
                          mask="url(#path-1-inside-1_3499_236)"
                        />
                        <path
                          d="M10 18.5916C12.387 18.5916 14.6761 17.6433 16.364 15.9555C18.0518 14.2677 19 11.9785 19 9.59155C19 7.20461 18.0518 4.91542 16.364 3.22759C14.6761 1.53977 12.387 0.591554 10 0.591553L10 9.59155L10 18.5916Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      className={`ellipse ${activeSection === "about-pollutant" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("about-pollutant")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-2 ${activeSection === "sound-frequency" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("sound-frequency")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-3 ${activeSection === "effect-on-health" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("effect-on-health")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-4 ${activeSection === "case-study" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("case-study")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-5 ${activeSection === "phytoremediation" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("phytoremediation")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-6 ${activeSection === "plant-name" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("plant-name")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-7 ${activeSection === "common-names" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("common-names")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-8 ${activeSection === "plant-habitat" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("plant-habitat")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-9 ${activeSection === "origin" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("origin")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-10 ${activeSection === "phyto-capacity" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("phyto-capacity")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-11 ${activeSection === "uses-of-plant" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("uses-of-plant")}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={`ellipse-12 ${activeSection === "references" ? "active" : ""
                        }`}
                      onClick={() => handleNavClick("references")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
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
              {window.innerWidth <= 768 ? (
                <>
                  {!isSplit ? (
                    <div className="content-sections">
                      <div className="bottom-section1" id="about-pollutant">
                        {/* <div
                        style={{ padding: "35px 0px 0px 7px" }}
                        onClick={() => setIsSplit(true)}
                      >
                        <img src={backwhite} />
                      </div> */}
                        <AboutPollutantSection
                          sections={aboutpollutantcontent}
                          wasteTypeIcon={wasteTypeData.atomImage}
                        />
                      </div>
                      <div
                        className="sound-frequency-section"
                        id="sound-frequency"
                      >
                        <SoundFrequency sections={sinewavefreq} />
                      </div>
                      <div
                        className="effect-on-health-section"
                        id="effect-on-health"
                      >
                        <Box
                          sections={effectonhealthcontent}
                          pollutantName={leftpanelcontent[0].pollutantName}
                        />
                      </div>
                      <div className="bottom-section3" id="case-study">
                        <CaseStudies
                          sections={casestudiescontent}
                          pollutantName={leftpanelcontent[0].pollutantName}
                        />
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
                              <p
                                className="bibliograhy"
                                style={{ color: "#000" }}
                              >
                                BIBLIOGRAHY
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* * time period overlap */}
                      </div>
                      <div className="white-container">
                        {/* <div
                        style={{ padding: "35px 0px 0px 7px" }}
                        onClick={() => setIsSplit(true)}
                      >
                        <img src={whitess} />
                      </div> */}
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
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className="content-sections">
                  <div className="bottom-section1" id="about-pollutant">
                    <AboutPollutantSection
                      sections={aboutpollutantcontent}
                      wasteTypeIcon={wasteTypeData.atomImage}
                    />
                  </div>
                  <div className="sound-frequency-section" id="sound-frequency">
                    <SoundFrequency sections={sinewavefreq} />
                  </div>
                  <div
                    className="effect-on-health-section"
                    id="effect-on-health"
                  >
                    <Box
                      sections={effectonhealthcontent}
                      pollutantName={leftpanelcontent[0].pollutantName}
                    />
                  </div>
                  <div className="bottom-section3" id="case-study">
                    <CaseStudies
                      sections={casestudiescontent}
                      pollutantName={leftpanelcontent[0].pollutantName}
                    />
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
                    {/* <div
                    style={{ padding: "35px 0px 0px 7px" }}
                    onClick={() => setIsSplit(true)}
                  >
                    <img src={backwhite} />
                  </div> */}
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
              )}
            </div>
          )}
        </>
      )}
      {isMobile && isSplits == "slider-container" ? (
        <>
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
        </>
      ) : (
        <></>
      )}
      {isMobileView && isSplits !== "slider-container" ? (
        <>
          <div className="combined-section" style={{ padding: "0px 10px" }}>
            <div className="nav-bar-container">
              <div className="nav-bar" ref={navBarRef}>
                <div
                  className={`nav-items-container ${isMobile ? "mobile" : ""} ${isMobile && menuOpen ? "mobile-active" : ""
                    }`}
                >
                  <div
                    className="text-wrapper-combined"
                    onClick={() => handleNavClick("overview")}
                  >
                    <span>
                      {leftpanelcontent[0].pollutantName} +{" "}
                      {rightpanelcontent[0].plantNameSplit}
                    </span>
                  </div>
                  <div
                    className={`text-wrapper`}
                    onClick={() => handleNavClick("about-pollutant")}
                  >
                    <span>{navPollutantName}</span>
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
                    <span>References</span>
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
                    className={`ellipse-0 ${activeSection === "overview" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse ${activeSection === "about-pollutant" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-2 ${activeSection === "sound-frequency" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-3 ${activeSection === "effect-on-health" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-4 ${activeSection === "case-study" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-5 ${activeSection === "phytoremediation" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-6 ${activeSection === "plant-name" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-7 ${activeSection === "common-names" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-8 ${activeSection === "plant-habitat" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-9 ${activeSection === "origin" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-10 ${activeSection === "phyto-capacity" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-11 ${activeSection === "uses-of-plant" ? "active" : ""
                      }`}
                  />
                  <div
                    className={`ellipse-12 ${activeSection === "references" ? "active" : ""
                      }`}
                  />
                </div>
              </div>
            </div>

            <div>
              {!state && (
                <div
                  className="mobile-tab-only"
                  style={{
                    position: "fixed",
                    top: "88%",
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
            {window.innerWidth <= 768 ? (
              <>
                {!isSplit ? (
                  <div className="content-sections">
                    <div
                      style={{ padding: "35px 0px 0px 7px" }}
                      onClick={() => setIsSplit(true)}
                    >
                      <img style={{ marginTop: "18px" }} src={sliderPosition == 20 ? backwhite : back} />
                    </div>
                    <div style={{ marginTop: "50px" }} className="bottom-section1" id="about-pollutant">
                      <AboutPollutantSection
                        sections={aboutpollutantcontent}
                        wasteTypeIcon={wasteTypeData.atomImage}
                      />
                    </div>
                    <div
                      className="sound-frequency-section"
                      id="sound-frequency"
                    >
                      <SoundFrequency sections={sinewavefreq} />
                    </div>
                    <div style={{ marginTop: "110px" }}
                      className="effect-on-health-section"
                      id="effect-on-health"
                    >
                      <Box
                        sections={effectonhealthcontent}
                        pollutantName={leftpanelcontent[0].pollutantName}
                      />
                    </div>
                    <div className="bottom-section3" id="case-study">
                      <CaseStudies
                        sections={casestudiescontent}
                        pollutantName={leftpanelcontent[0].pollutantName}
                      />
                    </div>
                    <div className="bottom-section4" id="phytoremediation" style={{ height: "3035px" }}>
                      <Phyto
                        sections={phytocontent}
                        pollutantName={leftpanelcontent[0].pollutantName}
                      />{" "}

                      <div
                        style={{
                          width: '1px',
                          height: '182px',
                          backgroundColor: 'white',
                          position: "relative",
                          top: "217px",
                          left: "165.3px"
                        }}
                      ></div>

                      <img
                        alt="down arrow"
                        src={DownArrow}
                        className="down-arrow-icon"
                        style={{ marginTop: '209px', marginBottom: '0px', marginLeft: '156px' }}
                      />


                      <div className="wrap" style={{ marginTop: "193px", marginBottom: "140px" }}>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >





                          <div className="down_arrowstart" style={{ background: "#fff", marginTop: "5em" }}>


                          </div>

                          <div
                            style={{
                              background: "#fff",
                              display: "flex",
                              justifyContent: "center",
                              padding: "0px 20px",
                            }}
                            onClick={() => {
                              handleNavClick("plant-habitat");
                            }}
                          >
                            <p
                              className="bibliograhy"
                              style={{ color: "#000", marginTop: "13px 0px" }}
                            >
                              REFERENCES
                            </p>
                          </div>

                        </div>
                        {/* * time period overlap */}
                        <div
                          className="col-lg-12 pb-5 mb-5"
                          style={{ marginBottom: "20px", marginTop: "133px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: "20px",
                              marginTop: "30px",
                              marginBottom: "20px"
                            }}
                          >
                            <img
                              src={fb}
                              alt="Pollutant visual"
                              style={{ width: "15px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={In}
                              alt="Pollutant visual"
                              style={{ width: "21px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={tw}
                              alt="Pollutant visual"
                              style={{ width: "24px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                            <img
                              src={sh}
                              alt="Pollutant visual"
                              style={{ width: "27px", height: "24px" }}
                            // className="pollutantVisualImage"
                            />
                          </div>
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "14px",
                              fontWeight: "378",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "4px"
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: "27px",
                                width: "32px",
                                textAlign: "center"
                              }}
                            >
                              &#169;
                            </span>

                            <b style={{ fontWeight: "300" }}>NANDITA KUMAR</b>

                            <span
                              style={{
                                fontWeight: "100",
                                color: "rgba(255, 255, 255, 0.5)" // light gray for soft look
                              }}
                            >
                              2025
                            </span>
                          </p>

                        </div>
                      </div>


                    </div>

                    {/* <img
                      alt="down arrow"
                      src={DownArrow}
                      className="down-arrow-icon"
                      style={{ marginTop: '209px', marginBottom: '0px', marginLeft: '156px' }}
                    />


                    <div className="wrap" style={{ marginTop: "193px", marginBottom: "140px" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >



                        <div className="down_arrowstart" style={{ background: "#fff", marginTop: "5em" }}>


                        </div>

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
                          <p
                            className="bibliograhy"
                            style={{ color: "#000" }}
                          >
                            REFERENCES
                          </p>
                        </div>

                      </div> */}
                    {/* * time period overlap */}
                    {/* <div
                        className="col-lg-12 pb-5 mb-5"
                        style={{ marginBottom: "20px", marginTop: "133px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "20px",
                            marginTop: "30px",
                            marginBottom: "20px"
                          }}
                        >
                          <img
                            src={fb}
                            alt="Pollutant visual"
                            style={{ width: "15px", height: "24px" }}
                          // className="pollutantVisualImage"
                          />
                          <img
                            src={In}
                            alt="Pollutant visual"
                            style={{ width: "21px", height: "24px" }}
                          // className="pollutantVisualImage"
                          />
                          <img
                            src={tw}
                            alt="Pollutant visual"
                            style={{ width: "24px", height: "24px" }}
                          // className="pollutantVisualImage"
                          />
                          <img
                            src={sh}
                            alt="Pollutant visual"
                            style={{ width: "27px", height: "24px" }}
                          // className="pollutantVisualImage"
                          />
                        </div>
                        <p
                          style={{
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "378",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px"
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "27px",
                              width: "32px",
                              textAlign: "center"
                            }}
                          >
                            &#169;
                          </span>

                          <b style={{ fontWeight: "300" }}>NANDITA KUMAR</b>

                          <span
                            style={{
                              fontWeight: "100",
                              color: "rgba(255, 255, 255, 0.5)" // light gray for soft look
                            }}
                          >
                            2025
                          </span>
                        </p>

                      </div>
                    </div> */}
                    {/* </div> */}

                    <div className="white-container">
                      <div style={{ marginTop: "50px" }} className="bottom-section5" id="plant-name">
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
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div className="content-sections">
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
                  <Box
                    sections={effectonhealthcontent}
                    pollutantName={leftpanelcontent[0].pollutantName}
                  />
                </div>
                <div className="bottom-section3" id="case-study">
                  <CaseStudies
                    sections={casestudiescontent}
                    pollutantName={leftpanelcontent[0].pollutantName}
                  />
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
                      <div
                        style={{
                          background: "#000",
                          display: "flex",
                          justifyContent: "center",
                          padding: "0px 10px",
                        }}
                        onClick={() => {
                          handleNavClick("plant-habitat");
                        }}
                      >
                        <p className="bibliograhy" style={{ color: "#fff" }}>
                          BIBLIOGRAHY
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* * time period overlap */}
                </div>
                <div className="white-container">
                  {/* <div
                    style={{ padding: "35px 0px 0px 7px" }}
                    onClick={() => setIsSplit(true)}
                  >
                    <img src={backwhite} />
                  </div> */}
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
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{
          className: "customDrawer ",
          // className: "customDrawer --blackmodel",
        }}
      >
        <div className="timeline-drawer pt-5">
          {/* {window.innerHeight},{window.innerWidth} */}
          <div className="timeline-containers">
            <p style={{ margin: 0, color: "#fff" }}>
              HELLO {window.innerHeight},{window.innerWidth}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                // paddingRight: "83px",
                marginBottom: "20px",
                zIndex: 999,
                background: "#fff",
                paddingLeft: "calc(100% - 292px)",
              }}
              onClick={() => handleNavClick("slider-container")}
            >
              <img
                src={split_img}
                style={{
                  border: "1px solid #000",
                  borderRadius: "50%",
                  transform: "rotate(180deg)",
                  zIndex: 9999,
                }}
              />
            </div>
            <ul
              style={{
                listStyleType: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                // padding: 0,
                gap: "55px",
                // paddingRight: "86.9px",
                // paddingLeft: "calc(100% - 303px)",
                padding: "19px 0px 0px 0",
                width: "200px",
                transform: `translateX(${window.innerWidth - 307}px)`,
                // transform: `translateX(${window.innerWidth - 10} px)`,
                // transform: translateX`390px`,
                // overflow: "hidden",
                // transform: translateX(${window.innerWidth - 490}px);
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
                      // width: "100%",
                      alignItems: "baseline",
                      gap: "10px",
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      width: "260px",
                      // background:"#fff",
                      zIndex: 99,
                    }}
                  >
                    <span
                      className={`flex-1 `}
                      style={{
                        fontSize: idx == 0 ? "24px" : "14px",
                        width: "134px",
                        textAlign: "right",
                        // transform:
                        //  "translateX(60px)"
                        //     // : isLast
                        //     // ? "translateX(49px)"
                        //     // : "none",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="  --blackviews"
                    ></span>
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
                // paddingLeft: "60px",
                paddingLeft: "calc(100% - 292px)",
                gap: "20px",
                marginBottom: "1px",
                // paddingRight: "52px",
                paddingTop: "20px",
              }}
              onClick={() => handleNavClick("phytoremediation")}
            >
              <span className="ml-4 --blackviews"></span>

              <span className={`flex-1 `} style={{ fontSize: "14px" }}>
                Bibliography
              </span>
            </div>
            <div className="timeline-lines" />
          </div>
          <div className="close-button" onClick={toggleDrawer(false)}>
            <p>Close</p>
          </div>
        </div>
        <div className="timelinewhite-drawer pt-5">
          <div
            className="timeline-containers"
            style={{ paddingTop: window.innerHeight > 667 ? "8em" : "auto" }}
          >
            <p style={{ margin: 0, color: "#000" }}>
              HELLO {window.innerHeight},{window.innerWidth}
            </p>
            <div
              style={{
                gap: "20px",
                paddingLeft: "calc(100% - 238px)",
              }}
              onClick={() => handleNavClick("slider-container")}
            >
              <img
                src={split_img}
                style={{
                  border: "1px solid #000",
                  borderRadius: "50%",
                  transform: "rotate(360deg)",
                  zIndex: 9999,
                }}
              />
            </div>
            <ul
              style={{
                listStyleType: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                // padding: 0,
                gap: "26px",
                // paddingRight: "86.9px",
                // paddingLeft: "calc(100% - 303px)",
                padding: "19px 0px 0px 0",
                width: "200px",
                transform: `translateX(${window.innerWidth - 308}px)`,
                top: "0em",
                position: "relative",
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
                      alignItems: "baseline",
                      gap: "10px",
                      display: "flex",
                      flexDirection: "row-reverse",
                      width: "260px",
                      zIndex: 999,
                    }}
                  >
                    <span
                      className={`flex-1 `}
                      style={{
                        fontSize: idx == 0 ? "24px" : "14px",
                        width: "134px",
                        textAlign: "left",
                        color: "#fff",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="ml-4 "
                      style={{
                        background: "#000",

                        // paddingRight: "1px";
                        paddingRight: "1.5px",
                        borderRadius: "12px",
                        height: "10px",
                        width: "9px",
                        border: "1px solid #fff",
                        display: "inline-block"
                      }}
                    ></span>

                  </li>
                );
              })}
            </ul>
            <div style={{ paddingLeft: "calc(100% - 265.55px)" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "75px",
                  gap: "20px",
                  paddingTop: "20px",
                }}
                onClick={() => handleNavClick("phytoremediation")}
              >
                <span
                  className="ml-4 "
                  style={{
                    background: "#000",
                    zIndex: 9999,
                    // paddingRight: "1px";
                    paddingRight: "1.5px",
                    borderRadius: "12px",
                    height: "10px",
                    width: "9px",
                    border: "1px solid #fff",
                  }}
                ></span>

                <span
                  className={`flex-1 `}
                  style={{ fontSize: "14px", color: "#fff" }}
                >
                  Bibliography
                </span>
              </div>
            </div>
            <div
              className="timeline-line"
              style={{
                top: window.innerHeight > 667 ? "calc(100% - 86%)" : "",
              }}
            />
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
