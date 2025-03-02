const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true , 'UserName is required']
    },
    mobileNo : {
        type:String,
        required:[true , 'MobileNO is required']
    },
    profile : {
        type:String,
        required:[true , 'profile is required']
    },
    status : {
        type:String,
        enum : ['Active' , 'InActive'],
        required:[true , 'status is required']
    },
    email: {
        type:String,
        required:[true , 'Email is required']
    },
    password : {
        type:String,
        required : [true , 'Password is required']
    }
});

const adminModel = mongoose.model('Admin',adminSchema);

module.exports = adminModel;