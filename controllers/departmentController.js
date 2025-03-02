const departmentModel = require('../models/departmentModel');
const doctorModel = require('../models/doctorRegisterModel');

const addDepartment = async(req , res) => {
    try {
        const exist = await departmentModel.findOne({departmentName : req.body.departmentName});

        if(exist) {
            return res.status(200).send({message : 'department already exist' , success : false});
        }
        else {
            const newDepartment = new departmentModel(req.body);
            await newDepartment.save();
            return res.status(200).send({message : 'department add successfully' , success : true});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while adding department'+error , success : false});
    }
}

const listDepartment = async(req , res) => {
    try {
        const totalDepartment = await departmentModel.find();
        return res.status(200).send(totalDepartment);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while add department'+ error , success : false});
    }
}

const listDepartmentByID = async(req , res) => {
    try {
        const departmentById = await departmentModel.findOne({_id : req.params.id});
        return res.status(200).send(departmentById);
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({message : 'error while get department by id '+ error , success : false});
    }
}

const updateDepartmentByID = async(req , res) => {
    try {
        const ID = req.params.id;
        const departmentData = req.body;
        const updateDepartment = await departmentModel.findByIdAndUpdate(ID , departmentData , {new : true});
    
        if(!updateDepartment) {
            return res.status(200).send({message : 'Department is not updated' , success : false});
        }
        else {
            return res.status(200).send({message : 'department updated successfully' , success : true});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while update department by id '+ error , success : false});
    }
}

const deleteDepartmentByID = async(req , res) => {
    try {
        const deleteDepartment = await departmentModel.findByIdAndDelete(req.body.id);

        if(deleteDepartment.count === 0) {
            return res.status(200).send({message : 'Department is not deleted' , success : false});
        }
        else {
            return res.status(200).send({message : 'Department is deleted successfully' , success : true});}
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while delete department by id '+ error , success : false});
    }
}

const countDepartment = async(req , res) => {
    try {
        const departmentCount = await departmentModel.countDocuments();
        return res.json({count : departmentCount});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while count department'+error , success : false});
    }
}

const departmentWiseDoctor = async(req , res) => {
    try {
        const doctor = await doctorModel.find({department : req.params.dept});
        res.status(200).send(doctor);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message : 'error while get department'+ error , success : false});
    }
}

module.exports = { addDepartment , listDepartment , listDepartmentByID , updateDepartmentByID , deleteDepartmentByID , countDepartment , departmentWiseDoctor }