const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    title:{
        type : String,
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
    dob : {
        type:Date,
        required:[true , 'DOB is required']
    },
    gender : {
        type:String,
        required:[true , 'Gender is required']
    },
    bloodGroup : {
        type:String,
        required:[true , 'BloodGroup is required']
    },
    occupation : {
        type:String,
        required:[true , 'Occupation is required']
    },
    maritalStatus : {
        type:String,
        required:[true , 'MaritalStatus is required']
    },
    height : {
        type:String,
        required:[true , 'Height is required']
    },
    weight : {
        type:String,
        required:[true , 'Weight is required']
    },
    profile : {
        type:String,
        required:[true , 'Image is required']
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
        type : String,
        required:[true,'department name is required']
    },
    doctor : {
        type:String,
        require:[true , 'Doctor Name is required']
    },
    datetime : {
        type:Date,
        require:[true , 'Date is required']
    },
    status : {
        type : String,
    }
});

const appointmentModel = mongoose.model('Appointment' , appointmentSchema);

module.exports = appointmentModel;