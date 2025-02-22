const Patient = require('../models/Patient');
const Family = require('../models/Family');
const Healthpro = require('../models/Healthpro');
const Caregiver = require('../models/Caregiver');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createjwttoken = async (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

const createPatient = async (req, res) => {
    try{
       const {name, email,password,familyid, role} = req.body;
       if(!name || !email || !password || !familyid ){
           return res.status(400).json({msg: "Please enter all fields"});
       }
         const patient = await Patient.findOne({email});
         if(patient){
             return res.status(400).json({msg: "Patient already exists"});
          }
          const hashedpassword = await bycrypt.hash(password, 10);
            const newPatient = new Patient({
                name,
                email,
                hashedpassword,
                familyid,
                familyrole: role || "member"
            });
            const savedPatient = await newPatient.save();
            const token = await createjwttoken(savedPatient);
            res.json({
                token,
                 Patient:{
                    id: savedPatient.id,
                    name: savedPatient.name,
                    email: savedPatient.email,
                    familyid: savedPatient.familyid,
                    familyrole: savedPatient.familyrole
                }
            });
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const loginPatient = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const patient = await Patient.findOne({email});
        if(!patient){
            return res.status(400).json({msg: "Patient does not exist"});
        }
        const isMatch = await bycrypt.compare(password, patient.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        const token = await createjwttoken(patient);
        res.json({
            token,
            Patient:{
                id: patient.id,
                name: patient.name,
                email: patient.email,
                familyid: patient.familyid,
                familyrole: patient.familyrole
            }
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const createFamily = async (req, res) => {
    try{
       const {name, houseid,password} = req.body;
       if(!name || !houseid || !password){
           return res.status(400).json({msg: "Please enter all fields"});
       }
       const hashedpassword = await bycrypt.hash(password, 10);
         const family = await Family
         .findOne({houseid});
            if(family){
                return res.status(400).json({msg: "Family already exists"});
            }
                const newFamily = new Family({
                    name,
                    houseid,
                    hashedpassword
                });
                const savedFamily = await newFamily.save();
                res.json(savedFamily);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const createHealthpro = async (req, res) => {
    try{
         const {name, email,password} = req.body;
         if(!name || !email || !password){
             return res.status(400).json({msg: "Please enter all fields"});
         }
            const healthpro = await Healthpro.findOne({email});
            if(healthpro){
                return res.status(400).json({msg: "Healthpro already exists"});
            }
            const hashedpassword = await bycrypt.hash(password, 10);
                const newHealthpro = new Healthpro({
                    name,
                    email,
                    hashedpassword
                });
                const savedHealthpro = await newHealthpro.save();
                const token = await createjwttoken(savedHealthpro);
                res.json({
                    token,
                    Healthpro:{
                        id: savedHealthpro.id,
                        name: savedHealthpro.name,
                        email: savedHealthpro.email,
                        family: savedHealthpro.family
                    }
                });
                res.json(savedHealthpro);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const loginHealthpro = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const healthpro = await Healthpro.findOne({email});
        if(!healthpro){
            return res.status(400).json({msg: "Healthpro does not exist"});
        }
        
        const isMatch = await bycrypt.compare(password, healthpro.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        const token = await createjwttoken(healthpro);
        res.json({
            token,
            Healthpro:{
                id: healthpro.id,
                name: healthpro.name,
                email: healthpro.email,
                family: healthpro.family
            }
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

