const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FamilyModel',
        // type: String,
        required: true
    },
    familyRole: {
        type: String,
        required: true
    },
    caregiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaregiverModel'
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiseaseModel'
    },
    goals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GoalModel'
    },
});

module.exports = mongoose.model("PatientModel", PatientSchema);