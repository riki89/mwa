const dbConnection = require("../data/dbconnection");

const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function(req, res){
    console.log("Get one publisher request received");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("publisher").exec(function(err, doc){
        console.log("Fame found ", doc);
        res.status(200).json(doc);
    })
}