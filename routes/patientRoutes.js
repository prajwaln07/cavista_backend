const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getPatients,
    getPatientById,
    setCaregiver,
    setDisease,
    createDisease
} = require('../controllers/PatientController');

router.get('/', auth, getPatients);
router.get('/:id', auth, getPatientById);
router.post('/set-caregiver', auth, setCaregiver);
router.post('/set-disease', auth, setDisease);
router.post('/disease', auth, createDisease);

module.exports = router; 