// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Add routes with correct file names and paths
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/families', require('./routes/familyRoutes'));
app.use('/api/healthpros', require('./routes/healthproRoutes'));
app.use('/api/caregivers', require('./routes/careGiverRoutes'));
app.use('/api/appointments', require('./routes/appoinmentRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
// app.use('/api/todos', require('./routes/todoRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
