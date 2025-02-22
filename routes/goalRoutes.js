const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createGoal,
    updateTodoStatus,
    getPatientGoals
} = require('../controllers/GoalController');

router.post('/', auth, createGoal);
router.put('/todo/:todoId', auth, updateTodoStatus);
router.get('/patient/:patientId', auth, getPatientGoals);

module.exports = router; 