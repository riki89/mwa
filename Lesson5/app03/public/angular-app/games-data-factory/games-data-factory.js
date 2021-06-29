angular.module("meanGames").factory("GamesDataFactory", GamesDataFactory);

function GamesDataFactory($http){
    return {
        getAll: getAllGames,
        getOne: getOneGame
    }

    function getAllGames(){
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id){
        return $http.get("/api/games/"+id).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}