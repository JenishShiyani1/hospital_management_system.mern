const doctorModel = require('../models/doctorRegisterModel');
const appointmentModel = require('../models/appointmentModel');
const bcrypt = require('bcrypt');
const uploadOnCloudinary = require('../config/cloudinary');

const doctorRegister = async (req , res) => {
    try {
        const exist = await doctorModel.findOne({ email: req.body.email })
        console.log(req.body.firstName);

        if (exist) {
            return res.status(200).send({ message: 'Doctor already exist', success: false })
        }
        else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password , salt);
            req.body.password = hashPassword;

            const doctorData = req.body;
            doctorData.profile = req.file.path;

            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if(!cloudinaryResponse) {
                return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
            }

            doctorData.profile = cloudinaryResponse.url;
            
            const newDoctor = new doctorModel(doctorData);
            await newDoctor.save();
            return res.status(200).send({ message: 'Doctor Register successfully', success: true });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'error while register doctor' + error, success: false })
    }
}

const doctorLogin = async(req , res) => {
    try {
        const matchEmail = await doctorModel.findOne({email : req.body.email});

        if(!matchEmail) {
            return res.status(200).send({message : 'User not found' , success : false});
        }

        const matchPassword = await bcrypt.compare(req.body.password , matchEmail.password);

        if(!matchPassword) {
            return res.status(200).send({message : 'wrong email or password' , success : false});
        }

        return res.status(200).send({message : 'Dostor login successfully' , success : true , id : matchEmail._id});
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while login doctor'+error , success : false})
    }
}

const listDoctor = async(req , res) => {
    try {
        const doctorList = await doctorModel.find();
        return res.status(200).send(doctorList);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while getting doctor list'+error , success : false});
    }
}

const listDoctorById = async(req , res) => {
    const doctorById = await doctorModel.findOne({_id : req.params.id});
    return res.status(200).send(doctorById);
}

const editDoctor = async(req , res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt);
        req.body.password = hashPassword;
        
        const ID = req.params.id;
        const doctorData = req.body;
        doctorData.profile = req.file.path

        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if(!cloudinaryResponse) {
            return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
        }

        doctorData.profile = cloudinaryResponse.url;
    
        const updateDoctor = await doctorModel.findByIdAndUpdate(ID , doctorData , {new : true});

        if(!updateDoctor) {
            return res.status(200).send({message : 'Doctor is not updated' , success : false});
        }
        else {
            return res.status(200).send({message : 'Doctor is updated successfully' , success : true});}
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while update doctor'+error , success : false})
    }
}

const deleteDoctor = async(req , res) => {
    try {
        const doctor = await doctorModel.findOne({_id : req.params.id});
        const deleteDoctor = await doctor.deleteOne();

        if(deleteDoctor.count === 0) {
            return res.status(200).send({message : 'doctor is not deleted' , success : false});
        }
        else {
            return res.status(200).send({message : 'doctor is deleted successfully' , success : true});}
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while delete doctor'+error , success : false})
    }
}

const countDoctor = async(req , res) => {
    try {
        const doctorCount = await doctorModel.countDocuments();
        return res.json({count : doctorCount});
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while count doctor'+ error , success : false});
    }
}

const getAppointment = async(req , res) => {
    try {
        const today = new Date();
        const appointmentList = await appointmentModel.find({
            doctor : req.params.doctor,
            datetime : {$gt : today}
        }).sort({datetime : 1}); 
        const count = appointmentList.length;
        return res.send({list : appointmentList , count : count});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while get appointment for doctor'+ error , success : false});
    }
}

const departmentWiseDoctor = async(req , res) => {
    try {
        const doctorList = await doctorModel.find({department : req.params.department});
        return res.status(200).send(doctorList);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while get department wise doctor'+ error , success : false});
    }
}

const getTodayAppointment = async(req , res) => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const newDate = `${year}-${month}-${day}`;
        const appointmentList = await appointmentModel.find({
            doctor : req.params.doctor,
            datetime : {$eq : newDate},
            status: { $in: ['confirmed', 'attended'] }
        });
        const count = appointmentList.length;
        return res.send({list : appointmentList , count : count});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error while getting today appointment ' + error, success: false });
    }
}

module.exports = { doctorRegister , doctorLogin , listDoctor , listDoctorById , editDoctor , deleteDoctor , countDoctor , getAppointment , departmentWiseDoctor , getTodayAppointment };