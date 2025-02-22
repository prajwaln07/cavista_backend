const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    todos:{
        type: Array[mongoose.Schema.Types.ObjectId],
        ref: 'TodosModel',
        required: true
    },
});