const express = require("express");

const route = express.Router();

module.exports.mult = function(req, res){
    let number1 = req.params.number1;
    let number2 = 0;
    if (req.query && req.query.number2){
        number2 = parseFloat(req.query.number2);
    }
    
    let result = number1 * number2;
    // console.log("number1: "+ req.params.number1, " number2: " + number2);
     console.log(number1 + " * "+ number2 + " = "+ result);
    res.status(200).json({"result":result});
};