const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientModel',
    },
    mainSymptoms: String,
    report: String,
    appointmentDate: String,
});

module.exports = mongoose.model('AppointmentModel', AppoinmentSchema);