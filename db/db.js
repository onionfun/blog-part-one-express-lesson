const mongoose = require('mongoose');

//the connectionString defines/creates which db we will connect to
//if using mongo to test, be sure you're in the same db!!!
const connectionString = "mongodb://localhost/blog";

mongoose.connect(connectionString, { useNewUrlParser: true});

mongoose.connection.on('connected', ()=>{
    console.log("the goose is loose");
})

mongoose.connection.on('disconnected', ()=>{
    console.log("MONGOOSE IS NO MORE");
})

mongoose.connection.on('error', (err)=>{
    console.log("Mongoose done fucked up");
    console.log(err)
})