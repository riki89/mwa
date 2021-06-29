const express = require("express");
const path = require("path");

const app = express();

app.listen(3000);
// app.set("port", 3000);


app.get("/json", function(req, res){
    console.log("GET Received");
    res.status(200).json({"jsonData": true});
})

app.get("/file", function(req, res){
    console.log("File request Received");
    res.status(200).sendFile(path.join(__dirname, "app11.js"));
})