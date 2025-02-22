const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    family:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'FamilyModel',
        required: true
    },
    familyRole:{
        type: String,
        enum:["member","leader"],
        required: true
    },
    caregiver:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'CaregiverModel'
    },
    disease:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'DiseaseModel'
    },
    goals:{
        type :mongoose.Schema.Types.ObjectId,
        ref: 'GoalModel'
    },
});

module.exports = mongoose.model("PatientModel", PatientSchema);