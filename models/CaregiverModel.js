const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    patients:{
        type: Array[mongoose.Schema.Types.ObjectId],
        ref: 'PatientModel',
        required: true
    }
});
