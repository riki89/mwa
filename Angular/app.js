angular.module("jobApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/job", {
        templateUrl: "job/job.html",
        controller: "JobController",
        controllerAs: "JobCtrl"
    }).when("/", {
        templateUrl: "mainPage/main.html",
        controller: "MyMainController",
        controllerAs: "MyCtrl"
    }).when("/about", {
        templateUrl: "about/about.html",
        controller: "AboutController",
        controllerAs: "Aboutctrl"
    }).when("/joke/:jokeType", {
        templateUrl: "joke/joke.html",
        controller: "joke/joke.controller",
        controllerAs: "jokeCtrl"

    }).otherwise({
            redirectTo: "/"
        })
}