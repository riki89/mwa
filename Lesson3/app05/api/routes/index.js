const express = require("express");
const controllerGames = require("../controllers/game.controller");
const multiply = require("../controllers/multiplication");
const controllerPublisher = require("../controllers/publisher.controller");

const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
    
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/multiply/:number1").get(multiply.mult);
router.route("/games/:gameId/publisher")
    .get(controllerPublisher.publisherGetOne);
    
module.exports = router ;