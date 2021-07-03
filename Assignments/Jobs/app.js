const express = require("express");

const app = express();
require("./api/data/db");
const path = require("path");
const route = require("./api/route/route");

app.set("port", 3100);
const server = app.listen(app.get("port"), function(){
    console.log("Server listening on port", server.address().port);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));

app.use("/api", route);

app.use("/node_modules",express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
