angular.module("meanGames").controller("GameController", GameController);

function GameController(){
    const vm = this;
    vm.title = "my mean game";
    $http.get("/api/games").then(function(response){
        vm.games = response.data;
    })
}