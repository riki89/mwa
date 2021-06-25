const dbConnection = require("../data/db");

const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.getAllGames = function(req, res){
    //res.json({"test": "test"});
    let offset = 0;
    let count = 4;
    let maxCount = 8;

    if (req.query && req.query.offset && req.query.count){
        count = req.query.count;
        if (count > maxCount){
            count = maxCount;
        }
    }

    Game.find().exec(function(err, games){
        console.log("Found games", games);
        res.status(200).json(games);
    })
}

module.exports.gamesGetOne = function(req, res){
    console.log("Json request received");
    const gameId = req.params.gameId;
    if (!gameId){
        gameId = 1;
    }
   
    Game.findById(gameId).exec(function(err, doc){
        console.log("Fame found ", doc);
        res.status(200).json(doc);
    })
}