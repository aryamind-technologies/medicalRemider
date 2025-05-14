const Patient = require('../models/Patient');

// Create a new patient
const createPatient = async (req, res) => {
  try {
    const { name, age, medicines } = req.body;

    const newPatient = new Patient({ name, age, medicines });
    await newPatient.save();

    res.status(201).json({ message: 'Saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients from the database
    res.status(200).json(patients); // Return the list of patients
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { createPatient, getPatients };
