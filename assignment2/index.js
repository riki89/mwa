const express = require("express");

const app = express();

app.set("port", 3000);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port ", server.address().port);
})