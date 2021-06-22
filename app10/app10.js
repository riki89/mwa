const express = require("express");

const app = express();

// app.listen(3000);
app.set("port", 3000);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port ", server.adress().port);
})

console.log("Listening on port: 3000");