angular.module("jobApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome.html"
    }).when("/jobs", {
        templateUrl: "angular-app/jobs-list/job-list.html",
        controller: "JobsController",
        controllerAs: "vm"
    }).when("/jobs/:jobId", {
        templateUrl: "angular-app/job-display/job-display.html",
        controller: "JobController",
        controllerAs: "vm"
    }).when("/jobs/:jobId/location", {
        templateUrl: "angular-app/location/location.html",
        controller: "LocationController",
        controllerAs: "vm"
    }).when("/jobs/:jobId/skills", {
        templateUrl: "angular-app/skills/skills.html",
        controller: "SkillsController",
        controllerAs: "vm"
    }).otherwise({
        redirectTO: "/"
    })
}