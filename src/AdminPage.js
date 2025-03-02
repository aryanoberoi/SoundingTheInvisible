import React, { useState } from "react";

const PollutantForm = () => {
  const [pollutant, setPollutant] = useState({
    name: "",
    concentration: "",
    unit: "",
    source: "",
    healthEffects: "",
  });
  const [pollutantsList, setPollutantsList] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPollutant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pollutant.name || !pollutant.concentration || !pollutant.unit) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const response = await fetch("https://your-backend-api.com/pollutants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollutant),
      });

      if (response.ok) {
        alert("Pollutant added successfully!");
        setPollutantsList((prev) => [...prev, pollutant]);
        setPollutant({ name: "", concentration: "", unit: "", source: "", healthEffects: "" });
      } else {
        alert("Failed to add pollutant.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding pollutant.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Pollutant Data Entry</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <div className="mb-6">
          <label className="block font-semibold text-lg">Pollutant Name</label>
          <input
            type="text"
            name="name"
            value={pollutant.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-lg">Concentration</label>
          <input
            type="number"
            name="concentration"
            value={pollutant.concentration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-lg">Unit</label>
          <input
            type="text"
            name="unit"
            value={pollutant.unit}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-lg">Source (Optional)</label>
          <input
            type="text"
            name="source"
            value={pollutant.source}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-lg">Health Effects (Optional)</label>
          <textarea
            name="healthEffects"
            value={pollutant.healthEffects}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition"
        >
          Add Pollutant
        </button>
      </form>

      {pollutantsList.length > 0 && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Added Pollutants</h2>
          <ul className="bg-white shadow-lg rounded-lg p-6">
            {pollutantsList.map((item, index) => (
              <li key={index} className="border-b p-3">
                <strong>{item.name}</strong> - {item.concentration} {item.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PollutantForm;