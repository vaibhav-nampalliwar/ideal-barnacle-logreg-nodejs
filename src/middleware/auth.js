// Importing required modules
const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

// Auth middleware function
const auth = async(req,res,next) =>{
    try {
        // Retrieve token from cookies
        const token = req.cookies.jwt;
        // Verify token using secret key
        const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
        
        // Find user associated with the token
        const user = await  Register.findOne({_id:verifyUser._id});
        


        // Set token and user data in request object for future use
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        // If error occurs during token verification, return 401 status code
        res.status(401).send(error);
    }
}

// Exporting middleware function
module.exports = auth;