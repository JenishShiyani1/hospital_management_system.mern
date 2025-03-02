const express = require('express');
const { patientRegister , patientLogin , listPatient , listPatientByID , editPatient , deletePatient , patientCount } = require('../controllers/patientController');
const upload = require('../middlewares/imageUpload')

const patientRouter = express.Router();

patientRouter.post('/patient-register' , upload.single('profile') , patientRegister);

patientRouter.post('/patient-login' , patientLogin);

patientRouter.get('/patient-list' , listPatient);

patientRouter.get('/patient-list/:id' , listPatientByID);

patientRouter.patch('/edit-patient/:id' , upload.single('profile') , editPatient);

patientRouter.delete('/delete-patient/:id' , deletePatient);

patientRouter.get('/patient-count' , patientCount);

module.exports = patientRouter;