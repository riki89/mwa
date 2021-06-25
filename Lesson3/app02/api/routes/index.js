const express = require("express");
const controllerGames = require("../controllers/game.controller");
const multiply = require("../controllers/multiplication");

const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
    
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/multiply/:number1").get(multiply.mult);
    
module.exports = router ;