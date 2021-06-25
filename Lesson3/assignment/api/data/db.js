const mongoose = require("mongoose");
require("../model/game.model")
const dbName = "meanGames";

const dbUrl = "mongodb://localhost:27017/"+dbName;

mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to db "+dbName);
})

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected to db");
})

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error "+ err);
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to mongoose because of application termination");
        process.exit(0);
    })
})

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to mongoose because of application termination");
        process.exit(0);
    })
})