// const dbConnection = require("../data/dbconnection");

const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const _addReview = function(req, res, game){
    //console.log("1: name ", typeof(game.publisher));
    const newReview = {
        name: req.body.name,
        review: req.body.review,
        date: req.body.date
    }
    game.review.push(newReview);

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


module.exports.reviewGetAll = function(req, res){
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one publisher request received");
    const gameId = req.params.gameId;
   
    Game.findById(gameId).select("review").exec(function(err, review){
        if (err){
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = review ; 
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.reviewGetOne = function(req, res){
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one publisher request received");
    const gameId = req.params.gameId;
    const reviewId = rew.params.reviewId;
   
    Game.findById(gameId).select("review").exec(function(err, game){
        if (err){
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = game.reviews.id(reviewId); 
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.reviewAddOne = function (req, res) {
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
            _addReview(req, res, game);
        } else{
            res.status(response.status).json(response.message);
        }
    })
   
}

module.exports.reviewFullUpdateOne = function(req, res){
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
            response.message = { "message": "Review not found" }
        } if (game) {
            // response.status = notFoundError;
            game.reviews.name = req.body.name;
            game.reviews.country = req.body.country;
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
        }
    })
}

module.exports.reviewDeleteOne = function(req, res){
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
            game.reviews.remove();
            game.save(function (err, deletedGame) {
                if (err) {
                    console.log("Game not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Game not updated" }
                } else {
                    response.message = deletedGame
                }
            })
        }
        res.status(response.status).json(response.message);
    })
}