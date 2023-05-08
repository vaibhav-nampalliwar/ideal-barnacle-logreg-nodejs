// Importing Mongoose module
const mongoose = require("mongoose");

// Establishing connection to the database using the URL provided in the environment variable DB_NAME
mongoose.connect( process.env.DB_NAME ,{
    useNewUrlParser: true, // Flag to use new URL parser
    useUnifiedTopology: true // Flag to use new server discover and monitoring engine
}).then(() =>{
    console.log("connected to database");
}).catch((e) => {
    console.log("not connected to database");
})