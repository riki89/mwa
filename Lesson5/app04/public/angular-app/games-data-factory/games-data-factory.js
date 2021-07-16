angular.module("meanGames").factory("GamesDataFactory", GamesDataFactory);

function GamesDataFactory($http){
    return {
        getAll: getAllGames,
        getOne: getOneGame,
        addOne: addOneGame,
        deleteOne: deleteOne,
        exportPDF: exportPDF,
    }

    function getAllGames(){
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id){
        return $http.get("/api/games/"+id).then(complete).catch(failed);
    }

    function addOneGame(game){
        return $http.post("/api/games", game).then(complete).catch(failed);
    }
    function deleteOne(id){
        return $http.delete("/api/games/"+id).then(complete).catch(failed);
    }
    function exportPDF(url, name){
        return $http.get("/api/pdf?url="+url+"&name="+name).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}