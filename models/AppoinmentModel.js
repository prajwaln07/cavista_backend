const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientModel',
        required: true
    },
    mainSymptoms: String,
    report: String,
    appointmentDate: String,
});

module.exports = mongoose.model('AppointmentModel', AppoinmentSchema);