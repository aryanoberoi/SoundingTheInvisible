import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage"; // Import the home page
import PollutantPage from "./InfiniteScrollPage"; // Pollutant page
import SoundToggle from "./SoundToggle"; // Sound button
import Navbar from "./Navbar"; // Navbar

const AppContent = () => {
  const location = useLocation();
  const [categorizedData, setCategorizedData] = React.useState({});
  useEffect(() => {
    // Custom Cursor Setup
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const isDark = isDarkColor(bgColor);
        cursor.classList.toggle("custom-cursor-inverted", isDark);
      }
    };

    const isDarkColor = (color) => {
      if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return false;
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      return brightness < 128;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cursor.remove(); // Cleanup cursor on unmount
    };
  }, []);
  useEffect(() => {
    const sheetId = "1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs";
    const sheetName = "Sheet1";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
  
    fetch(url)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows.map(row => {
          const obj = {};
          json.table.cols.forEach((col, i) => {
            obj[col.label] = row.c[i]?.v || "";
          });
          return obj;
        });
  
        // Categorize data by 'Pollutantname_split'
        const categorizedData = rows.reduce((acc, row) => {
          const key = row['unique_id'];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(row);
          return acc;
        }, {});
        setCategorizedData(categorizedData); // Set the state with categorized data

        console.log(categorizedData);
    })
    .catch(err => console.error("Error fetching sheet:", err));
}, []);

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("homepage-active");
    } else {
      document.body.classList.remove("homepage-active");
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <SoundToggle />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:customName" element={<PollutantPage categorizedData={categorizedData} />} />
      </Routes>
    </div>
  );
};

const App = () => {


  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
