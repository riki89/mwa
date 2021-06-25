const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");

const Game = mongoose.model("Game");
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


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
        message: res
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
        message: res
    }
    console.log("Json request received");
    const gameId = req.params.gameId;
    const idLength = 24;
    if (gameId.length != idLength) {
        res.status(userError).json({ "message": "The length of the game's ID should be " + idLength });
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
            response.message = { "message": "Game ID not found" };
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
    // const db = dbConnection.get();
    // const collection = db.collection("games");
    let newGame = {
        title: req.body.title,
        price: parseFloat(req.body.price),
        year: parseInt(req.body.year),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        rate: parseFloat(req.body.rate),
        designers: req.body.designers,
        publishers: {}
    };
    Game.create(newGame, function (err, game) {
        const response = {
            status: successError,
            message: game
        }
        if (err) {
            response.status = userError;
            response.message = err;
        } else {
            response.status = successError;
            response.message = game;
        }
        res.status(response.status).json(response.message);

    })
}

module.exports.gamesFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const gameId = req.params.gameId;
    const idLength = 24;
    if (gameId.length != idLength) {
        res.status(userError).json({ "message": "The length of the game's ID should be " + idLength });
        return;
    }

    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("Found game error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!game) {
            console.log("Game ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "Game ID not found" };
        }  
        if (game) {
            game.title = req.body.title;
            game.price = parseInt(req.body.price);
            game.year = parseInt(req.body.year);
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.minAge = parseInt(req.body.minAge);
            game.rate = parseInt(req.body.rate);
            game.designers = req.body.designers;
            game.publisher = {};
    
            game.save(function (err, updatedGame) {
                if (err) {
                    console.log("Game not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Game not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedGame
                }
                res.status(response.status).json(response.message);
            })            
        }
    });

}

module.exports.gamesPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const gameId = req.params.gameId;
    const idLength = 24;
    if (gameId.length != idLength) {
        res.status(userError).json({ "message": "The length of the game's ID should be " + idLength });
        return;
    }

    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("Found game error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!game) {
            console.log("Game ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "Game ID not found" };
        }  if (game) {
            if (req.body.title) {
                game.title = req.body.title;
            }
            if (req.body.price) {
                game.price = parseFloat(req.body.price);
            }
            if (req.body.year) {
                game.year = parseInt(req.body.year);
            }
            if (req.body.minPlayers) {
                game.minPlayers = parseInt(req.body.minPlayers);
            }
            if (req.body.maxPlayers) {
                game.maxPlayers = parseInt(req.body.maxPlayers);
            }
            if (req.body.minAge) {
                game.minAge = parseInt(req.body.minAge);
            }
            if (req.body.designers) {
                game.designers = req.body.designers;
            }
            game.publisher = {};
    
            game.save(function (err, updatedGame) {
                if (err) {
                    console.log("Game not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Game not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedGame
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.gamesDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const gameId = req.params.gameId;
    const idLength = 24;
    if (gameId.length != idLength) {
        res.status(userError).json({ "message": "The length of the game's ID should be " + idLength });
        return;
    }

    Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {
        if (err) {
            console.log("Found game error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedGame) {
            console.log("Game ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "Game ID not found" };
        } else {
            console.log("Game deleted ", deletedGame);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedGame;
        }
        res.status(response.status).json(response.message);
    });
}
