const family = require("../models/FamilyModel");
const Patient = require("../models/PatientModel");

const addmember = async (req, res) => { 
    try{
        const {name,email,password, family} = req.body;
        if(!name || !email || !password || !family){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const newPatient = new Patient({
            name,
            email,
            password,
            family
        });
        const savedPatient = await newPatient.save();
        res.json(savedPatient);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getFamily = async (req, res) => {
    try{ 
        const {id} = req.params;
        const family = await Family.findById(id);
        res.json(family);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getFamilyMembers = async (req, res) => {
    try{
        const {id} = req.params;
        const family = await Family.findById(id);
        const members = await Patient.find({family: family.id});
        res.json(members);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getFamilyMemberById = async (req, res) => {
    try{
        const {id} = req.params;
        const member = await Patient.findById(id);
        res.json(member);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const updateFamilyMember = async (req, res) => {
    try{

    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const deleteFamilyMember = async (req, res) => {
    try{
       const {id} = req.params;
       const member = await Patient.findById(id);
         if(!member){
              return res.status(400).json({msg: "Member does not exist"});
         }
       const memb = await member.delete();
       if(!memb){
           return res.status(400).json({msg: "Error deleting member"});
       }
       res.json({msg: "Member deleted"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    addmember,
    getFamily,
    getFamilyMembers,
    getFamilyMemberById,
    updateFamilyMember,
    deleteFamilyMember
}




