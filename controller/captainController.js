const captainModel = require("../models/captainModel");
const captainServices = require("../services/captainServices");
const { validationResult } = require('express-validator');
const blackListModel = require("../models/blackListModel");

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
module.exports.loginCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    console.log("in the controller block of login");
    
    const { email, password } = req.body;
    const captain = await captainModel.findOne({email}).select("+password");//also get the password from the 
    console.log("captain in the login block ",captain);
    if (!captain) {
        return res.status(400).json({ error: "Invalid email" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
    }
    const token = await captain.genCaptainToken();
    console.log("the token in the login com",token);
    
    res.cookie("token", token);
    res.status(200).json({ token,captain });
}



module.exports.captainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
}
module.exports.logoutCaptain = async (req, res) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListModel.create({token});
    res.status(200).json({message: "Logout successfully"});
}