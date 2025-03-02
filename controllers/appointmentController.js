const appointmentModel = require('../models/appointmentModel');
const bcrypt = require('bcrypt');
const uploadOnCloudinary = require('../config/cloudinary');

const addAppointment = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        const patientData = req.body;
        patientData.profile = req.file.path;

        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) {
            return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
        }

        patientData.profile = cloudinaryResponse.url;

        const newPatient = new appointmentModel(patientData);
        await newPatient.save();
        return res.status(200).send({ message: 'Appointment register successfully', success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while adding appointment' + error, success: false });
    }
}

const listAppointment = async (req, res) => {
    try {
        const appointmentList = await appointmentModel.find();
        return res.status(200).send(appointmentList);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while getting list of appointment' + error, success: false });
    }
}

const appointmentByID = async (req, res) => {
    try {
        const getAppointment = await appointmentModel.findOne({ _id: req.params.id });
        return res.status(200).send(getAppointment);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while getting appointmentByID' + error, success: false });
    }
}

const editAppointment = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        const ID = req.params.id;
        const patientData = req.body;
        patientData.profile = req.file.path;

        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) {
            return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
        }

        patientData.profile = cloudinaryResponse.url;

        const updatePatient = await appointmentModel.findByIdAndUpdate(ID, patientData, { new: true });

        if (!updatePatient) {
            return res.status(200).send({ message: 'appointment is not updated', success: false });
        }
        else {
            return res.status(200).send({ message: 'appointment is updated successfully', success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while update appointmentByID' + error, success: false });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const getAppointment = await appointmentModel.findOne({ _id: req.params.id });
        const appointmentDelete = await getAppointment.deleteOne();

        if (appointmentDelete.count === 0) {
            return res.status(200).send({ message: 'appointment is not deleted', success: false });
        }
        else {
            return res.status(200).send({ message: 'appointment is deleted successfully', success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while delete appointmentByID' + error, success: false });
    }
}

const countAppointment = async (req, res) => {
    try {
        const totalAppointment = await appointmentModel.countDocuments();
        return res.json({ count: totalAppointment });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while delete appointmentByID' + error, success: false });
    }
}

const getAppointmentlist = async (req, res) => {
    try {
        const email = req.body.email;
        const list = await appointmentModel.find({ email: email }); 
        res.status(200).send(list);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while get appointment' + error, success: false });
    }
}

// const appointmentStatus = async (req, res) => {
//     try {
//         const ID = req.params.id;

//         const password = req.body.password;
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);
//         req.body.password = hashPassword;

//         const patientData = req.body;
//         patientData.profile = req.file.path;
//         patientData.status = req.params.status;

//         const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
//         if (!cloudinaryResponse) {
//             return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
//         }

//         patientData.profile = cloudinaryResponse.url;

//         const updatePatient = await appointmentModel.findByIdAndUpdate(ID, patientData, { new: true });

//         if (!updatePatient) {
//             return res.status(200).send({ message: 'appointment status is not updated', success: false });
//         }
//         else {
//             return res.status(200).send({ message: 'appointment status is updated successfully', success: true });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ message: 'error while update appointment status ' + error, success: false });
//     }
// }

const appointmentStatus = async (req, res) => {
    try {
        const ID = req.params.id;
        const status = req.params.status; 

        const patientData = {
            status: status
        };
        const updatePatient = await appointmentModel.findByIdAndUpdate(ID, patientData, { new: true });

        if (!updatePatient) {
            return res.status(200).send({ message: 'Appointment status is not updated', success: false });
        }
        else {
            return res.status(200).send({ message: 'Appointment status is updated successfully', success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error while updating appointment status ' + error, success: false });
    }
}

const cntAppointment = async(req , res) => {
    try {
        const email = req.body.email;
        const total = await appointmentModel.countDocuments({ email: email });
        res.status(200).send({count : total});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error while counting appointment ' + error, success: false });
    }
}


module.exports = { addAppointment, listAppointment, appointmentByID, editAppointment, deleteAppointment, countAppointment, getAppointmentlist, appointmentStatus , cntAppointment }