angular.module("cityApp").factory("CityDataFactory", CityDataFactory);

function CityDataFactory($http){
    return {
        getAll: getAllCities,
        getAllGeo: getAllCitiesGeo,
        getOne: getOneCity,
        addCity: addCity,
        deleteCity: deleteCity
    }

    function getAllCities(offset, count){
        return $http.get("/api/cities?offset="+offset+"&count=+"+count).then(complete).catch(failed);
    }

    function getAllCitiesGeo(lng, lat){
        return $http.get("/api/cities?lng="+lng+"&lat="+lat);
    }

    function getOneCity(cityId){
        return $http.get("/api/city/"+cityId).then(complete).catch(failed);
    }

    function addCity(city){
        return $http.post("/api/cities", city).then(complete).catch(failed);
    }
    function deleteCity(cityId){
        return $http.delete("/api/city/"+cityId).then(complete).catch(failed);
    }
    
    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}