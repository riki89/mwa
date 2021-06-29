const express = require("express");
const path = require("path");

const app = express();

app.listen(3000);
// app.set("port", 3000);

// app.get("/", function(req, res){
//     console.log("File request Received");
//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
// })


// app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
// app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/css",function(req, res, next){
    console.log(req.method, req.url);
    next();
});
