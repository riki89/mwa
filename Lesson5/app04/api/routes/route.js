const express = require("express");
const controllerGames = require("../controllers/game.controller");
const multiply = require("../controllers/multiplication");
const controllerPublisher = require("../controllers/publisher.controller");
const controllerReview = require("../controllers/review.controller");

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
    .get(controllerPublisher.publisherGetOne)
    .post(controllerPublisher.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
    //.get(controllerPublisher.publisherGetOne)
    .put(controllerPublisher.publisherFullUpdateOne)
    .delete(controllerPublisher.publisherDeleteOne);


router.route("/games/:gameId/reviews")
    .get(controllerReview.reviewGetAll)
    .post(controllerReview.reviewAddOne);

router.route("/games/:gameId/reviews/:reviewId")
    .put(controllerReview.reviewFullUpdateOne)
    .delete(controllerReview.reviewDeleteOne);


module.exports = router;