const patientModel = require('../models/patientRegisterModel');
const bcrypt = require('bcrypt');
const uploadOnCloudinary = require('../config/cloudinary');

const patientRegister = async(req , res) => {
    try {
        const exist = await patientModel.findOne({email : req.body.email});
        console.log(req.body.email);

        if(exist) {
            return res.status(200).send({message : 'Patient is already exist'});
        }
        else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password , salt);
            req.body.password = hashPassword;

            const patientData = req.body;
            patientData.profile = req.file.path;

            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if(!cloudinaryResponse) {
                return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
            }

            patientData.profile = cloudinaryResponse.url;

            const newPatient = new patientModel(patientData);
            await newPatient.save();
            return res.status(200).send({message : 'Patient register successfully' , success : true});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'erroe while register patient' + error , success : false});
    }
}

const patientLogin = async(req , res) => {
    try {
        const matchEmail = await patientModel.findOne({email : req.body.email});

        if(!matchEmail) {
            return res.status(200).send({message : 'Patient not found'});
        }

        const matchPassword = await bcrypt.compare(req.body.password , matchEmail.password);

        if(!matchPassword) {
            return res.status(200).send({message : 'Invalid Username and Password' , success : false});
        }

        return res.status(200).send({message : 'Patient login successfully' , success : true , id : matchEmail._id});
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while login patient' + error , success : false});
    }
}

const listPatient = async(req , res) => {
    try {
        const patientList = await patientModel.find();
        return res.status(200).send(patientList);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while get patient list' + error , success : false});
    }
}

const listPatientByID = async(req , res) => {
    try {
        const patient = await patientModel.findOne({_id : req.params.id});
        return res.status(200).send(patient);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while get patient' + error , success : false});
    }
}

const editPatient = async(req , res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;
        
        const ID = req.params.id;
        const patientData = req.body;
        patientData.profile = req.file.path;

        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if(!cloudinaryResponse) {
            return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
        }

        patientData.profile = cloudinaryResponse.url;

        const updatePatient = await patientModel.findByIdAndUpdate(ID , patientData , {new : true});

        if(!updatePatient) {
            return res.status(200).send({message : 'patient is not updated' , success : false});
        }
        else {
            return res.status(200).send({message : 'patient is updated successfully' , success : true});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while update patient' + error , success : false});
    }
}

const deletePatient = async(req , res) => {
    try {
        const patient = await patientModel.findOne({_id : req.params.id});
        console.log(patient);
        const deletePatient = await patient.deleteOne();

        if(deletePatient.count === 0) {
            return res.status(200).send({message : 'patient is not deleted' , success : false});
        }
        else {
            return res.status(200).send({message : 'patient is deleted successfully' , success : true});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while delete patient' + error , success : false});
    }
}

const patientCount = async(req , res) => {
    try {
        const countPatient = await patientModel.countDocuments();
        return res.json({count : countPatient});
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({message : 'error while count patient'+error , success : false});
    }
}

module.exports = { patientRegister , patientLogin , listPatient , listPatientByID , editPatient , deletePatient , patientCount }