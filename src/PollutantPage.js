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
import SoundToggle from "./SoundToggle"; // Sound button
import { useParams } from 'react-router-dom';


const PollutantPage = ({ categorizedData }) => {
  //this was hell to make 
  const { customName } = useParams();
  const allRows = Object.values(categorizedData).flat();
  console.log("All Rows:", allRows);
  console.log("Custom Name:", customName);
  const matchedRow = allRows.find(row => {
    return row['id'].trim().toLowerCase() === customName.trim().toLowerCase();
  }) || {};
  
  console.log("Matched Row:", matchedRow); // Verify match clearly again
  console.log("Pollutant Name:", matchedRow["Pollutantname_split"]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [rotation, setRotation] = useState(180);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [leftPanelLoaded, setLeftPanelLoaded] = useState(false); // Track left panel load
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false); // Track right panel load
  
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
    1: ['potassium', 'simazine', 'imidacloprid', 'plantago', 'atrazine', 'glyphosate', 'phosphorus', 'nitrates'],
    2: ['mercury', 'copper', 'lead', 'chromium', 'cadmium', 'thallium', 'selenium', 'nickel', 'arsenic', 'zinc', 'iron', 'manganese', 'aluminum'],
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
    'thallium': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
    'Thallium ': { typeOfWaste: 2, atomImage: 'heavy-metal-waste-icon.svg' },
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

  

  // Get the pollutant name using id as fallback when Pollutantname_split is empty
  const pollutantNameRaw = matchedRow.Pollutantname_split || matchedRow.id || '';
  const pollutantNameNormalized = pollutantNameRaw.toLowerCase().trim();

  // Add debug logging to track the lookup
  console.log(`Looking up waste type for pollutant: "${pollutantNameNormalized}" (from ${pollutantNameRaw})`);

  // Look up the waste type data with a fallback
  const wasteTypeData = pollutantWasteTypeMapping[pollutantNameNormalized] ||
    // Try alternative formats (with/without hyphens)
    pollutantWasteTypeMapping[pollutantNameNormalized.replace(/\s+/g, '-')] ||
    pollutantWasteTypeMapping[pollutantNameNormalized.replace(/-/g, ' ')] ||
    // Default fallback if no match is found
    { typeOfWaste: 1, atomImage: 'agriculture-waste-icon.svg' };

  // Log the resolved waste type (debugging)
  console.log(`Resolved waste type for "${pollutantNameNormalized}":`, wasteTypeData);

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
          ...Array(9).fill(0).map((_, i) => matchedRow[`healtheffects_${i+3}`]).filter(Boolean)
        ]
      },
      sources: matchedRow.sources_venice_Description_split,
      soundFrequency: {
        enthalpy: matchedRow.Enthalpy_,
        frequency: matchedRow.SineWaveVisualizer_frequency_audiblefrequency,
        wave: matchedRow.Sound_frequency
      },
      caseStudies: {
        venice: matchedRow.CaseStudies_venice_lagoon,
        area: matchedRow.CaseStudies_area
      },
      phytoSpecies: Array(6).fill(0).map((_, i) => ({
        medium: matchedRow[`Phyto_Species${i+1}_medium`],
        timePeriod: matchedRow[`Phyto_Species${i+1}_timePeriod`],
        remediation: matchedRow[`Phyto_Species${i+1}_remediation`]
      })).filter(item => item.medium || item.timePeriod || item.remediation),
      about: {
        description: matchedRow.AboutPollutantSection_description,
        image: matchedRow.AboutPollutantSection_image
      }
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
        details: Array(5).fill(0).map((_, i) => ({
          title: matchedRow[`PlantHabitat_title${i+1}`],
          content: matchedRow[`PlantHabitat_content${i+1}`]
        })).filter(item => item.title || item.content)
      },
      about: {
        description: matchedRow.AboutPlant_description,
        status: matchedRow.AboutPlant_WetlandStatus
      },
      commonNames: Array(19).fill(0).map((_, i) => matchedRow[`CommonNames_content${i}`]).filter(Boolean),
      geographicalDistribution: matchedRow.Geographicaldistribution_text,
      phytoCapacityDetails: {
        description: matchedRow.PhytoCapacity_description,
        paragraphs: Array(11).fill(0).map((_, i) => 
          matchedRow[`PhytoCapacity_contentPara${i+1}`]
        ).filter(Boolean)
      }
    }
  };

  // Update the leftpanelcontent to use the new dataContext
  const leftpanelcontent = [
    { 
      pollutantNumber: 1,
      // Use the non-empty name for display
      pollutantName: matchedRow.Pollutantname_split || matchedRow.id || "Unknown Pollutant",
      typeOfWaste: wasteTypeData.typeOfWaste,
      atomImage: wasteTypeData.atomImage,
      pollutantDescription: matchedRow.pollutant_description_split,
      effect: matchedRow.effects_on_human_Health_description_split,
      sources: matchedRow.sources_venice_Description_split
    }
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
      plantDetails: dataContext.plant.details
    }
  ];

  // Check if we have an image from the database, otherwise try to determine one based on pollutant type
  const pollutantImage = matchedRow.AboutPollutantSection_image ||
                         (wasteTypeData.typeOfWaste === 2 ? 'heavy-metal-pollutant.jpg' :
                          wasteTypeData.typeOfWaste === 3 ? 'radioactive-pollutant.jpg' :
                          wasteTypeData.typeOfWaste === 4 ? 'organic-pollutant.jpg' :
                          'agricultural-pollutant.jpg');

  // Create aboutpollutantcontent with the same approach as other content objects
  const aboutpollutantcontent = [
    {
      text: dataContext.pollutant.about.description ||
            `About ${pollutantNameRaw}_This is a description of the pollutant.`,
      image: dataContext.pollutant.about.image // Use image directly from context
    }
  ];

  // Debug log to verify image path
  console.log(`Using pollutant image: ${pollutantImage} for ${pollutantNameRaw}`);

  // Update sinewavefreq to use the new dataContext
  const sinewavefreq = [
    {
      pollutantName: dataContext.pollutant.name,
      enthalpy: dataContext.pollutant.soundFrequency.enthalpy,
      soundfrequency: dataContext.pollutant.soundFrequency.frequency,
      wavefrequency: dataContext.pollutant.soundFrequency.wave
    }
  ];

  // Update effectonhealthcontent to use the new dataContext
  const effectonhealthcontent = dataContext.pollutant.effects.details.map(text => ({ text }));

  // Update casestudiescontent to use the new dataContext
  const casestudiescontent = [
    { text: dataContext.pollutant.caseStudies.venice },
    { text: dataContext.pollutant.caseStudies.area }
  ];

  // Update phytocontent to use the new dataContext
  const phytocontent = dataContext.pollutant.phytoSpecies;

  // Update aboutplantcontent to use the new dataContext
  const aboutplantcontent = [
    { 
      plant_name: dataContext.plant.name,
      description: dataContext.plant.about.description,
      status: dataContext.plant.about.status
    }
  ];

  // Update commonname to use the new dataContext
  const commonname = [
    { plantName: dataContext.plant.name },
    ...dataContext.plant.commonNames.map(text => ({ text }))
  ];

  // Update habitat to use the new dataContext
  const habitat = [
    { plantName: dataContext.plant.name },
    ...dataContext.plant.habitat.details
  ];

  // Update geographicaldistribution to use the new dataContext
  const geographicaldistribution = [
    { text: dataContext.plant.geographicalDistribution }
  ];

  // Update sectionphyto to use the new dataContext
  const sectionphyto = [
    { type: 'intro', text: dataContext.plant.phytoCapacityDetails.description },
    { plantName: dataContext.plant.name },
    ...dataContext.plant.phytoCapacityDetails.paragraphs.map(text => ({ text }))
  ];

  // More efficient structure for plant uses
  const plantUses = {
    plantName: dataContext.plant.name,
    sections: [
      {
        id: 'nutritional',
        title: 'NUTRITIONAL',
        flavourtext: matchedRow.Nutritional_flavourtext,
        items: Array(10).fill(0).map((_, i) => ({
          header: matchedRow.Medicinal_flavourtext,
          text: matchedRow[`UsesOfPlant_nutritional_description${i+1}`]
        })).filter(item => item.text)
      },
      {
        id: 'medicine',
        title: 'MEDICINE',
        flavourtext: matchedRow.UsesOfPlant_medicinal_flavourtext,
        items: Array(10).fill(0).map((_, i) => ({
          header: matchedRow[`UsesOfPlant_title${i+1}`],
          text: matchedRow[`UsesOfPlant_description${i+1}`]
        })).filter(item => item.text)
      },
      {
        id: 'additional',
        title: 'ADDITIONAL',
        items: Array(11).fill(0).map((_, i) => ({
          header: matchedRow[`Add_UsesOfPlant_title${i+1}`],
          text: matchedRow[`Add_UsesOfPlant_description${i+1}`]
        })).filter(item => item.text)
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

    // First, clear all region classes to avoid conflicts
    document.body.classList.remove('sound-left-region', 'sound-center-region', 'sound-right-region');
    
    // Add appropriate region class based on position
    if (clampedPosition < 25) {
      document.body.classList.add('sound-left-region');
    } else if (clampedPosition >= 95) {
      document.body.classList.add('sound-right-region');
    } else {
      document.body.classList.add('sound-center-region');
    }

    // Panel active classes control which content is shown
    if (clampedPosition < 50) {
      // White panel is active (right side content)
      document.body.classList.add('white-panel-active');
      document.body.classList.remove('black-panel-active');
    } else {
      // Black panel is active (left side content)
      document.body.classList.add('black-panel-active');
      document.body.classList.remove('white-panel-active');
    }

    // These other classes are used for specific positioning
    document.body.classList.toggle('right-panel-active', clampedPosition < 3);
    
    // Remove sound-panel-active class as we'll control sound button color directly
    document.body.classList.remove('sound-panel-active');

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
    const snapRight = 99; // Keep the original 99% snap point
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

    console.log(`Left panel height: ${leftPanelHeight}px, Right panel height: ${rightPanelHeight}px`);

    // Calculate max height with a minimum threshold
    const maxHeight = Math.max(leftPanelHeight, rightPanelHeight, window.innerHeight);
    const finalHeight = maxHeight > 100 ? `${maxHeight}px` : '100vh';

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
  }

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
    // Add slider transition variable for dynamic control
    document.documentElement.style.setProperty('--slider-transition', 'left 0.3s ease-in-out');

    // Clean up on unmount
    return () => {
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

// Replace the current phyto section scroll effect with this updated code for instant transition
useEffect(() => {
  if (activeSection === 'phytoremediation') {
    const section = document.getElementById('phytoremediation');
    if (!section) return;
    
    // Create the transition flash element only
    const flash = document.createElement('div');
    flash.className = 'transition-flash';
    document.body.appendChild(flash);
    
    // Add styles with minimal transition time
    const style = document.createElement('style');
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
      handleNavClick('plant-name');
      
      // Reset state after minimal delay
      setTimeout(() => {
        flash.classList.remove('active');
        isTransitioning = false;
      }, 150);
    };
    
    // Add simplified event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      // Clean up
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
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
    const handleWindowResize = () => { // Define the handler to remove later
      console.log("Window resize detected");
      setTimeout(updateContainerHeight, 100);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      // Clean up
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('resize', handleWindowResize); // Remove the correct handler
    };
  }, [leftPanelLoaded, rightPanelLoaded]); // Reinitialize when panel load status changes

  // Add CSS override to ensure our height settings take precedence
  useEffect(() => {
    // Add style tag to override any conflicting CSS
    const styleElement = document.createElement('style');
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
          const finalHeight = maxHeight > 50 ? `${maxHeight}px` : '78vw';
          setContainerHeight(finalHeight);
        }
      });
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
      section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Changed to smooth
      setMenuOpen(false);
      return;
    }

    // Determine which panel the section belongs to
    const isInRightPanel = section.closest('.white-container') !== null;
    const targetSliderPos = isInRightPanel ? 1 : 99;

    // Set smooth transition for slider
    document.documentElement.style.setProperty('--slider-transition', 'left 0.5s ease-in-out');
    
    // Update slider position with smooth transition
    updateSliderPosition(targetSliderPos);
    lastPositionRef.current = targetSliderPos;
    
    // Smooth scroll to section
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Replace the scroll-based combined section detection with Intersection Observer
  useEffect(() => {
    // Skip if the ref isn't available
    if (!document.querySelector('.combined-section')) return;
    
    const observer = new IntersectionObserver((entries) => {
      // Check if combined section is intersecting
      const isIntersecting = entries[0]?.isIntersecting || false;
      
      // Add/remove class based on visibility
      if (isIntersecting) {
        document.body.classList.add('viewing-combined-section');
      } else {
        document.body.classList.remove('viewing-combined-section');
      }
    }, {
      // Lower threshold means it triggers earlier when scrolling down
      threshold: 0.1
    });
    
    // Start observing the combined section
    observer.observe(document.querySelector('.combined-section'));
    
    return () => observer.disconnect();
  }, []);

  // Update the CSS rules for sound button color management
  useEffect(() => {
    const styleEl = document.createElement('style');
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
      if (navBar.classList.contains('using-fallback')) return;
      
      navBar.classList.add('using-fallback');
      
      // Apply fixed positioning
      navBar.style.position = 'fixed';
      navBar.style.top = '20px';
      navBar.style.width = `${navBarContainer.offsetWidth}px`;
      
      // Add placeholder to prevent layout jump
      const placeholder = document.createElement('div');
      placeholder.className = 'nav-placeholder';
      placeholder.style.height = `${navBar.offsetHeight}px`;
      placeholder.style.width = `${navBar.offsetWidth}px`;
      navBarContainer.appendChild(placeholder);
    };
    
    const disableFallbackMode = () => {
      if (!navBar.classList.contains('using-fallback')) return;
      
      navBar.classList.remove('using-fallback');
      
      // Restore normal positioning
      navBar.style.position = '';
      navBar.style.top = '';
      navBar.style.width = '';
      
      // Remove placeholder
      const placeholder = navBarContainer.querySelector('.nav-placeholder');
      if (placeholder) {
        navBarContainer.removeChild(placeholder);
      }
    };
    
    // Update positioning on scroll and resize
    window.addEventListener('scroll', checkStickySupport);
    window.addEventListener('resize', checkStickySupport);
    
    // Initial check
    setTimeout(checkStickySupport, 100);
    
    return () => {
      window.removeEventListener('scroll', checkStickySupport);
      window.removeEventListener('resize', checkStickySupport);
    };
  }, [isMobile]);

  return (
    <>
      <SoundToggle 
        padNumber={leftpanelcontent[0].pollutantNumber}
        sliderPosition={sliderPosition}
        panelMode={sliderPosition < 50 ? 'white' : 'black'}
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
            minHeight: '100%',
            position: 'absolute',
            top: 0
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="slider-image-container" style={{ position: 'relative', left: '-4px' }}>
            <img
              src="slider.png"
              alt="Slider"
              className="slider-image"
            />
          </div>
        </div>
      </div>
      <div className="combined-section">
        <div className="nav-bar-container">
          <div className="nav-bar" ref={navBarRef}>
            {isMobile && (
              <div className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
              </div>
            )}
            <div className={`nav-items-container ${isMobile ? 'mobile' : ''} ${isMobile && menuOpen ? 'mobile-active' : ''}`}>
              <div className={`text-wrapper`}
                   onClick={() => handleNavClick('about-pollutant')}>
                <span>{leftpanelcontent[0].pollutantName}</span>
              </div>

              <div className={`div`}
                   onClick={() => handleNavClick('plant-name')}>
                <span>{rightpanelcontent[0].plantNameSplit}</span>
              </div>

              <div className={`text-wrapper-2`}
                   onClick={() => handleNavClick('sound-frequency')}>
                <span>Sound frequency</span>
              </div>

              <div className={`text-wrapper-3`}
                   onClick={() => handleNavClick('common-names')}>
                <span>Common names of {rightpanelcontent[0].plantNameSplit}</span>
              </div>

              <div className={`text-wrapper-4`}
                   onClick={() => handleNavClick('plant-habitat')}>
                <span>{rightpanelcontent[0].plantNameSplit}'s Habitat</span>
              </div>

              <div className={`text-wrapper-5`}
                   onClick={() => handleNavClick('origin')}>
                <span>Origin and Geographical Distribution</span>
              </div>

              <p className={`p`}
                 onClick={() => handleNavClick('phyto-capacity')}>
                <span>Phytoremediation capacity of {rightpanelcontent[0].plantNameSplit}</span>
              </p>

              <div className={`text-wrapper-6`}
                   onClick={() => handleNavClick('uses-of-plant')}>
                <span>Uses of {rightpanelcontent[0].plantNameSplit}</span>
              </div>

              <div className={`text-wrapper-7`}
                   onClick={() => handleNavClick('references')}>
                <span>Bibliography</span>
              </div>

              <div className={`text-wrapper-8`}
                   onClick={() => handleNavClick('effect-on-health')}>
                <span>Effect on health</span>
              </div>

              <div className={`text-wrapper-9`}
                   onClick={() => handleNavClick('case-study')}>
                <span>Case study</span>
              </div>

              <p className={`text-wrapper-10`}
                 onClick={() => handleNavClick('phytoremediation')}>
                <span>Phytoremediation of {leftpanelcontent[0].pollutantName}</span>
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
        </div>
        
        <div className="content-sections">
          <div className="bottom-section1" id="about-pollutant">
            <AboutPollutantSection
              sections={aboutpollutantcontent}
              wasteTypeIcon={wasteTypeData.atomImage}
            />
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
                <AboutPlant
                  sections={aboutplantcontent}
                  wasteTypeIcon={wasteTypeData.atomImage}
                />
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
              <UsesOfPlant sectionsData={plantUses}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollutantPage;