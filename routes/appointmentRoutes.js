const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createAppointment,
    updateAppointmentStatus,
    getHealthproAppointments,
    getPatientAppointments
} = require('../controllers/AppointmentController');

router.post('/', auth, createAppointment);
router.put('/:id', auth, updateAppointmentStatus);
router.get('/healthpro/:healthproId', auth, getHealthproAppointments);
router.get('/patient/:patientId', auth, getPatientAppointments);

module.exports = router; 