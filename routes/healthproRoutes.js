const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getHealthpros,
    getHealthproById,
    setCaregiver
} = require('../controllers/HealthproController');

router.get('/', auth, getHealthpros);
router.get('/:id', auth, getHealthproById);
router.post('/set-caregiver', auth, setCaregiver);

module.exports = router; 