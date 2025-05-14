// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  age: { type: Number, required: true },           
  medicines: [                                     
    {
      name: { type: String, required: true },
      time: { type: String, required: true },
      quantity: { type: String, required: true }
    }
  ]
}, { timestamps: true }); 

module.exports = mongoose.model('Patient', patientSchema);
