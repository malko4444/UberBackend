const BlackList = require("../models/blackListModel");
const captainModel = require("../models/captainModel");
const jwt = require("jsonwebtoken");

module.exports.authCaptain = async (req, res, next) => {
console.log("authCaptain middleware triggered");


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
    console.log("secretKey", process.env.SECRETKEY);
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    console.log("Decoded Token:", decoded);
    req.captain = await captainModel.findById(decoded.id);

console.log("req.captain", req.captain);
    next();
    
} catch (error) {
    console.log("JWT Verification Error:", error.message);
    
}

}