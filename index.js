const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/adminRoutes');
const drRouter = require('./routes/doctorRouter');
const patientRouter = require('./routes/patientRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const apRouter = require('./routes/appointmentRoutes');

const app = express();
const port = 3030;

app.use(cors());

connectDB();

app.use(express.json());

app.use('/admin' , router);
app.use('/doctor' , drRouter);
app.use('/patient' , patientRouter);
app.use('/department' , departmentRouter);
app.use('/appointment' , apRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
