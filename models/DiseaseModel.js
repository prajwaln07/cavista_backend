const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    symptoms:{
        type: Array,
        required: true
    },
    treatments:{
        type: Array,
        required: true
    }
});