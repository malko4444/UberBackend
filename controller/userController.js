const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const userServices = require("../services/userServices");

const registerUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { fullname, email, password } = req.body;
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

module.exports = registerUser;
