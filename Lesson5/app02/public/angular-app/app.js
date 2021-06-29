angular.module("meanGames", ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/game-list/game-list.html",
        controller:"GamesController",
        controllerAs: "vm"
    }).when("/games/:gameId", {
        templateUrl: "angular-app/game-display/game.html",
        controller:"GameController",
        controllerAs: "vm"
    })
}