const Patient = require('../models/Patient');
const Family = require('../models/Family');
const caregiver = require('../models/Caregiver');
const Disease = require('../models/Disease');
const Goal = require('../models/Goal');
const Healthpro = require('../models/Healthpro');

const getPatients = async (req, res) => {
    try{
        const patients = await Patient.find();
        res.json(patients);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getPatientById = async (req, res) => {
    try{
        const {id} = req.params;
        const patient = await Patient
        .findById(id)   
        .populate('family')
        .populate('caregiver')
        .populate('disease')
        .populate('goals');
        res.json(patient);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

const setCaregiver = async (req, res) => {
    try{
        const {patientid, caregiverid} = req.body;
        const patient = await Patient.findById(patientid);
        const caregiver = await Caregiver.findById(caregiverid);
        if(!patient || !caregiver){
            return res.status(400).json({msg: "Patient or caregiver not found"});
        }
        patient.caregiver = caregiver;
        await patient.save();
        res.json(patient);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

const setDisease = async (req, res) => {
    try{
        const {patientid, diseaseid} = req.body;
        const patient = await Patient.findById(patientid);
        const disease = await Disease.findById(diseaseid);
        if(!patient || !disease){
            return res.status(400).json({msg: "Patient or disease not found"});
        }
        patient.disease = disease;
        await patient.save();
        res.json(patient);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

const createDisease = async (req, res) => {
    try{
        const {name, symptoms, treatments} = req.body;
        if(!name || !symptoms || !treatments){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const newDisease = new Disease({
            name,
            symptoms,
            treatments
        });
        const savedDisease = await newDisease.save();
        res.json(savedDisease);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}


// const mongoose = require('mongoose');

// const GoalsSchema = new mongoose.Schema({
//     date:{
//         type: Date,
//         required: true
//     },
//     todos:{
//         type: Array[mongoose.Schema.Types.ObjectId],
//         ref: 'TodosModel',
//         required: true
//     },
// });

// const mongoose = require('mongoose');

// const TodosSchema = new mongoose.Schema({  
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     status:{
//         type: String,
//         enum:["pending","completed"],
//         required: true  
//     }
// });


// // according to above creategaol and todo  create and get all goals and todos

// const addintoGoals = () => {
     
// }

