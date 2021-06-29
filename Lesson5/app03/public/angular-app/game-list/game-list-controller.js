angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesDataFactory){
    const vm = this;
    GamesDataFactory.getAll().then(function(response){
        vm.games = response;
    })
}