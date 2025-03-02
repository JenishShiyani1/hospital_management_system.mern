const adminModel = require('../models/adminLoginModel');
const bcrypt = require('bcrypt');
const uploadOnCloudinary = require('../config/cloudinary');

const adminRegister = async(req , res) => {
    try {
        const exist = await adminModel.findOne({email : req.body.email});
        if(exist) {
            return res.status(200).send({message : 'admin already exist' , success : false})
        }
        else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password , salt);
            req.body.password = hashPassword;
            
            const adminData = req.body;
            adminData.profile = req.file.path;
            
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if(!cloudinaryResponse) {
                return res.status(500).send({ message: 'Error uploading image to Cloudinary', success: false });
            }

            adminData.profile = cloudinaryResponse.url;

            const newAdmin = new adminModel(adminData);
            await newAdmin.save();
            return res.status(201).send({message : 'admin register successfully' , success : true})
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error in admin registration' + error , success : false})
    }
}

const adminLogin = async(req , res) => {
    try {
        const checkEmail = await adminModel.findOne({email : req.body.email})

        if(!checkEmail) {
            return res.status(200).send({message : 'User Not Found' , success : false})
        }

        const checkPassword = await bcrypt.compare(req.body.password , checkEmail.password);

        if(!checkPassword) {
            return res.status(200).send({message : 'Invalid username or password' , success : false})
        }

        return res.status(200).send({message : 'Login Successfully' , success : true , id : checkEmail._id});
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while login admin' + error , success : false})
    }
}

const getAdminById = async(req , res) => {
    try {
        const admin = await adminModel.findById({_id : req.params.id});
        res.status(200).send(admin);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while get admin' + error , success : false})
    }
}

module.exports = { adminRegister , adminLogin , getAdminById };