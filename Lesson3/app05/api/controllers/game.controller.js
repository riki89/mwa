const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");

const Game = mongoose.model("Game");
const userError = 400;
const serverError = 500;
const successError = 200;


const runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 1000,
                $minDistance: 0
            }
        }
    };

    Game.find(query).exec(function (err, games) {
        if (err) {
            res.status(500).json("error: " + err);
        }
        console.log("Found games", games);
        res.status(200).json(games);
    })
}

module.exports.gamesGetAll = function (req, res) {
    console.log("Json request received");
    const response = {
        status: successError,
        message: game
    }
    let offset = 0;
    let count = 5;
    const maxCount = 8;

    if (req.query && req.query.lng && req.query.lat) {
        runGeoQuery(req, res);
        return;
    }


    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(userError).json({ "message": "QueryString offset or count are not valid number" });
        return;
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > maxCount) {
            // count = maxCount;
            console.log("maxCount exceeded");
            res.status(userError).json({ "message": "Can not exceed count of " + maxCount });
        }
    }


    Game.find().exec(function (err, games) {
        if (err) {
            console.log("Error finding games ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found games", games.length);
            // res.status(200).json(games);
            response.status = successError;
            response.message = games;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.gamesGetOne = function (req, res) {
    const response = {
        status: successError,
        message: game
    }
    console.log("Json request received");
    const gameId = req.params.gameId;
    const idLength = 24;
    if (gameId.length != idLength){
        res.status(userError).json({"message": "The length of the game's ID should be "+idLength});
        return;
    }

    Game.findById(gameId).exec(function (err, doc) {
        if (err) {
            console.log("Found game error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("Game ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = {"message": "Game ID not found"};
        } else {
            console.log("Game found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.gamesAddOne = function (req, res) {
    console.log("Add one game");
    const db = dbConnection.get();
    const collection = db.collection("games");
    let newGame = {};
    if (req.body && req.body.title && req.body.price) {
        // console.log("the body :"+ req.body);
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        collection.insertOne(newGame, function (err, response) {
            if (err) {
                console.log("Error finding a game ", err);
                res.status(userError).json(err);
            } else
                console.log("Game saved ", response);
            res.status(201).json(req.body);
        })
        res.status(successError).json(req.body);
    } else {
        console.log("Missing ...");
        res.status(userError).json({ err: "Required data missing from POST" });
    }
    console.log(req.body);
    res.status(successError).json(req.res);
}
