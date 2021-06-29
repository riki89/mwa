angular.module("meanGames").controller("GameController", GameController);

function GameController(GamesDataFactory, $routeParams){
    const vm = this;
    const gameId = $routeParams.gameId;
    GamesDataFactory.getOne(gameId).then(function(response){
        vm.game = response;
    })
}