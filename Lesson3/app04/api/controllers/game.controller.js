const dbConnection = require("../data/dbconnection");
const objectId = require("mongodb").objectId;
const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.gamesGetAll = function(req, res){
    console.log("Json request received");
    let offset = 0;
    let count = 4;
    if (req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count){
        count = parseInt(req.query.count);
        if (count > 8){
            count = 8;
        }
    }
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    // const docs = collection.find({});

    // collection.find().skip(offset).limit(count).toArray(function(err, docs){
    //     res.status(200).json(docs);
    // });
    // console.log(docs);
    // res.status(200).json(gamesData);
    Game.find().exec(function(err, games){
        console.log("Found games", games);
        res.status(200).json(games);
    })

    // res.status(200).json(pageGames);
    //
}

module.exports.gamesGetOne = function(req, res){
    console.log("Json request received");
    const gameId = req.params.gameId;
    // const theGame = gamesData[gameId];

    // const db = dbConnection.get();
    // const collection = db.collection("games");
    // collection.find({_id: ObjectID(gameId)}, function(err, doc){
    //     console.log("Fame found ", doc);
    //     res.status(200).json(doc);
    // })
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
