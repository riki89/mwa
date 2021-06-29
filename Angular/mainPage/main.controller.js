angular.module("jobApp").controller("JobController", JobController);

function JobController($routeParams,JobFactory) {
    const vm = this;
    

    JobFactory.getJobs()
    .then(function (response) {
        vm.job = response;
    });
}