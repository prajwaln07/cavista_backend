const express = require("express");
const router = express.Router();
// Remove unused model imports
// const HealthproModel = require("../models/HealthproModel");
// const PatientModel = require("../models/PatientModel");
// const FamilyModel = require("../models/FamilyModel");
const {
    createPatient,
    loginPatient,
    createFamily,
    createHealthpro,
    loginHealthpro
} = require('../controllers/AuthController');

// Auth routes
router.post('/patient/register', createPatient);
router.post('/patient/login', loginPatient);
router.post('/family/create', createFamily);
router.post('/healthpro/register', createHealthpro);
router.post('/healthpro/login', loginHealthpro);

module.exports = router;   