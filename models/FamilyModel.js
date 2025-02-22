const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    houseid:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    memebers:{
        type: Array[mongoose.Schema.Types.ObjectId],
        ref: 'PatientModel',
        required: true
    }
});

module.exports = mongoose.model('FamilyModel', FamilySchema);