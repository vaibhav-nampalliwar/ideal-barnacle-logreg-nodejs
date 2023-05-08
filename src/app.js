// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require("express");
const path = require("path");
require("./db/conn")
const app = express();
const hbs = require("hbs");
const Register = require("./models/registers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth"); 

// Set the port number
const port = process.env.PORT || 3000;

// Define paths for static and dynamic content
const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

// Set up middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(static_path));

// Set up Handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// Define routes
app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register")
});

// Protect the "/secrets" route with authentication middleware
app.get("/secrets", auth , (req,res) => {
    
    res.render("secrets")

});

// Handle POST requests to the "/register" route
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerEmp = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });

            // Generate an auth token and set it as a cookie
            const token = await registerEmp.generateAuthToken();

            res.cookie("jwt", token,{
                expires:new Date(Date.now() + 30000),
                httpOnly: true,
                //secure: true // used in production for https 
            });
           
            const registered = await registerEmp.save();

            res.status(201).render("login")

        } else {
            res.send("passord not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


app.get("/login", (req, res) => {
    res.render("login")
});

// Handle POST requests to the "/login" route
app.post("/login",async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password , useremail.password);

        const token = await useremail.generateAuthToken();
        

        res.cookie("jwt", token,{
            expires:new Date(Date.now() + 600000),
            httpOnly: true,
            //secure: true // used in production for https 
        });


        // Check if the user's input password matches the hashed password stored in the database
        if(isMatch){
             // If the passwords match, render the "secrets" page with a 201 status code
            res.status(201).render("secrets")
        }else{
            // If the passwords don't match, send an error message to the client
            res.send("invalid password details")
        }
    } catch (error) {
         // If there's an error during the login process, send an error message to the client
        res.status(400).send("invalid login details");
    }
});

// When the user requests to logout, execute the following code
app.get("/logout", auth , async (req , res) => {
    try {
        // Remove the current token from the user's tokens array
        req.user.token = req.user.tokens.filter((currentElement) =>{
            return currentElement != req.token
        });
        
        // Clear the JWT cookie
        res.clearCookie("jwt");
        console.log("logout succesfully");

        // Save the updated user object to the database
        await req.user.save();
        // Render the login page
        res.render("login");

    } catch (error) {
        // If there's an error during the logout process, send an error message to the client
        res.status(500).send(error);
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
