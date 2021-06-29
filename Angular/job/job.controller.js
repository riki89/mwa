angular.module("jobApp").controller("JobController", JobController);

function JobController($routeParams, JobFactory) {
    const vm = this;
   // vm.name = "Yahia";
    const jobId = $routeParams.jobId;
    JobFactory.getJobs()
        .then(function (response) {
            vm.job = response;
        });
    // vm.job = {"title": "By Yahia"}; 
}