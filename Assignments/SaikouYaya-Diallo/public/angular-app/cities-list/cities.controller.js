angular.module("cityApp").controller("CitiesController", CitiesController);

function CitiesController(CityDataFactory, $window, $routeParams){
    const vm = this;
    let offset = $routeParams.offset;
    let count = $routeParams.count;
    let lng = $routeParams.lng;
    let lat = $routeParams.lat;

    if (!offset){ offset = 0;}
    if (!count) {count = 5;}
    if (lng && lat){
        CityDataFactory.getAllGeo(lng, lat);
    } else {
        CityDataFactory.getAll(offset, count).then(function(response) {
            vm.cities = response;
        });
    }

    vm.addCity = function(){
        console.log("Add City");
        let postData = {
            city: vm.newCityName,
            zip: vm.newCityZip,
            pop: vm.newCityPop,
            state: vm.newCityState,
            loc: {
                lng: parseFloat(vm.newCityLng),
                lat: parseFloat(vm.newCityLat)
            }
        
        };
        if (vm.cityForm.$valid){
            CityDataFactory.addCity(postData)
                .then(function(response){
                    $window.location.reload();
                    console.log(response);
                }).catch(function(error){
                    console.log(error);
                })
        }
        
    }
}