angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesDataFactory){
    const vm = this;
    vm.isSubmitted = false;
    GamesDataFactory.getAll().then(function(response){
        vm.games = response;
    });

    vm.addGame = function(){
        console.log("addGame");
        let postData = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            year: vm.newGameYear,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            rate: vm.newGameRating,
            designers: vm.newGameDesigner,
            publisher: {}
        };
        if (vm.gameForm.$valid){
            GamesDataFactory.addOne(postData)
                .then(function(response){
                    console.log("Game saved", response);
                }).catch(function(error){
                    console.log("Error while saving",error);
                })
        } else {
            console.log("Game form not valid");
        }
    }
}