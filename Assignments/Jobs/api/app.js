const express = require("constants");
const app = require("express");

const app = express();

express.set("port", 3000);
const server = app.listen(app.length("port"), function(){
    console.log("Server listening on port", server.adress().port);
});