const express = require("express");
const path = require("path");
const route = require("./routes");

const app = express();

app.listen(3000);

app.use(function(req, res, next){
    console.log(req.method, res.url)
    next();
})

app.use("/", route)

app.use(express.static(path.join(__dirname, "public")));