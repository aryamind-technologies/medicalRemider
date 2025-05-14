import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import jwt_decode from "jwt-decode";

export default function MedicalDashboard() {
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patients");

        console.log("Response Data:", response.data); // Debug the response data

        const token = localStorage.getItem("token");

        if (token) {
          const decodedToken = jwt_decode(token);
          console.log("Decoded token:", decodedToken); // Debug decoded token

          const storedPatientName = decodedToken.name;

          const filtered = response.data.filter(
            (patient) => patient.name === storedPatientName
          );
          console.log("Filtered Patients:", filtered); // Debug filtered data

          setFilteredPatients(filtered);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleToggleForm = () => {
    navigate("/addmedicine");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Medical Dashboard</h1>

      <div className="mb-6">
        <button
          onClick={handleToggleForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Medicine
        </button>
      </div>

      <div className="space-y-6">
        {filteredPatients.length === 0 ? (
          <p className="text-gray-600">No patients found or unauthorized access.</p>
        ) : (
          filteredPatients.map((patient) => (
            <div
              key={patient._id}
              className="p-6 max-w-3xl mx-auto shadow-lg rounded-2xl bg-white mt-6"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Medicine Intake Details for {patient.name}
              </h2>
              <div className="mb-4">
                <span className="font-semibold text-gray-800">Age:</span>
                <span className="text-gray-600"> {patient.age}</span>
              </div>

              {patient.medicines.map((med, index) => (
                <div key={index} className="space-y-4 mb-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Medicine Name:</span>
                    <span className="text-gray-600">{med.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Dosage:</span>
                    <span className="text-gray-600">{med.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Time:</span>
                    <span className="text-gray-600">{med.time}</span>
                  </div>

                  {index < patient.medicines.length - 1 && (
                    <div className="border-t-2 border-gray-200 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
