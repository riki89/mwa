const mongoose = require("mongoose");
require("./job.model")

const dbName = "meanJobs";

const dbUrl = "mongodb://localhost/"+dbName;

mongoose.connect(dbUrl, {useNewUrlParser:true}, {useUnifiedTopology:true});

mongoose.connection.on("connect", function(){
    console.log("Mongoose connected to db"+dbUrl);
})

mongoose.connection.on("disconnect", function(){
    console.log("Mongoose disconnected to db");
})

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error", err);
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to mongoose because of application termination");
        process.exit(0);
    });
})

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Send disconnect to mongoose because of application termination");
        process.exit(0);
    })
})