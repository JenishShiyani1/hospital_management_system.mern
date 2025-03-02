const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentID : {
        type : String,
        required : [true , 'ID is required']
    },
    departmentName : {
        type : String,
        required : [true , 'departmentName is required']
    },
    description : {
        type : String,
        required : [true , 'Description is required']
    },
    status : {
        type : String,
        enum : ['Active' , 'Inactive'],
        required : [true , 'Status is required']
    }
});

const departmentModel = mongoose.model('Department' , departmentSchema);

module.exports = departmentModel;