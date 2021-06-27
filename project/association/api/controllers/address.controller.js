const mongoose = require("mongoose");
const Game = mongoose.model("Member");

const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const _addPublisher = function(req, res, game){
    //console.log("1: name ", typeof(game.address));
    
    game.address.name = req.body.name;
    game.address.country = req.body.country;
    //game.address.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
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

module.exports.addressGetOne = function(req, res){
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one address request received");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("address").exec(function(err, address){
        if (err){
            response.status = notFoundError;
            response.message = err;
        } else {
            // console.log(game.address);
            response.message = address ; //? game.address:[];
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.addressAddOne = function (req, res) {
    console.log("Add one address");
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

module.exports.addressFullUpdateOne = function(req, res){
    console.log("Get one address request received");
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
            game.address.name = req.body.name;
            game.address.country = req.body.country;
            //game.address.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
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
    //         response.message = updatedGame.address
        }
        // res.status(response.status).json(response.message);
    })
}

module.exports.addressDeleteOne = function(req, res){
    console.log("Get one address request received");
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
            game.address.remove();
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
           // response.message = deletedGame.address
        }
        res.status(response.status).json(response.message);
    })
}