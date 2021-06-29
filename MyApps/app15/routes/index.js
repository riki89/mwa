const express = require("express");
const controllerGames = require("../controllers/game.controller");

const router = express.Router();
router.route("/json")
    .get(controllerGames.gamesGetAll);
    
    module.exports = router ;