const captainModel = require("../models/captainModel");
const captainServices = require("../services/captainServices");
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { fullName, age, email, password, vehicle,location } = req.body;
    const isExist = await captainModel.findOne({ email });
    if (isExist) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    
    const captain = await captainServices.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        age,
        email,
        password: hashedPassword,
        vehicle,
        location
    });
    const token = await captain.genCaptainToken();
    res.status(201).json({ token,captain });

}


