const app = require("express");
const router = app.Router();
const gamesController = require("../controllers/games.controller");

router.route("/games").get(gamesController.getAllGames);
router.route("/games/:gameId").get(gamesController.gamesGetOne);

module.exports = router;