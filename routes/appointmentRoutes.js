const express = require('express');
const { addAppointment , listAppointment , appointmentByID , editAppointment , deleteAppointment , countAppointment , getAppointmentlist , appointmentStatus , cntAppointment } = require('../controllers/appointmentController');
const upload = require('../middlewares/imageUpload');
const { getAppointment } = require('../controllers/doctorController');

const apRouter = express.Router();

apRouter.post('/add-appointment' , upload.single('profile') , addAppointment);

apRouter.get('/list-appointment' , listAppointment);

apRouter.get('/list-appointment/:id' , appointmentByID);

apRouter.patch('/edit-appointment/:id' , upload.single('profile') , editAppointment);

apRouter.delete('/delete-appointment/:id' , deleteAppointment);

apRouter.get('/count-appointment' , countAppointment);

apRouter.post('/get-appointmentByEmail' , getAppointmentlist);

apRouter.post('/cnt-appointment' , cntAppointment);

apRouter.patch('/:id/status/:status' , upload.single('profile') , appointmentStatus);  

module.exports = apRouter