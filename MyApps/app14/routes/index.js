const express = require("express");

const router = express.Router();
router.route("/json")
    .get(function(rq, res){
        console.log("Request received");
        res.status(200).json({"JsonData": true});
    })
    .post(function(rq, res){
        console.log("Json Post received");
        res.status(200).json({"JsonData": false});
    })