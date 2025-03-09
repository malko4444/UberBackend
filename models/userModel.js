const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//     fullname: {
//         firstName: {
//             type: String,
//             required: true,
//             minlength: [3, "  first name is must be 3 characters"],
//         },
//         lastName: {
//             type: String,

//             minlength: [3, " last name is must be 3 characters"],
//         },
        
//     },email: {
//         type: String,
//         required: true,
//         unique: true,

//     },
//     password: {
//         type: String,
//         required: true,
//         select: false,//to dont send the password when we find the user in the data base so that why we use this 
//         minlength: [8, " password must be 8 characters"],
//     },
//     socketId: {
//         type: String,

//     }
// })

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters"],
    },
    lastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,  // Don't return password when fetching users
        minlength: [8, "Password must be at least 8 characters"],
    },
    socketId: {
        type: String,
    }
});

// to generate the token on the user schema 
userSchema.methods.generateAuthToken = function () { // Change statics to methods
    const token = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;