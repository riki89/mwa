angular.module("meanGames").controller("GameController", GameController);

function _getStarsArray(rating){
    return new Array(rating);
}
function GameController(GamesDataFactory, $routeParams, $location){
    const vm = this;
    const gameId = $routeParams.gameId;
    GamesDataFactory.getOne(gameId).then(function(response){
        vm.game = response;
        vm.stars = _getStarsArray(vm.game.rate);
    });

    vm.delete = function(gameId){
        GamesDataFactory.deleteOne(gameId).then(function(response){
            console.log("Game deleted");
            $location.path("/");
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }
}