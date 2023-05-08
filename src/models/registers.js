// Require the necessary dependencies: Mongoose and bcryptjs
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define a new Mongoose schema for a user registration. 
// The schema includes the fields firstname, lastname, email, password, and confirmpassword.
// The firstname, lastname, and email fields are required and the email field is unique. 
const employSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

});

// Define a method called generateAuthToken on the employSchema object
employSchema.methods.generateAuthToken = async function () {
    try {
        // Generate a token using the jsonwebtoken package, containing the _id of the current user object
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        // Append the generated token to the tokens array of the current user object
        this.tokens = this.tokens.concat({token:token});
        // Save the modified user object to the database
        await this.save();
        // Return the generated token
        return token
    } catch (error) {
        // If there is an error during the token generation process, send a response containing the error message
        res.send("the error" + error);
        // Also log the error to the console for debugging purposes
        console.log(error);
    }
}

// Add a pre-save hook to the schema.
// This hook is triggered before the user document is saved and hashes the password using bcryptjs.
employSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
       // Hash the password using bcryptjs and update the password field with the hashed value.
        this.password = await bcrypt.hash(this.password, 10); 
        this.cpassword = await bcrypt.hash(this.password, 10); 
        
        

        // Set the value of the confirmpassword field to undefined.
        // This field is only used for validation during user registration and is not needed after the password has been hashed
        this.confirmpassword = undefined;
    }

    next();
})

// Create a new Mongoose model called Register using the employSchema schema.
const Register = new mongoose.model("Register", employSchema);

// Export the Register model so that it can be used in other parts of the application.
module.exports = Register;
