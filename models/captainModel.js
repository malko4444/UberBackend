const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema ({
    
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastName: {
        type: String,
        // required: true,
        minlength: [3, 'Last name must be at least 3 characters long'],
    },

    
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    socketId: {
        type: String,
        // required: true,
    },
    status: {
        type: String,
        enum: ['active','inActive'],
        default: 'inActive',
    },
    
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plateNumber: {
            type: String,
            required: true,
            minlength: [3, 'Plate number must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        vehicleType: {
            type: String,
            enum: ['car','motorcycle','auto'],
            required: true,
        },
    
    
        lat: {
            type: Number,
            // required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    
})

captainSchema.methods.genCaptainToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.SECRETKEY,
        { expiresIn: '24h' }
    );
};

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
} 
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
    
}
const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;