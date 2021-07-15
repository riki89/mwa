angular.module("meanGames").directive("gameRating", GameRating);
function GameRating() {
    return {
        restrict: "E",
        templateUrl: "angularJS-app/game-rating/rating.html",
        bindToController: true,
        controller: "GameController",
        controllerAs: "vm",
        scope: {

        }

    };
}