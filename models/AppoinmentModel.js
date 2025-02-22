const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({  
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientModel',
        required: true
    },
    healthpro:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthproModel',
        required: true
    },
    report:{
        type: String
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["pending","completed"],
        required: true
    }
});

module.exports = mongoose.model('AppointmentModel', AppoinmentSchema);