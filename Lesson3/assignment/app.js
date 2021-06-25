const express = require("express");
require("./api/data/db")

const routes = require("./api/routes");
const route2 = require("./question2/api/routes");

const app = express();

app.listen(4100);
console.log("listen on 4100");
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use("/api", routes);
//app.use("/question2", route2);
