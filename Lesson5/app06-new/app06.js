const express = require("express");
const path = require("path");
// require("./api/data/dbconnection").open();
require("./api/data/db");

const route = require("./api/routes/route");

const app = express();

app.listen(3100);

app.use(function(req, res, next){
    console.log(req.method, res.url)
    next();
})

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));

app.use("/api", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http:localhost:4200");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
})
app.use("/api", route);

app.use("/node_modules",express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));