const express = require("express");
const controllerGames = require("../controllers/game.controller");
const multiply = require("../controllers/multiplication");
const controllerPublisher = require("../controllers/publisher.controller");

const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
    
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdate)
    .patch(controllerGames.gamesPartialUpdate)
    .delete(controllerGames.gamesDeleteOne);

router.route("/multiply/:number1").get(multiply.mult);
router.route("/games/:gameId/publishers")
    .post(controllerPublisher.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
    .get(controllerPublisher.publisherGetOne)
    .post(controllerPublisher.publisherFullUpdateOne);
    
module.exports = router ;