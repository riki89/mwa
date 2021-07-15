const mongoose = require("mongoose");
require("./association-model");
require("./users-model");

const dbName = "meanAssociation";
// const dbUrl = "mongodb://localhost:27017/"+dbName;
const dbUrl = "mongodb://localhost/"+dbName;

mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to db "+ dbUrl);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error "+err);
});

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

// process.on("SIGUSR2", function(){
//     mongoose.connection.close(function(){
//         console.log("Send disconnect to mongoose because of application restart");
//         process.kill(process.pid, "SIGUSR2");
//     })
// });
