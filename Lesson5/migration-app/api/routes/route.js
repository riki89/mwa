const express = require("express");
const controllerGames = require("../controllers/game.controller");
// const multiply = require("../controllers/multiplication");
const controllerPublisher = require("../controllers/publisher.controller");
const controllerReview = require("../controllers/review.controller");
const controllerUser = require("../controllers/user.controller");

const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);
    // .post(controllerUser.authenticate, controllerGames.gamesAddOne);

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerUser.authenticate, controllerGames.gamesFullUpdate)
    .patch(controllerUser.authenticate, controllerGames.gamesPartialUpdate)
    .delete(controllerUser.authenticate, controllerGames.gamesDeleteOne);

// router.route("/multiply/:number1").get(multiply.mult);
router.route("/games/:gameId/publishers")
    .get(controllerPublisher.publisherGetOne)
    .post(controllerUser.authenticate, controllerPublisher.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
    //.get(controllerPublisher.publisherGetOne)
    .put(controllerUser.authenticate, controllerPublisher.publisherFullUpdateOne)
    .delete(controllerUser.authenticate, controllerPublisher.publisherDeleteOne);


router.route("/games/:gameId/reviews")
    .get(controllerReview.reviewGetAll)
    .post(controllerUser.authenticate, controllerReview.reviewAddOne);

router.route("/games/:gameId/reviews/:reviewId")
    .put(controllerUser.authenticate, controllerReview.reviewFullUpdateOne)
    .delete(controllerUser.authenticate, controllerReview.reviewDeleteOne);

//Users routes
router.route("/users")
    .post(controllerUser.register);

router.route("/users/login")
    .post(controllerUser.login);


module.exports = router;