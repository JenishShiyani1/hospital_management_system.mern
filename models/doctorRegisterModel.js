const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    title:{
        type : String,
        enum:['Mr.' , 'Mrs.' , 'Ms.' , 'Miss.' , 'Dr.'],
        required:[true , 'Title is required']
    },
    firstName : {
        type:String,
        required:[true , 'FirstName is required']
    },
    middleName : {
        type:String,
        required:[true , 'MiddleName is required']
    },
    lastName : {
        type:String,
        required:[true , 'LastName is required']
    },
    mobileNo : {
        type:String,
        required:[true , 'MobileNo is required']
    },
    gender : {
        type:String,
        enum:['Male' , 'Female' , 'Other'],
        required:[true , 'Gender is required']
    },
    profile : {
        type:String,
        require:[true , 'Image is required']
    },
    address : {
        state : {
            type:String,
            required:[true , 'state is required']
        },
        district : {
            type:String,
            required:[true , 'District is required']
        },
        street : {
            type:String,
            required:[true , 'Street is required']
        },
        houseno : {
            type:String,
            required:[true , 'Houseno is required']
        },
        pinCode : {
            type:String,
            required:[true , 'PinCode is required']
        }
    },
    userName : {
        type:String,
        required:[true , 'UserName is required']
    },
    email : {
        type:String,
        required:[true , 'Email is required']
    },
    password : {
        type:String,
        required:[true , 'Password is required']
    },
    department : {
        type:String,
        required:[true , 'Department is required']
    },
    qualification : {
        type:String,
        required:[true , 'Qualification is required']
    },
    experience : {
        type:String,
        required:[true , 'Experience is required']
    },
    appointmentFees : {
        type:Number,
        required:[true , 'AppointmentFees is required']
    },
    time : {
        type:Date,
        required:[true , 'Time is required']
    },
    status : {
        type : String,
        enum : ['Active' , 'Inactive'],
        required : [true , 'Status is required']
    }
});

const doctorModel = mongoose.model('Doctor' , doctorSchema);

module.exports = doctorModel;