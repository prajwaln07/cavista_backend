const Appointment = require('../models/AppoinmentModel');
const Patient = require('../models/PatientModel');
const Healthpro = require('../models/HealthproModel');

const createAppointment = async (req, res) => {
    try {
        const { patientId, healthproId, date, time } = req.body;
        
        const patient = await Patient.findById(patientId);
        const healthpro = await Healthpro.findById(healthproId);
        
        if (!patient || !healthpro) {
            return res.status(404).json({ msg: "Patient or Healthcare Professional not found" });
        }

        const appointment = new Appointment({
            patient: patientId,
            healthpro: healthproId,
            date,
            time,
            status: "pending"
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, report } = req.body;
        
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        appointment.status = status;
        if (report) appointment.report = report;
        
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getHealthproAppointments = async (req, res) => {
    try {
        const { healthproId } = req.params;
        const appointments = await Appointment.find({ healthpro: healthproId })
            .populate('patient', 'name email')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPatientAppointments = async (req, res) => {
    try {
        const { patientId } = req.params;
        const appointments = await Appointment.find({ patient: patientId })
            .populate('healthpro', 'name email')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAppointment,
    updateAppointmentStatus,
    getHealthproAppointments,
    getPatientAppointments
}; 