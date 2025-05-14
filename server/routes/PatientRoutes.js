const express = require('express');
const { createPatient, getPatients } = require('../controllers/PatientController');

const router = express.Router();

router.post('/medicine', createPatient);
router.get('/patients', getPatients);

module.exports = router;
