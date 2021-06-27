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
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/api", route);

app.use(express.static(path.join(__dirname, "public")));