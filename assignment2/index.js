const express = require("express");
const route = require("./routes/index");

const app = express();

app.set("port", 4000);
app.use("/api", route);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port ", server.address().port);
})
