angular.module("cityApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome.html"
    }).when("/cities", {
        templateUrl: "angular-app/cities-list/cities-list.html",
        controller: "CitiesController",
        controllerAs: "vm"
    }).when("/cities/:cityId", {
        templateUrl: "angular-app/city-display/city-display.html",
        controller: "CityController",
        controllerAs: "vm"
    }).otherwise({
        redirectTO: "/"
    })
}