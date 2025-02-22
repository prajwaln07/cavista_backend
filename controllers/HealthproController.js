const healthpro = require('../models/HealthproModel');
const patient = require('../models/PatientModel');
const family = require('../models/FamilyModel');
const caregiver = require('../models/CaregiverModel');
const disease = require('../models/DiseaseModel');
const goal = require('../models/GoalModel');
const appointment = require('../models/AppoinmentModel');

const getHealthpros = async (req, res) => {
    try{
        const healthpros = await healthpro.find();
        res.json(healthpros);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getHealthproById = async (req, res) => {
    try{
        const {id} = req.params;
        const healthpro = await healthpro
        .findById(id)   
        .populate('family');
        res.json(healthpro);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

// setcaregivertopaient
const setCaregiver = async (req, res) => {
    try{
        const {patientid, caregiverid} = req.body;
        const patient = await patient.findById(patientid);
        if(!patient){
            return res.status(400).json({msg: "Patient not found"});
        }
        const caregiver = await caregiver.findById(caregiverid);
        if(!caregiver){
            return res.status(400).json({msg: "Caregiver not found"});
        }
        if(!patient || !caregiver){
            return res.status(400).json({msg: "Patient or caregiver not found"});
        }
        patient.caregiver = caregiver._id;
        await patient.save();
        res.json(patient);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}
