import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import jwt_decode from "jwt-decode";

export default function AddMedicine() {
  const [medicines, setMedicines] = useState([{ name: "", time: "", quantity: "" }]);
  const [formData, setFormData] = useState({ name: "", age: "" });
  const navigate = useNavigate();

  // Decode token to get patient name
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded?.name) {
          setFormData((prev) => ({ ...prev, name: decoded.name }));
        }
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
  }, []);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", time: "", quantity: "" }]);
  };

  const removeMedicine = (index) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    } else {
      alert("You must have at least one medicine.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: parseInt(formData.age),
      medicines,
    };

    try {
      const res = await api.post("/medicine", payload);
      if (res.status === 201) {
        alert("Form submitted successfully!");
        navigate("/medicaldashboard");
      }
    } catch (err) {
      console.error("API error:", err);
      alert("Failed to submit form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-14">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Medicine</h2>

      {/* Patient Info */}
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Patient Name</label>
          <input
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            type="text"
            value={formData.name}
            readOnly // Prevent editing
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">Age</label>
          <input
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="age"
            type="number"
            placeholder="Enter Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
      </div>

      {/* Medicines */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Medicines</h3>
        {medicines.map((med, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Medicine Name</label>
              <input
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={med.name}
                onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                placeholder="Medicine Name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
              <input
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="time"
                value={med.time}
                onChange={(e) => handleMedicineChange(index, "time", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
              <input
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={med.quantity}
                onChange={(e) => handleMedicineChange(index, "quantity", e.target.value)}
                placeholder="Quantity"
              />
            </div>
            <div className="flex justify-center items-center mt-6 sm:mt-0">
              <button
                type="button"
                onClick={() => removeMedicine(index)}
                className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={addMedicine}
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
          >
            + Add Medicine
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
