const Patient = require('../models/PatientModel');
const Family = require('../models/FamilyModel');
const Caregiver = require('../models/CaregiverModel');
const Disease = require('../models/DiseaseModel');

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
        .populate('disease');
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

module.exports = {
    getPatients,
    getPatientById,
    setCaregiver,
    setDisease,
    createDisease
};

