angular.module("jobApp").controller("LocationController", LocationController);

function LocationController(JobDataFactory, $routeParams, $window){
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
    vm.addLocation = function(){
        console.log("Add Location......");
        const postData = {
            address : vm.newAddress,
            state: vm.newState
        };
        if (vm.locationForm.$valid){
            JobDataFactory.addLocation(jobId, postData)
                .then(function(response){
                    $window.location.reload();
                    console.log(response);
                }).catch(function(error){
                    console.log(error);
                })
        }
        
    }
}