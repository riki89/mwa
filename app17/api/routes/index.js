const express = require("express");
const controllerGames = require("../controllers/game.controller");

const router = express.Router();
router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
    
module.exports = router ;