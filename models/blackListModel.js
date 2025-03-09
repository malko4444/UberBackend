const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 86400 // 24 hours = 86400 seconds
    }
});

const BlackList = mongoose.model('BlackList', blackListSchema);
module.exports = BlackList;
