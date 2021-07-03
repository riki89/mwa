angular.module("jobApp").controller("LocationController", LocationController);

function LocationController(JobDataFactory, $routeParams){
    const vm = this;
    const jobId = $routeParams.jobId;
    JobDataFactory.getLocation(jobId).then(function(response){
        console.log("Location: ", response);
        vm.location = response.location;
    });

    vm.delete = function(jobId){
        JobDataFactory.deleteLocation(jobId).then(function(response){
            console.log("Location deleted");
            $location.path("/");
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }
}