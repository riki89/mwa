angular.module("cityApp").controller("CityController", CityController);

function CityController(CityDataFactory, $routeParams, $location){
    const vm = this;
    const cityId = $routeParams.cityId;
    CityDataFactory.getOne(cityId).then(function(response){
        vm.city = response;
    });
    vm.delete = function(cityId){
        CityDataFactory.deleteCity(cityId).then(function(response){
            console.log("City deleted");
            $location.path("/cities");
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }
}