const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const userServices = require("../services/userServices");
const blackListModel = require("../models/blackListModel");

const registerUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { fullname, email, password } = req.body;
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "Email already exists" });
            }
        console.log("user data",fullname,email, password);

        // ✅ Ensure password hashing works properly
        const hashedPassword = await userModel.hashPassword(password);
        
        

        // ✅ Create user
        const user = await userServices.creatUser({
            firstName : fullname.firstName,
            lastName: fullname.lastName,
            email,
            password: hashedPassword
        });
        
        
        

        // ✅ Generate token using the instance method
        const token = user.generateAuthToken();
        console.log("user data after compilation in the section ",fullname,email, password);


        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const loginUser = async(req,res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select("+password");//also get the password from the 
    // data base if the email is found
    console.log("user in db",user);
    
    if(!user){
        return res.status (401) .json({error: "Invalid email or password"});

    }
    const isValid = await user.comparePassword(password);
    console.log( "is valid", isValid);
    
    if(!isValid){
        return res.status(401).json({error: "Invalid email or password"});
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({user, token});

};
const userProfile = async(req,res, next) => {
    res.status(200).json({user: req.user});
    // res.json("the profile")
};
const logOutUser = async(req,res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blackListModel.create({token});
    res.status(200).json({message: "Logout successfully"});
};
module.exports = {registerUser,userProfile,loginUser,logOutUser};
