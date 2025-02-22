const Goal = require('../models/GoalModel');
const Todo = require('../models/TodosModel');
const Patient = require('../models/PatientModel');

const createGoal = async (req, res) => {
    try {
        const { patientId, date, todos } = req.body;
        
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        // Create todos first
        const todoPromises = todos.map(todo => {
            return new Todo({
                title: todo.title,
                description: todo.description,
                status: "pending"
            }).save();
        });

        const savedTodos = await Promise.all(todoPromises);
        const todoIds = savedTodos.map(todo => todo._id);

        const goal = new Goal({
            date,
            todos: todoIds
        });

        await goal.save();
        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTodoStatus = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { status } = req.body;

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        todo.status = status;
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPatientGoals = async (req, res) => {
    try {
        const { patientId } = req.params;
        const goals = await Goal.find({ patient: patientId })
            .populate('todos')
            .sort({ date: -1 });
        res.json(goals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createGoal,
    updateTodoStatus,
    getPatientGoals
}; 