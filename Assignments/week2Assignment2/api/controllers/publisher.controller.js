// const dbConnection = require("../data/dbconnection");

const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const _addPublisher = function(req, res, game){
    //console.log("1: name ", typeof(game.publisher));
    
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    //game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    //console.log("Game to save ", req.body.name);
    game.save(function(err, updateGame){
        const response = {
            status: successError,
            message: updateGame
        }
        if (err){
            response.status = serverError;
            response.message = err;
        } else {
            response.status = successError;
            response.message = updateGame;
        }
        res.status(response.status).json(response.message);

    })
    
}

module.exports.publisherGetOne = function(req, res){
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one publisher request received");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("publisher").exec(function(err, publisher){
        if (err){
            response.status = notFoundError;
            response.message = err;
        } else {
            // console.log(game.publisher);
            response.message = publisher ; //? game.publisher:[];
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.publisherAddOne = function (req, res) {
    console.log("Add one publisher");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 200,
            message: game
        }
        if (err){
            response.status = serverError,
            response.message = err;
        } else if (!game){
            console.log("Error creating game");
            response.status = notFoundError,
            response.message = {"message": "Game ID not found"};
        } 
        if (game) {
           //console.log("Game found ", game);
            _addPublisher(req, res, game);
        } else{
            res.status(response.status).json(response.message);
        }
    })
   
}

module.exports.publisherFullUpdateOne = function(req, res){
    console.log("Get one publisher request received");
    const response = {
        status: 200,
        message: []
    }
    const gameId = req.params.gameId;
    
    Game.findById(gameId).exec(function(err, game){
        if (err) {
            console.log("Game not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!game){
            response.status = notFoundError;
            response.message = { "message": "Publisher not found" }
        } if (game) {
            // response.status = notFoundError;
            game.publisher.name = req.body.name;
            game.publisher.country = req.body.country;
            //game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            game.save(function(err, updateGame){
                const response = {
                    status: successError,
                    message: updateGame
                }
                if (err){
                    response.status = serverError;
                    response.message = err;
                } else {
                    response.status = successError;
                    response.message = updateGame;
                }
                res.status(response.status).json(response.message);

    })
    //         response.message = updatedGame.publisher
        }
        // res.status(response.status).json(response.message);
    })
}

module.exports.publisherDeleteOne = function(req, res){
    console.log("Get one publisher request received");
    const response = {
        status: 200,
        message: []
    }
    const gameId = req.params.gameId;
    
    Game.findById(gameId).exec(function(err, game){
        if (err) {
            console.log("Game not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!game){
            response.status = notFoundError;
            response.message = { "message": "Publisher not found" }
        } 
        if (game) {
            game.publisher.remove();
            game.save(function (err, deletedGame) {
                if (err) {
                    console.log("Game not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Game not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = deletedGame
                }
                //res.status(response.status).json(response.message);
            })
           // response.message = deletedGame.publisher
        }
        res.status(response.status).json(response.message);
    })
}