const express = require('express');
const { doctorRegister , doctorLogin , listDoctor , listDoctorById , editDoctor , deleteDoctor , countDoctor , getAppointment , departmentWiseDoctor , getTodayAppointment } = require('../controllers/doctorController');
const upload = require('../middlewares/imageUpload');

const drRouter = express.Router();

drRouter.post('/doctor-register' , upload.single('profile') , doctorRegister);

drRouter.post('/doctor-login' , doctorLogin);

drRouter.get('/doctor-list' , listDoctor);

drRouter.get('/doctor-list/:id' , listDoctorById);

drRouter.patch('/edit-doctor/:id' , upload.single('profile') , editDoctor);
    
drRouter.delete('/delete-doctor/:id' , deleteDoctor);

drRouter.get('/count-doctor' , countDoctor);

drRouter.get('/get-appointment/:doctor' , getAppointment);

drRouter.get('/get-todayAppointment/:doctor' , getTodayAppointment);

drRouter.get('/departmentWise-doctor/:department' , departmentWiseDoctor);

module.exports = drRouter;