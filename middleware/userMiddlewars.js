const BlackList = require("../models/blackListModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


module.exports.authUser = async (req, res, next) => {
    // i get the Token from the request and when i get this than i decode the token after that i find the user by id and if the user is not found than i send the response that user is not found 
    console.log("authUser middleware triggered");


    let token = null;

    // Extract token from cookies or headers
    if (req.cookies?.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
const isBlackListed = await BlackList.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    try {
        // Verify the token
        console.log("env", process.env.SECRETKEY);
        
        
        
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        console.log("Decoded Token:", decoded);

        // Find user by ID
        req.user = await userModel.findById(decoded._id);
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
