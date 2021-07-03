angular.module("jobApp").controller("JobController", JobController);

function JobController(JobDataFactory, $routeParams, $location){
    const vm = this;
    const jobId = $routeParams.jobId;
    JobDataFactory.getOne(jobId).then(function(response){
        vm.job = response;
    });
    vm.delete = function(jobId){
        JobDataFactory.deleteJob(jobId).then(function(response){
            console.log("Location deleted");
            $location.path("/jobs");
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }
}