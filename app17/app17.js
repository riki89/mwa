const express = require("express");
const path = require("path");
const route = require("./api/routes");

const app = express();

app.listen(3000);

app.use(function(req, res, next){
    console.log(req.method, res.url)
    next();
})

app.use("/api", route);

app.use(express.static(path.join(__dirname, "public")));