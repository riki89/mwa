const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");

const Game = mongoose.model("Game");

const runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const query = {
        "publisher.location": {
            $near : {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
            $maxDistance: 1000,
            $minDistance: 0
            }
        }
    };

    Game.find(query).exec(function(err, games){
        if (err){
            res.status(500).json("error: "+err);
        }
            console.log("Found games", games);
            res.status(200).json(games);
    })
}

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");
    let offset = 0;
    let count = 4;
    const maxCount = 8;
    
    if (req.query && req.query.lng && req.query.lat){
        runGeoQuery(req, res);
        return;
    }

    
    if (req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count){
        count = parseInt(req.query.count);
        if (count > maxCount){
            count = maxCount;
        }
    }
    

    Game.find().exec(function(err, games){
        console.log("Found games", games.length);
        res.status(200).json(games);
    })
}

module.exports.gamesGetOne = function(req, res){
    console.log("Json request received");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).exec(function(err, doc){
        console.log("Fame found ", doc);
        res.status(200).json(doc);
    })
}

module.exports.gamesAddOne = function(req, res){
    console.log("Add one game");
    const db = dbConnection.get();
    const collection = db.collection("games");
    let newGame = {};
    if(req.body && req.body.title && req.body.price){
        // console.log("the body :"+ req.body);
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        collection.insertOne(newGame, function(err, response){
            console.log("Game saved ", response);
            res.status(201).json(req.body);
        })
        res.status(200).json(req.body);
    } else {
        console.log("Missing ...");
        res.status(400).json({err: "Required data missing from POST"});
    }

    console.log(req.body);
    // const gameId = req.params.gameId;
    // const theGame = gamesData[gameId];
    res.status(200).json(req.res);
}
